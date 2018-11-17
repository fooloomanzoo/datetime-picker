'use strict';

/* Import WebpackApp */
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-box/app-box.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-scroll-effects/effects/parallax-background.js';
import '@polymer/paper-behaviors/paper-inky-focus-behavior.js';
import '@polymer/paper-styles/default-theme.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-iconset-svg/demo/svg-sample-icons.js';
import '@polymer/font-roboto/roboto.js';
import '../../overlay-datetime-picker.js';
import '../../overlay-date-picker.js';
import '../../overlay-time-picker.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
<custom-style>
  <style is="custom-style">
    app-drawer-layout {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      background-color: transparent;
      overflow: hidden;
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
    }

    app-drawer {
      --app-drawer-content-container: {
        background-color: #252422;
        color: #fff;
      };
    }

    app-header {
      background-color: #252422;
      color: #fff;
    }

    app-box {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    datetime-picker,
    overlay-time-picker,
    overlay-datetime-picker,
    overlay-date-picker {
      vertical-align: middle;
      font-size: 14px;
      --input-background: #d5d5d5;
      --input-color: #222;
      --input-picker-background: #d5d5d5;
      --input-picker-color: rgb(50, 52, 107);
      --input-focus-background: #eee;
      --input-focus-color: #444;
      --inner-input-focus-background: white;
      --inner-input-focus-color: #222;
    }

    .last-listen overlay-datetime-picker {
      --input-background: #82d5f4;
      --input-color: #222;
      --input-picker-background: #82d5f4;
      --input-picker-color: #222;
      --input-focus-background: #84aef2;
      --inner-input-focus-color: #f1f1f1;
      --inner-input-focus-background: #4285f4;
      --inner-input-focus-color: #f1f1f1;
    }

    .content paper-icon-button {
      --paper-icon-button-ink-color: #1320fd;
      color: #030200;
    }

    .content paper-icon-button.youtube {
      --paper-icon-button-ink-color: #cc181e;
      opacity: 0.8;
      transition: color 250ms ease-in, opacity 150ms ease-in;
    }

    .content paper-icon-button.youtube:hover {
      opacity: 1;
      color: #cc181e;
    }

    .content {
      margin: 64px 20% 120px;
      padding: 32px 32px 60px;
      min-width: 400px;
      background-color: #fff;
      color: #333;
      box-shadow: 0 2px 3px 2px rgba(255, 255, 255, 0.14);
      border-radius: 32px;
    }

    .artist-date {
      @apply --layout-horizontal;
      padding-bottom: 12px;
      align-items: baseline;
    }

    .artist {
      @apply --layout-flex;
    }

    time {
      margin-left: 20px;
      font-size: 13px;
      color: #555;
    }

    summary {
      padding: 1em 0;
      font-size: 14px;
      line-height: 1.5;
    }

    .song {
      @apply --layout;
      @apply --layout-center;
      padding: 1em 0;
    }

    .song>.no {
      width: 40px;
    }

    .song>.name {
      @apply --layout-flex;
      padding-right: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .song>.duration {
      width: 60px;
      text-align: right;
      margin-right: 8px;
    }

    .scheduled {
      float: right;
      border-top: thin dotted rgba(0, 0, 0, 0.5);
    }
  </style>
</custom-style>`;
document.body.appendChild(template.content);
