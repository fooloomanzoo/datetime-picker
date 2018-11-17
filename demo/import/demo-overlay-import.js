'use strict';

/* Import WebpackApp */
import '@polymer/iron-demo-helpers/demo-pages-shared-styles.js';
import '@polymer/iron-demo-helpers/demo-snippet.js';
import '@fooloomanzoo/number-input/number-input.js';
import '../../overlay-datetime-picker.js';
import '../../overlay-date-picker.js';
import '../../overlay-time-picker.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const template = html`
  <custom-style>
    <style is="custom-style" include="demo-pages-shared-styles">
      .vertical-section-container {
        margin: 0.75em;
        padding: 0.5em;
        line-height: 1.5;
      }
    </style>
  </custom-style>`;
document.body.appendChild(template.content);
