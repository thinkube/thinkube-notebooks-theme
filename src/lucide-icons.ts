/*
 * Copyright Alejandro Martínez Corriá and the Thinkube contributors
 * SPDX-License-Identifier: BSD-3-Clause
 */

import appWindow from 'lucide-static/icons/app-window.svg';
import arrowDown from 'lucide-static/icons/arrow-down.svg';
import arrowDownToDot from 'lucide-static/icons/arrow-down-to-dot.svg';
import arrowUp from 'lucide-static/icons/arrow-up.svg';
import arrowUpFromDot from 'lucide-static/icons/arrow-up-from-dot.svg';
import bell from 'lucide-static/icons/bell.svg';
import blocks from 'lucide-static/icons/blocks.svg';
import betweenHorizontalEnd from 'lucide-static/icons/between-horizontal-end.svg';
import betweenHorizontalStart from 'lucide-static/icons/between-horizontal-start.svg';
import brushCleaning from 'lucide-static/icons/brush-cleaning.svg';
import bug from 'lucide-static/icons/bug.svg';
import bugPlay from 'lucide-static/icons/bug-play.svg';
import caseSensitive from 'lucide-static/icons/case-sensitive.svg';
import check from 'lucide-static/icons/check.svg';
import chevronDown from 'lucide-static/icons/chevron-down.svg';
import chevronLeft from 'lucide-static/icons/chevron-left.svg';
import chevronRight from 'lucide-static/icons/chevron-right.svg';
import chevronUp from 'lucide-static/icons/chevron-up.svg';
import chevronsDownUp from 'lucide-static/icons/chevrons-down-up.svg';
import chevronsUpDown from 'lucide-static/icons/chevrons-up-down.svg';
import circleAlert from 'lucide-static/icons/circle-alert.svg';
import circleStop from 'lucide-static/icons/circle-stop.svg';
import clipboardPaste from 'lucide-static/icons/clipboard-paste.svg';
import code from 'lucide-static/icons/code.svg';
import codeXml from 'lucide-static/icons/code-xml.svg';
import copy from 'lucide-static/icons/copy.svg';
import copyPlus from 'lucide-static/icons/copy-plus.svg';
import copyright from 'lucide-static/icons/copyright.svg';
import cpu from 'lucide-static/icons/cpu.svg';
import download from 'lucide-static/icons/download.svg';
import ellipsis from 'lucide-static/icons/ellipsis.svg';
import ellipsisVertical from 'lucide-static/icons/ellipsis-vertical.svg';
import eraser from 'lucide-static/icons/eraser.svg';
import externalLink from 'lucide-static/icons/external-link.svg';
import fastForward from 'lucide-static/icons/fast-forward.svg';
import file from 'lucide-static/icons/file.svg';
import fileCode from 'lucide-static/icons/file-code.svg';
import folder from 'lucide-static/icons/folder.svg';
import folderHeart from 'lucide-static/icons/folder-heart.svg';
import folderPlus from 'lucide-static/icons/folder-plus.svg';
import folderTree from 'lucide-static/icons/folder-tree.svg';
import funnel from 'lucide-static/icons/funnel.svg';
import history from 'lucide-static/icons/history.svg';
import house from 'lucide-static/icons/house.svg';
import info from 'lucide-static/icons/info.svg';
import keyboard from 'lucide-static/icons/keyboard.svg';
import layoutGrid from 'lucide-static/icons/layout-grid.svg';
import link from 'lucide-static/icons/link.svg';
import list from 'lucide-static/icons/list.svg';
import listFilter from 'lucide-static/icons/list-filter.svg';
import listOrdered from 'lucide-static/icons/list-ordered.svg';
import listTree from 'lucide-static/icons/list-tree.svg';
import lock from 'lucide-static/icons/lock.svg';
import palette from 'lucide-static/icons/palette.svg';
import panelBottom from 'lucide-static/icons/panel-bottom.svg';
import panelLeft from 'lucide-static/icons/panel-left.svg';
import panelRight from 'lucide-static/icons/panel-right.svg';
import panelTop from 'lucide-static/icons/panel-top.svg';
import pause from 'lucide-static/icons/pause.svg';
import pencil from 'lucide-static/icons/pencil.svg';
import play from 'lucide-static/icons/play.svg';
import plus from 'lucide-static/icons/plus.svg';
import redo2 from 'lucide-static/icons/redo-2.svg';
import redoDot from 'lucide-static/icons/redo-dot.svg';
import refreshCw from 'lucide-static/icons/refresh-cw.svg';
import regex from 'lucide-static/icons/regex.svg';
import rows3 from 'lucide-static/icons/rows-3.svg';
import save from 'lucide-static/icons/save.svg';
import scissors from 'lucide-static/icons/scissors.svg';
import search from 'lucide-static/icons/search.svg';
import settings from 'lucide-static/icons/settings.svg';
import share2 from 'lucide-static/icons/share-2.svg';
import shieldCheck from 'lucide-static/icons/shield-check.svg';
import shieldOff from 'lucide-static/icons/shield-off.svg';
import square from 'lucide-static/icons/square.svg';
import squarePen from 'lucide-static/icons/square-pen.svg';
import squareX from 'lucide-static/icons/square-x.svg';
import tableOfContents from 'lucide-static/icons/table-of-contents.svg';
import tag from 'lucide-static/icons/tag.svg';
import trash2 from 'lucide-static/icons/trash-2.svg';
import undo2 from 'lucide-static/icons/undo-2.svg';
import undoDot from 'lucide-static/icons/undo-dot.svg';
import upload from 'lucide-static/icons/upload.svg';
import user from 'lucide-static/icons/user.svg';
import users from 'lucide-static/icons/users.svg';
import variable from 'lucide-static/icons/variable.svg';
import wholeWord from 'lucide-static/icons/whole-word.svg';
import wrench from 'lucide-static/icons/wrench.svg';
import zap from 'lucide-static/icons/zap.svg';
import zapOff from 'lucide-static/icons/zap-off.svg';

