'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-form/iron-form.js';
import '@fooloomanzoo/input-picker-pattern/overlay-element.js';
import '../../datetime-picker.js';
import '../../date-picker.js';
import '../../time-picker.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
  <custom-style>
    <style is="custom-style" include="demo-pages-shared-styles">
      input {
        margin-bottom: 0.25em;
        margin-left: 8px;
      }
      time-picker,
      date-picker,
      datetime-picker {
        margin-left: 8px;
        color: #111;
        --input-color: #444;
        --input-background: #ddd;
        --input-focus-color: #000;
        --input-focus-background: #649ae9;
        --inner-input-focus-color: #eee;
        --inner-input-focus-background: #2b7aed;
        --input-invalid-color: #e8395e;
        --input-padding: 0.25em;
        --input-border-radius: 0.25em;
        --input-border-color: rgba(0,0,0,0.2);
        --input-border-width: thin;
        --input-border-style: dotted;
        --input-transition: background 150ms ease-in-out;
        --inner-input-focus-border-color: #005eff;
        --input-focus-border-color: #224f9d;
        --input-focus-border-width: thin;
        --input-focus-border-style: solid;
        --input-picker-color: #111;
        --input-picker-background: #97b7ee;
        --input-picker-border-radius: 12px 12px 12px 24px;
        --input-placeholder-color: rgba(0,0,0,0.5);
        --input-icon: {
          border-radius: 50%;
          border-color: rgba(0,0,0,0);
          border-width: thin;
          border-style: solid;
        };
        --calendar-cell-hovered: {
          border-color: rgba(0,0,0,0.5);
        };
      }
      iron-form {
        @apply --shadow-elevation-2dp;
        padding: 20px;
      }
      .output {
        color: #333;
        margin-top: 20px;
        padding: 0.3em;
        word-wrap: break-word;
        font-family: monospace;
        background: rgba(0, 0, 0, 0.05);
        border-color: #555;
        border-width: thin;
        border-style: dashed;
      }
    </style>
  </custom-style>`;
document.body.appendChild(template.content);
