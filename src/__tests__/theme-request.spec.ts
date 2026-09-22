/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { requestedTheme } from '../theme-request';

describe('requestedTheme', () => {
  it('names the Thinkube theme for light and dark', () => {
    expect(requestedTheme('?tk-theme=light')).toBe('thinkube-notebooks-theme');
    expect(requestedTheme('?_xsrf=abc&tk-theme=dark')).toBe(
      'thinkube-notebooks-dark'
    );
  });

  it('asks for nothing when the address does not carry the parameter', () => {
    expect(requestedTheme('')).toBeUndefined();
    expect(requestedTheme('?reset')).toBeUndefined();
  });

  it('refuses a value that names no theme', () => {
    expect(() => requestedTheme('?tk-theme=blue')).toThrow(
      'tk-theme=blue names no theme; expected light or dark'
    );
  });
});
