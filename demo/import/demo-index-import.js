'use strict';

/* Import WebpackApp */

import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@polymer/iron-form/iron-form.js';
import '@fooloomanzoo/input-picker-pattern/overlay-element.js';
import '@fooloomanzoo/number-input/number-input.js';
import '../../datetime-picker.js';
import '../../date-picker.js';
import '../../time-picker.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
  <custom-style>
    <style is="custom-style" include="demo-pages-shared-styles">
      .result {
        margin: 0.75em;
        padding: 0.5em;
        line-height: 1.5;
      }
    </style>
  </custom-style>`;
document.body.appendChild(template.content);
