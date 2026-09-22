# thinkube_notebooks_theme

[![Github Actions Status](https://github.com/thinkube/thinkube-notebooks-theme/workflows/Build/badge.svg)](https://github.com/thinkube/thinkube-notebooks-theme/actions/workflows/build.yml)

Thinkube Notebooks theme

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
sidebars, status bar) with [Lucide](https://lucide.dev) icons. File-type icons,
language logos, kernel status circles, breakpoints and the tab close button
keep their JupyterLab look, because their color or shape carries meaning.

- The mapping is in `src/lucide-icons.ts`.
- The icons work with any color theme, not only Thinkube Notebooks.
- To turn them off, open Settings > Thinkube Icons and clear
  "Use Lucide icons", then reload the page.

The Lucide icons are under the ISC license. See
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

## Requirements

- JupyterLab >= 4.0.0

## How it is installed

The theme is not installed on its own and is not on PyPI. The Thinkube
notebook image (`tk-jupyter-base`, built by the Thinkube installer)
installs it from this repository and sets it as the default JupyterLab
theme for every notebook server.

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the thinkube_notebooks_theme directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall thinkube_notebooks_theme
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `thinkube-notebooks-theme` within that folder.

### Testing the extension

#### Frontend tests

This extension is using [Jest](https://jestjs.io/) for JavaScript code testing.

To execute them, execute:

```sh
jlpm
jlpm test
```

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
