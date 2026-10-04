/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { LabIcon } from '@jupyterlab/ui-components';

import { fileBrowserTabIcon, lucideIcons } from './lucide-icons';

import '../style/icons.css';

const PLUGIN_ID = 'thinkube-notebooks-theme:icons';
const FILE_BROWSER_ID = 'filebrowser';

/**
 * Converts a Lucide SVG into the shape JupyterLab icons use, so JupyterLab's
 * icon color rules apply to it.
 *
 * JupyterLab colors an icon through classes such as `jp-icon3` on each shape,
 * combined with a `fill` or `stroke` attribute. Lucide icons are drawn with
 * strokes, so each shape gets the color class and a `stroke` attribute, and
 * the root keeps `fill="none"` so no shape is filled.
 */
function toJupyterSvg(lucideSvg: string, colorClass: string): string {
  const doc = new DOMParser().parseFromString(lucideSvg, 'image/svg+xml');
  const root = doc.documentElement;
  root.removeAttribute('class');
  root.removeAttribute('stroke');
  root.removeAttribute('height');
  root.setAttribute('width', '16');
  for (const shape of Array.from(root.children)) {
    shape.setAttribute('class', `${colorClass} jp-icon-selectable`);
    shape.setAttribute('stroke', '#616161');
  }
  return new XMLSerializer().serializeToString(root);
}

/** Keeps the gray level of the icon being replaced (jp-icon0 to jp-icon4). */
function colorClassOf(svgstr: string): string {
  return svgstr.match(/\bjp-icon[0-4]\b/)?.[0] ?? 'jp-icon3';
}

/**
 * Replaces JupyterLab's built-in UI icons with Lucide icons.
 *
 * The swap runs during plugin activation, before the application shell is
 * attached and drawn. Toolbar buttons keep their own copy of an icon's parsed
 * SVG once drawn, so a swap after that point would miss them. For the same
 * reason, turning the setting on or off takes effect after a page reload.
 */
export const iconsPlugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  description: 'Lucide icons for the JupyterLab user interface',
  autoStart: true,
  requires: [ISettingRegistry],
  activate: async (app: JupyterFrontEnd, registry: ISettingRegistry) => {
    let enabled = true;
    try {
      const settings = await registry.load(PLUGIN_ID);
      enabled = settings.composite.lucideIcons !== false;
    } catch (reason) {
      console.error(`Failed to load settings for ${PLUGIN_ID}.`, reason);
    }
    if (!enabled) {
      return;
    }

    for (const [name, lucideSvg] of Object.entries(lucideIcons)) {
      const icon = LabIcon.resolve({ icon: name }) as LabIcon;
      if (icon.svgstr) {
        icon.svgstr = toJupyterSvg(lucideSvg, colorClassOf(icon.svgstr));
      }
    }

    const tabIcon = new LabIcon({
      name: 'thinkube-notebooks-theme:file-browser-tab',
      svgstr: toJupyterSvg(fileBrowserTabIcon, 'jp-icon3')
    });
    void app.restored.then(() => {
      for (const widget of app.shell.widgets('left')) {
        if (widget.id === FILE_BROWSER_ID) {
          widget.title.icon = tabIcon;
        }
      }
    });
  }
};
