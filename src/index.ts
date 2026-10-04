/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { IThemeManager } from '@jupyterlab/apputils';

import { embeddedThemePlugin } from './embedded-theme';
import { iconsPlugin } from './icons';
import { mermaidPlugin } from './mermaid';

/**
 * Initialization data for the thinkube-notebooks-theme extension.
 */
const themePlugin: JupyterFrontEndPlugin<void> = {
  id: 'thinkube-notebooks-theme:plugin',
  description: 'Thinkube Notebooks theme',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, manager: IThemeManager) => {
    console.log('JupyterLab extension thinkube-notebooks-theme is activated!');
    const style = 'thinkube-notebooks-theme/index.css';

    manager.register({
      name: 'thinkube-notebooks-theme',
      displayName: 'Thinkube Notebooks',
      isLight: true,
      themeScrollbars: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });

    // Same stylesheet: dark.css applies while this name is on <body>.
    manager.register({
      name: 'thinkube-notebooks-dark',
      displayName: 'Thinkube Notebooks Dark',
      isLight: false,
      themeScrollbars: true,
      load: () => manager.loadCSS(style),
      unload: () => Promise.resolve(undefined)
    });
  }
};

/**
 * Custom splash screen with Thinkube logo
 */
const splashPlugin: JupyterFrontEndPlugin<void> = {
  id: 'thinkube-notebooks-theme:splash',
  description: 'Thinkube Notebooks splash screen',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    // Wait for splash screen to be added to DOM
    const checkSplash = setInterval(() => {
      const splash = document.getElementById('main-logo');
      if (splash) {
        // Clear the default SVG content
        splash.innerHTML = '';
        // Add our custom logo as background
        splash.style.backgroundImage =
          "url('data:image/svg+xml;base64," +
          btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="#006680"/>
            <text x="100" y="120" font-family="Poppins, sans-serif" font-size="80" font-weight="bold" fill="white" text-anchor="middle">tk</text>
          </svg>
        `) +
          "')";
        splash.style.backgroundRepeat = 'no-repeat';
        splash.style.backgroundSize = 'contain';
        splash.style.backgroundPosition = 'center';
        clearInterval(checkSplash);
      }
    }, 10);

    // Clean up after 5 seconds if splash not found
    setTimeout(() => clearInterval(checkSplash), 5000);
  }
};

export default [
  themePlugin,
  embeddedThemePlugin,
  splashPlugin,
  iconsPlugin,
  mermaidPlugin
];
