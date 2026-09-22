/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IMermaidManager } from '@jupyterlab/mermaid';

import { readableLabels } from './mermaid-contrast';

/**
 * Readable labels in every Mermaid diagram, in any theme.
 *
 * JupyterLab shows a diagram as an image of the SVG, so page styles cannot
 * reach its text. The manager's renderSvg is wrapped, and the SVG is corrected
 * before any figure is built from it. A theme change clears the manager's
 * cache, so diagrams are corrected again against the new Mermaid theme.
 */
export const mermaidPlugin: JupyterFrontEndPlugin<void> = {
  id: 'thinkube-notebooks-theme:mermaid',
  description: 'Readable text on colored shapes in Mermaid diagrams',
  autoStart: true,
  requires: [IMermaidManager],
  activate: (app: JupyterFrontEnd, manager: IMermaidManager) => {
    const renderSvg = manager.renderSvg.bind(manager);
    manager.renderSvg = async (text: string) => {
      const info = await renderSvg(text);
      return { ...info, svg: readableLabels(info.svg, document.body) };
    };
  }
};
