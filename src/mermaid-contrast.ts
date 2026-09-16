/**
 * Readable text on Mermaid diagram shapes.
 *
 * Mermaid picks label colors from its theme (light grey in the dark theme),
 * while a diagram can give any shape its own fill with `style` or `classDef`.
 * A light fill under the dark theme's grey text is barely legible. Here each
 * label is compared with the shape behind it, and a label whose contrast is
 * below WCAG AA gets whichever of dark or white text reads better.
 */

/** WCAG 2 AA contrast for normal text. */
export const MIN_CONTRAST = 4.5;
export const DARK_TEXT = '#1a1a1a';
export const LIGHT_TEXT = '#ffffff';

type Rgb = [number, number, number];

const SHAPES = 'rect, polygon, path, circle, ellipse';

/**
 * Reads a computed CSS color. Returns null for anything that is not fully
 * opaque (`none`, gradients, colors with alpha): what shows through is unknown.
 */
export function parseColor(value: string): Rgb | null {
  const hex = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const h =
      hex[1].length === 3
        ? hex[1]
            .split('')
            .map(c => c + c)
            .join('')
        : hex[1];
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)) as Rgb;
  }
  const rgb = value
    .trim()
    .match(
      /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:[,/]\s*([\d.]+%?))?\s*\)$/
    );
  if (!rgb) {
    return null;
  }
  if (rgb[4] !== undefined) {
    const alpha = rgb[4].endsWith('%')
      ? parseFloat(rgb[4]) / 100
      : parseFloat(rgb[4]);
    if (alpha < 1) {
      return null;
    }
  }
  return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
}

/** WCAG 2 relative luminance. */
function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map(channel => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/** WCAG 2 contrast ratio, from 1 to 21. */
export function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** The text color with more contrast on the given background. */
export function textColorFor(background: Rgb): string {
  const dark = parseColor(DARK_TEXT) as Rgb;
  const light = parseColor(LIGHT_TEXT) as Rgb;
  return contrast(dark, background) >= contrast(light, background)
    ? DARK_TEXT
    : LIGHT_TEXT;
}

/**
 * The fill of the nearest shape drawn behind the label: the first ancestor
 * group with a shape child, outside the label, whose box holds the label's
 * center. Null when there is no such shape or its fill is not opaque.
 */
function backgroundOf(label: Element, root: Element): Rgb | null {
  const box = label.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  for (
    let group = label.parentElement;
    group && group !== root.parentElement;
    group = group.parentElement
  ) {
    for (const shape of Array.from(group.children)) {
      if (!shape.matches(SHAPES) || shape.contains(label)) {
        continue;
      }
      const r = shape.getBoundingClientRect();
      if (
        r.width > 0 &&
        r.height > 0 &&
        x >= r.left &&
        x <= r.right &&
        y >= r.top &&
        y <= r.bottom
      ) {
        const style = getComputedStyle(shape);
        if (parseFloat(style.fillOpacity) < 1) {
          return null;
        }
        return parseColor(style.fill);
      }
    }
  }
  return null;
}

/** Elements that hold text directly. */
function textHolders(label: Element): Element[] {
  const all = [label, ...Array.from(label.querySelectorAll('*'))];
  return all.filter(el =>
    Array.from(el.childNodes).some(
      node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
    )
  );
}

/**
 * Gives low-contrast labels in a rendered Mermaid SVG a readable color.
 *
 * Styles resolve only in a live document, so the SVG is placed out of view in
 * `host` while it is read, then serialized back with anything before the
 * `<svg>` tag (the XML declaration) kept as it was.
 */
export function readableLabels(svg: string, host: HTMLElement): string {
  const start = svg.indexOf('<svg');
  const parsed = new DOMParser().parseFromString(svg, 'image/svg+xml');
  const source = parsed.querySelector('svg');
  if (start < 0 || !source) {
    return svg;
  }
  const container = document.createElement('div');
  container.style.cssText =
    'position:absolute;left:-100000px;top:0;visibility:hidden;';
  const root = document.importNode(source, true);
  container.appendChild(root);
  host.appendChild(container);
  try {
    const htmlLabels = Array.from(root.querySelectorAll('foreignObject'));
    const svgLabels = Array.from(root.querySelectorAll('text')).filter(
      text => !text.closest('foreignObject')
    );
    for (const label of [...htmlLabels, ...svgLabels]) {
      const background = backgroundOf(label, root);
      if (!background) {
        continue;
      }
      const property = label.matches('foreignObject') ? 'color' : 'fill';
      for (const holder of textHolders(label)) {
        const current = parseColor(
          getComputedStyle(holder).getPropertyValue(property)
        );
        if (current && contrast(current, background) >= MIN_CONTRAST) {
          continue;
        }
        (holder as HTMLElement | SVGElement).style.setProperty(
          property,
          textColorFor(background),
          'important'
        );
      }
    }
    return svg.slice(0, start) + new XMLSerializer().serializeToString(root);
  } finally {
    container.remove();
  }
}
