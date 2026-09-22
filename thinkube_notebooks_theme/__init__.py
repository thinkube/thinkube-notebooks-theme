# Copyright Alejandro Martínez Corriá and the Thinkube contributors
# SPDX-License-Identifier: BSD-3-Clause

try:
    from ._version import __version__
except ImportError:
    # Fallback when using the package in dev mode without installing
    # in editable mode with pip. It is highly recommended to install
    # the package from a stable release or in editable mode: https://pip.pypa.io/en/stable/topics/local-project-installs/#editable-installs
    import warnings
    warnings.warn("Importing 'thinkube_notebooks_theme' outside a proper installation.")
    __version__ = "dev"


def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "thinkube-notebooks-theme"
    }]
