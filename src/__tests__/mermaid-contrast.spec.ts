/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  contrast,
  DARK_TEXT,
  LIGHT_TEXT,
  parseColor,
  textColorFor
} from '../mermaid-contrast';

describe('parseColor', () => {
  it('reads hex and rgb colors', () => {
    expect(parseColor('#e1f5ff')).toEqual([225, 245, 255]);
    expect(parseColor('#fff')).toEqual([255, 255, 255]);
    expect(parseColor('rgb(31, 32, 32)')).toEqual([31, 32, 32]);
    expect(parseColor('rgba(31, 32, 32, 1)')).toEqual([31, 32, 32]);
  });

  it('refuses colors that are not opaque', () => {
    expect(parseColor('none')).toBeNull();
    expect(parseColor('url("#gradient")')).toBeNull();
    expect(parseColor('rgba(255, 255, 255, 0.5)')).toBeNull();
    expect(parseColor('rgb(255 255 255 / 50%)')).toBeNull();
  });
});

describe('contrast', () => {
  it('follows WCAG 2', () => {
    expect(contrast([0, 0, 0], [255, 255, 255])).toBeCloseTo(21);
    expect(contrast([255, 255, 255], [255, 255, 255])).toBeCloseTo(1);
  });

  it('finds the dark theme grey unreadable on a pastel fill', () => {
    const grey = parseColor('#cccccc')!;
    expect(contrast(grey, parseColor('#e1f5ff')!)).toBeLessThan(4.5);
  });
});

describe('textColorFor', () => {
  it('puts dark text on light fills and white text on dark fills', () => {
    expect(textColorFor(parseColor('#e1f5ff')!)).toBe(DARK_TEXT);
    expect(textColorFor(parseColor('#fff4e6')!)).toBe(DARK_TEXT);
    expect(textColorFor(parseColor('#1f2020')!)).toBe(LIGHT_TEXT);
    expect(textColorFor(parseColor('#006680')!)).toBe(LIGHT_TEXT);
  });
});
