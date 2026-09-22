# thinkube-notebooks-theme

[![Github Actions Status](https://github.com/thinkube/thinkube-notebooks-theme/workflows/Build/badge.svg)](https://github.com/thinkube/thinkube-notebooks-theme/actions/workflows/build.yml)

A JupyterLab extension with the Thinkube light and dark themes and Lucide
UI icons.

## What it does

- Registers two JupyterLab themes: **Thinkube Notebooks** (light) and
  **Thinkube Notebooks Dark**.
- Replaces JupyterLab's single-color UI icons with
  [Lucide](https://lucide.dev) icons. A setting turns this off.
- Reads the `?tk-theme=light` or `?tk-theme=dark` parameter in the page
  address and switches to the matching Thinkube theme. Thinkube IDE adds
  this parameter when it shows a notebook inside the IDE, so the notebook
  matches the IDE. Any other value is logged as an error in the browser
  console, and the theme does not change.
- Checks the text in every Mermaid diagram. A label whose contrast with the
  shape behind it is below WCAG AA (4.5:1) is drawn in dark (`#1a1a1a`) or
  white text, whichever reads better.
- Replaces the logo on the JupyterLab splash screen with a "tk" logo.

## How it reaches a user

It is built into the Thinkube notebook image. The image `tk-jupyter-base`
(`core/harbor-images/base-images/tk-jupyter-base.Containerfile.j2` in
[thinkube](https://github.com/thinkube/thinkube)) installs the extension
from this repository with git, and sets Thinkube Notebooks as the default
theme for every notebook server. The Thinkube installer builds that image.
The theme is not installed on its own and is not on PyPI.

## Themes

- **Thinkube Notebooks**: the light theme, built on the thinkube-style light
  palette.
- **Thinkube Notebooks Dark**: the dark theme, built on the Thinkube Dark
  theme of the IDE.

Both use teal as primary color and the orange of the Thinkube shell prompt
(#FF6B35) as secondary color. Warnings use amber. Select a theme in
Settings > Theme. Both themes load the same stylesheet: `style/variables.css`
holds the light values and `style/dark.css` replaces them while the dark
theme is selected.

## Icons

The extension replaces JupyterLab's single-color UI icons (toolbars, menus,
sidebars, status bar) with Lucide icons. File-type icons, language logos,
kernel status circles, breakpoints and the tab close button keep their
JupyterLab look, because their color or shape carries meaning.

- The mapping is in `src/lucide-icons.ts`.
- The icons work with any color theme, not only Thinkube Notebooks.
- To turn them off, open Settings > Thinkube Icons and clear
  "Use Lucide icons", then reload the page.

The Lucide icons are under the ISC license. See
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Requirements

- JupyterLab >= 4.0.0

## Working on it

### Development install

You need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in place of `jlpm` below.

```bash
# Clone the repo and change into its directory, then:
# Install the package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild the extension TypeScript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time, in
two terminals. The extension is rebuilt each time you save a change.

```bash
# Watch the source directory in one terminal, rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change is built locally.
Refresh JupyterLab to load the change in your browser. The rebuild can take
several seconds.

By default, `jlpm build` generates source maps for this extension, for
debugging with the browser dev tools. To also generate source maps for the
JupyterLab core extensions, run:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall thinkube_notebooks_theme
```

In development mode, also remove the symlink created by
`jupyter labextension develop`. Run `jupyter labextension list` to find the
`labextensions` folder, then remove the symlink named
`thinkube-notebooks-theme` in that folder.

### Testing the extension

#### Frontend tests

The extension uses [Jest](https://jestjs.io/) for JavaScript tests:

```sh
jlpm
jlpm test
```

#### Integration tests

The extension uses [Playwright](https://playwright.dev/docs/intro) for the
integration tests (user-level tests), through the JupyterLab helper
[Galata](https://github.com/jupyterlab/jupyterlab/tree/main/galata).

See the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md).

## License

BSD 3-Clause License. See [LICENSE](LICENSE).
