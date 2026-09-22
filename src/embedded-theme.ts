/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';

import { requestedTheme } from './theme-request';

/**
 * A page opened with the parameter shows the Thinkube theme it names, so a
 * notebook framed in Thinkube IDE matches the IDE. A page opened without it
 * keeps the theme its settings select.
 */
export const embeddedThemePlugin: JupyterFrontEndPlugin<void> = {
  id: 'thinkube-notebooks-theme:embedded',
  description: 'The Thinkube theme Thinkube IDE asks for in a framed page',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    let theme: string | undefined;
    try {
      theme = requestedTheme(window.location.search);
    } catch (error) {
      console.error(`thinkube-notebooks-theme: ${(error as Error).message}`);
      return;
    }
    if (!theme) {
      return;
    }
    const wanted = theme;
    void app.restored.then(() =>
      manager.theme === wanted ? undefined : manager.setTheme(wanted)
    );
  }
};
