import { html, htmlLiteral } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '../../@polymer/polymer/lib/utils/mixin.js';
import '../input-picker-pattern/dropdown-style.js';
import '../input-picker-pattern/dropdown-tip-style.js';

/**
 * Mixin for creating a picker for datetime
 *
 * @mixinFunction
 * @polymer
 */
export const DatetimePickerMixin = dedupingMixin( superClass => {
  return class extends superClass {

    static get nativeInputTemplate() {
      return html`
        <template is="dom-if" if="[[_computeShouldNative(native)]]" restamp>
          <input class="native" type="${this.expectedNativeInputType}" disabled$="[[disabled]]" value="{{_nativeInput::input}}" step="[[_computeNativeStep(_partsStep, clamp)]]" min="[[_computeNativeThreshold(_minValue)]]" max="[[_computeNativeThreshold(_maxValue)]]">
          ${this.timezoneInputTemplate || html``}
        </template>
      `;
    }

    static get styleTemplate() {
      return htmlLiteral`
        ${super.styleTemplate || htmlLiteral``}
        .native {
          text-align: var(--input-align, left);
        }
        .native,
        .native::-webkit-datetime-edit,
        .native::-webkit-datetime-edit-fields-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .native::-webkit-datetime-edit-fields-wrapper {
          padding: var(--input-field-padding, 0 1px);
          border: var(--input-border-width, thin) solid transparent;
        }
        .native,
        .native::-webkit-datetime-edit,
        .native::-webkit-datetime-edit-fields-wrapper,
        .native::-webkit-datetime-edit-ampm-field,
        .native::-webkit-datetime-edit-text,
        .native::-webkit-datetime-edit-day-field,
        .native::-webkit-datetime-edit-second-field,
        .native::-webkit-datetime-edit-millisecond-field,
        .native::-webkit-datetime-edit-hour-field,
        .native::-webkit-datetime-edit-minute-field,
        .native::-webkit-datetime-edit-month-field,
        .native::-webkit-datetime-edit-week-field,
        .native::-webkit-datetime-edit-year-field {
          position: relative;
          line-height: normal;
          outline: none;
          color: var(--inner-input-color, currentColor);
          font-family: inherit;
          font-size: inherit;
          box-sizing: content-box;
          letter-spacing: inherit;
          align-self: center;
        }
        .native::-webkit-datetime-edit-ampm-field,
        .native::-webkit-datetime-edit-day-field,
        .native::-webkit-datetime-edit-second-field,
        .native::-webkit-datetime-edit-millisecond-field,
        .native::-webkit-datetime-edit-hour-field,
        .native::-webkit-datetime-edit-minute-field,
        .native::-webkit-datetime-edit-month-field,
        .native::-webkit-datetime-edit-week-field,
        .native::-webkit-datetime-edit-year-field {
          cursor: var(--input-cursor, pointer);
          @apply --input-style;
          background: var(--inner-input-background);
          border-width: var(--inner-input-border-width, thin);
          border-color: var(--inner-input-border-color, transparent);
          border-style: var(--inner-input-border-style, solid);
          padding: var(--inner-input-padding);
          border-radius: var(--inner-input-border-radius);
          text-align: center;
          align-self: center;
        }
        .native::-webkit-datetime-edit-day-field,
        .native::-webkit-datetime-edit-second-field,
        .native::-webkit-datetime-edit-millisecond-field,
        .native::-webkit-datetime-edit-hour-field,
        .native::-webkit-datetime-edit-minute-field,
        .native::-webkit-datetime-edit-month-field,
        .native::-webkit-datetime-edit-week-field {
          min-width: 2ch;
        }
        .native::-webkit-datetime-edit-millisecond-field {
          min-width: 3ch;
        }
        .native::-webkit-datetime-edit-year-field {
          min-width: 4ch;
        }
        .native::-webkit-datetime-edit-ampm-field:focus,
        .native::-webkit-datetime-edit-day-field:focus,
        .native::-webkit-datetime-edit-second-field:focus,
        .native::-webkit-datetime-edit-millisecond-field:focus,
        .native::-webkit-datetime-edit-hour-field:focus,
        .native::-webkit-datetime-edit-minute-field:focus,
        .native::-webkit-datetime-edit-month-field:focus,
        .native::-webkit-datetime-edit-week-field:focus,
        .native::-webkit-datetime-edit-year-field:focus {
          color: var(--inner-input-focus-color);
          background: var(--inner-input-focus-background);
          border-color: var(--inner-input-focus-border-color, transparent);
          border-style: var(--inner-input-focus-border-style, solid);
        }
        .native::-webkit-calendar-picker-indicator {
          fill: currentColor;
          align-self: center;
          cursor: pointer;
        }
        .native::-webkit-calendar-picker-indicator:hover {
          background: transparent;
        }
        .native::-webkit-inner-spin-button {
          display: none;
        }
        .native.timezone {
          --input-border-color: transparent;
          --input-focus-border-color: transparent;
        }
      `;
    }

    /**
     * template for control buttons
     * @type {string}
     */
    static get buttonTemplate() {
      return html`
        <button class="icon now" hidden$="[[hideNowButton]]" on-click="now" on-keydown="_stopPropagation">${this._iconNowTemplate}</button>
        ${super.buttonTemplate || html``}
      `;
    }

    static get _iconNowTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></g></svg>`;
    }

    static get properties() {
      return {
        /**
         * Set to `true` to hide the `now`-button
         */
        hideNowButton: {
          type: Boolean
        },
        /**
         * Set to `true` to hide the `now`-button
         */
        _nativeInput: {
          type: String
        }
      };
    }

    static get observers() {
      return [
        '_computeNativeInput(date, time)',
        '_reflectNativeInput(_nativeInput)'
      ];
    }

    _computeNativeInput(date, time) {
      if (!(date && time)) {
        if (!(date || time)) {
          this._nativeInput = '';
        }
        return;
      }
      this._nativeInput = `${date}T${time}`;
    }

    _reflectNativeInput(nativeInput) {
      if (!this._computeShouldNative(this.native) || !nativeInput) {
        return;
      }
      const parts = nativeInput.split('T');
      this._dateTimeChanged(parts[0], parts[1]);
    }

    _computeNativeStep(partsStep, clamp) {
      if (partsStep === undefined) {
        return 1;
      }
      if (this.constructor.expectedNativeInputType === 'date') {
        return partsStep.day;
      }
      switch (clamp) {
        case 'year':
        case 'month':
        case 'day':
        case 'hour':
          return 86400 * partsStep.day;
        case 'minute':
          return 3600 * partsStep.hour;
        case 'second':
          return 60 * partsStep.second;
        case 'millisecond':
          return 1 * partsStep.millisecond;
        default:
          return 0.001;
      }
    }

    _computeNativeThreshold(value) {
      if (isNaN(value)) {
        return;
      }
      const d = new Date(value);
      let offsetMinutes = this.offsetMinutes;
      if (isNaN(offsetMinutes)) {
        offsetMinutes = d.getTimezoneOffset();
      }
      // shift to UTC
      d.setMinutes(d.getMinutes() - offsetMinutes);
      if (this.constructor.expectedNativeInputType === 'date') {
        return this.__toDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
      } else if (this.constructor.expectedNativeInputType === 'time') {
        return this.__toTime(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
      }
      return this.__toDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()) + 'T' + this.__toTime(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    }

    setDate(d) {
      super.setDate(d);
      if (this.autoConfirm || (this._hasNative && this.native)) {
        this._setConfirmedValue();
      }
    }

    _defaultValueChanged(def) {
      super._defaultValueChanged(def);
      if (this._isSet(this.value)) {
        this._setConfirmedValue();
      }
    }

    /**
     * reset the value and date properties
     */
    reset(e) {
      this.resetDate(e);
      this._setConfirmedValue();
    }
  }
});