/**
 * Lucide replacements for JupyterLab's built-in icons, keyed by the LabIcon
 * name registered in @jupyterlab/ui-components.
 *
 * Only single-color UI icons are listed. Icons that carry meaning through
 * color or shape are left out on purpose: file types and language logos
 * (notebook, python, markdown, ...), the tab close icon (it also shows the
 * unsaved-changes dot), kernel status circles, and breakpoints.
 */
export const lucideIcons: Record<string, string> = {
  'ui-components:add-above': betweenHorizontalStart,
  'ui-components:add-below': betweenHorizontalEnd,
  'ui-components:add': plus,
  'ui-components:bell': bell,
  'ui-components:bug-dot': bugPlay,
  'ui-components:bug': bug,
  'ui-components:build': wrench,
  'ui-components:caret-down-empty': chevronDown,
  'ui-components:caret-down-empty-thin': chevronDown,
  'ui-components:caret-down': chevronDown,
  'ui-components:caret-left': chevronLeft,
  'ui-components:caret-right': chevronRight,
  'ui-components:caret-up-empty-thin': chevronUp,
  'ui-components:caret-up': chevronUp,
  'ui-components:case-sensitive': caseSensitive,
  'ui-components:check': check,
  'ui-components:cleaning': brushCleaning,
  'ui-components:clear': eraser,
  'ui-components:close-all': squareX,
  'ui-components:code-check': codeXml,
  'ui-components:code': code,
  'ui-components:collapse-all': chevronsDownUp,
  'ui-components:copy': copy,
  'ui-components:copyright': copyright,
  'ui-components:cut': scissors,
  'ui-components:delete': trash2,
  'ui-components:dock-bottom': panelBottom,
  'ui-components:dock-left': panelLeft,
  'ui-components:dock-right': panelRight,
  'ui-components:dock-top': panelTop,
  'ui-components:dots': ellipsisVertical,
  'ui-components:download': download,
  'ui-components:duplicate': copyPlus,
  'ui-components:edit': pencil,
  'ui-components:ellipses': ellipsis,
  'ui-components:error': circleAlert,
  'ui-components:exceptions': zap,
  'ui-components:expand-all': chevronsUpDown,
  'ui-components:extension': blocks,
  'ui-components:fast-forward': fastForward,
  'ui-components:file': file,
  'ui-components:file-upload': upload,
  'ui-components:filter': funnel,
  'ui-components:filter-list': listFilter,
  'ui-components:folder-favorite': folderHeart,
  'ui-components:folder': folder,
  'ui-components:history': history,
  'ui-components:home': house,
  'ui-components:info': info,
  'ui-components:jump-back': undoDot,
  'ui-components:jump-forward': redoDot,
  'ui-components:kernel': cpu,
  'ui-components:keyboard': keyboard,
  'ui-components:launch': externalLink,
  'ui-components:launcher': layoutGrid,
  'ui-components:line-form': squarePen,
  'ui-components:link': link,
  'ui-components:list': list,
  'ui-components:lock': lock,
  'ui-components:move-down': arrowDown,
  'ui-components:move-up': arrowUp,
  'ui-components:new-folder': folderPlus,
  'ui-components:not-trusted': shieldOff,
  'ui-components:numbering': listOrdered,
  'ui-components:offline-bolt': zapOff,
  'ui-components:open-kernel-source': fileCode,
  'ui-components:palette': palette,
  'ui-components:paste': clipboardPaste,
  'ui-components:pause': pause,
  'ui-components:redo': redo2,
  'ui-components:refresh': refreshCw,
  'ui-components:regex': regex,
  'ui-components:run': play,
  'ui-components:running': circleStop,
  'ui-components:save': save,
  'ui-components:search': search,
  'ui-components:settings': settings,
  'ui-components:share': share2,
  'ui-components:step-into': arrowDownToDot,
  'ui-components:step-out': arrowUpFromDot,
  'ui-components:step-over': redoDot,
  'ui-components:stop': square,
  'ui-components:tab': appWindow,
  'ui-components:table-rows': rows3,
  'ui-components:tag': tag,
  'ui-components:toc': tableOfContents,
  'ui-components:tree-view': listTree,
  'ui-components:trusted': shieldCheck,
  'ui-components:undo': undo2,
  'ui-components:user': user,
  'ui-components:users': users,
  'ui-components:variable': variable,
  'ui-components:word': wholeWord
};

/** Lucide icon for the file browser tab in the left sidebar. */
export const fileBrowserTabIcon = folderTree;
