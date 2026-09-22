/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * The query parameter Thinkube IDE adds to a notebook it frames: `light` or
 * `dark`, from the kind of the IDE's own color theme.
 */
export const THEME_PARAMETER = 'tk-theme';

/** The Thinkube theme for each value of the parameter. */
export const THEMES: Record<string, string> = {
  light: 'thinkube-notebooks-theme',
  dark: 'thinkube-notebooks-dark'
};

/**
 * The theme a page's address asks for, or undefined when the address does not
 * carry the parameter. A value that names no Thinkube theme is an error.
 */
export function requestedTheme(search: string): string | undefined {
  const value = new URLSearchParams(search).get(THEME_PARAMETER);
  if (value === null) {
    return undefined;
  }
  const theme = THEMES[value];
  if (!theme) {
    throw new Error(
      `${THEME_PARAMETER}=${value} names no theme; expected ${Object.keys(THEMES).join(' or ')}`
    );
  }
  return theme;
}
