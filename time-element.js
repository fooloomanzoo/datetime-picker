import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeFormMixin } from '@fooloomanzoo/datetime-input/datetime-input-mixin.js';
import { SwitchMixin } from '@fooloomanzoo/input-picker-pattern/switch-mixin.js';
import '@fooloomanzoo/number-input/integer-input.js';
import '@fooloomanzoo/input-picker-pattern/input-picker-shared-style.js';
import '@fooloomanzoo/input-picker-pattern/input-shared-style.js';

/**
 * Mixin for calendar-element
 *
 * @mixinFunction
 * @polymer
 */
export const TimeElementPattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get styleTemplate() {
      return htmlLiteral`
        ${super.styleTemplate || htmlLiteral``}
        :host {
          --computed-reduced-icon-padding: calc(var(--input-icon-padding, 0.5em) / 4);
        }
        #timer {
          color: var(--input-picker-color);
          background-color: var(--input-picker-background);
          border-radius: var(--input-picker-border-radius);
          padding: var(--input-picker-padding);
          @apply --input-picker;
          display: inline-flex;
          flex-flow: row nowrap;
          align-items: center;
          @apply --time-element;
        }
        #timer .field {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        #timer .timezone {
          display: flex;
          align-items: center;
        }
        #timer .buttons {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          justify-content: space-between;
        }
        #timer .field > integer-input {
          --input-color: var(--inner-input-color, var(--input-picker-color));
          align-self: stretch;
          justify-content: center;
        }
        #timer .field > .switch {
          padding-top: var(--computed-reduced-icon-padding);
          padding-bottom: var(--computed-reduced-icon-padding);
        }
        #timer .field > .switch:first-of-type {
          border-bottom-left-radius: 1px;
          border-bottom-right-radius: 1px;
        }
        #timer .field > .switch:last-of-type {
          border-top-left-radius: 1px;
          border-top-right-radius: 1px;
        }
        #timer .hour12 {
          flex-shrink: 0;
          font-size: 0.85em;
          margin: 0 0.15em;
          padding: 0.1em;
          border-color: transparent;
        }
      `;
    }

    static get timeTemplate() {
      return html`
        <div id="timer" hidden$="[[_ifClamped(clamp, 'hour')]]">
          <div class="field">
            <button class="icon switch" prop="hour" step$="[[_partsStep.hour]]" disabled$="[[_partsDisabled.hour]]">${this._iconStepUpTemplate}</button>
            <integer-input hidden$="[[hour12Format]]" pad-length="2" no-clamp min="-1" max="24" value-as-number="{{hour}}" placeholder="00" disabled$="[[_partsDisabled.hour]]" step="[[_partsStep.hour]]"></integer-input>
            <template is="dom-if" if="[[hour12Format]]">
              <integer-input pad-length="2" no-clamp value-as-number="{{hour12}}" min="0" max="13" placeholder="00" disabled$="[[_partsDisabled.hour]]" step="[[_partsStep.hour]]"></integer-input>
            </template>
            <button class="icon switch" prop="hour" step$="[[_partsStep.hour]]" disabled$="[[_partsDisabled.hour]]" invert>${this._iconStepDownTemplate}</button>
          </div>
          <span hidden$="[[_ifClamped(clamp, 'minute')]]">[[timeSeparator]]</span>
          <div class="field" hidden$="[[_ifClamped(clamp, 'minute')]]">
            <button class="icon switch" prop="minute" step$="[[_partsStep.minute]]" disabled$="[[_partsDisabled.minute]]">${this._iconStepUpTemplate}</button>
            <integer-input pad-length="2" value-as-number="{{minute}}" min="-1" max="60" no-clamp placeholder="00" disabled$="[[_partsDisabled.minute]]" step="[[_partsStep.minute]]"></integer-input>
            <button class="icon switch" prop="minute" step$="[[_partsStep.minute]]" disabled$="[[_partsDisabled.minute]]" invert>${this._iconStepDownTemplate}</button>
          </div>
          <span hidden$="[[_ifClamped(clamp, 'minute')]]">[[timeSeparator]]</span>
          <div class="field" hidden$="[[_ifClamped(clamp, 'second')]]">
            <button class="icon switch" prop="second" step$="[[_partsStep.second]]" disabled$="[[_partsDisabled.second]]">${this._iconStepUpTemplate}</button>
            <integer-input pad-length="2" value-as-number="{{second}}" min="-1" max="60" no-clamp placeholder="00" disabled$="[[_partsDisabled.second]]" step="[[_partsStep.second]]"></integer-input>
            <button class="icon switch" prop="second" step$="[[_partsStep.second]]" disabled$="[[_partsDisabled.second]]" invert>${this._iconStepDownTemplate}</button>
          </div>
          <span hidden$="[[_ifClamped(clamp, 'millisecond')]]">[[decimalSeparator]]</span>
          <div class="field" hidden$="[[_ifClamped(clamp, 'millisecond')]]">
            <button class="icon switch" prop="millisecond" step$="[[_partsStep.millisecond]]" disabled$="[[_partsDisabled.millisecond]]">${this._iconStepUpTemplate}</button>
            <integer-input pad-length="3" value-as-number="{{millisecond}}" min="0" max="999" no-clamp placeholder="000" disabled$="[[_partsDisabled.millisecond]]" step="[[_partsStep.millisecond]]"></integer-input>
            <button class="icon switch" prop="millisecond" step$="[[_partsStep.millisecond]]" disabled$="[[_partsDisabled.millisecond]]" invert>${this._iconStepDownTemplate}</button>
          </div>
          <template is="dom-if" if="[[hour12Format]]">
            <button class="hour12" disabled$="[[partsHidden.hour]]" on-click="_switchAm" hidden$="[[!valueIsSet]]">
              <div hidden$="[[!isAm]]">[[amString]]</div>
              <div hidden$="[[isAm]]">[[pmString]]</div>
            </button>
          </template>
          <template is="dom-if" if="[[withTimezone]]">
            <div class="timezone">
              <div class="field">
                <button class="icon switch" prop="_timeZoneHours" step="1" disabled$="[[disabled]]">${this._iconStepUpTemplate}</button>
                <integer-input value="{{_timeZoneHours}}" pad-length="2" always-sign step="1" placeholder="±00" min="-23" max="23" use-negative-zero></integer-input>
                <button class="icon switch" prop="_timeZoneHours" step="-1" disabled$="[[disabled]]">${this._iconStepDownTemplate}</button>
              </div>
              <span>[[timeSeparator]]</span>
              <div class="field">
                <button class="icon switch" prop="_timeZoneMinutes" step="15" disabled$="[[disabled]]">${this._iconStepUpTemplate}</button>
                <integer-input value="{{_timeZoneMinutes}}" pad-length="2" min="0" max="45" step="15" placeholder="00"></integer-input>
                <button class="icon switch" prop="_timeZoneMinutes" step="-15" disabled$="[[disabled]]">${this._iconStepDownTemplate}</button>
              </div>
            </div>
          </template>
        </div>
      `
    }

    static get properties() {
      return {
      /**
       * if true, timezone inputs are shown
       */
        withTimezone: {
          type: Boolean,
          value: false
        },

        /**
         * Clamp timetime to a property
         * possible values: 'month', 'day', 'hour', 'minute', 'second', 'millisecond' or ''
         */
        clamp: {
          type: String,
          value: '',
          notify: true
        },

        /**
         * if true perspective starts at 0 (1970-01-01)
         */
        _timeOnly: {
          type: Boolean,
          value: true
        }
      }
    }

    static get observers() {
      // timezone-inputs and hour12-input are created asynchronously
      return [
        '_addSwitchListener(withTimezone, hour12Format)'
      ]
    }

    _switchAm() {
      // e && e.stopPropagation();
      this.isAm = !this.isAm;
    }
  }
});

/**
   * `<time-element>` adds a time-input to your page using Polymer.
   *
   * If you like to connect it to an input, try it like:
   *
   *  ```html
   *     <input type="time" value-as-number="{{time::input}}" step="1">
   *
   *     <time-element time="{{time}}"></time-element>
   *  ```
   *
   * For example if you clamp on `millisecond`, you can round to `0` millisecond and hide the input. If you set `clamp="second"` the inputs for *second* and *millisecond* are hidden.
   *
   * The following custom properties and mixins are also available for styling:
   *
   * Custom property | Description | Default
   * ----------------|-------------|----------
   * `--time-element`                   | Mixin applied to the time-element              | {}
   *
   *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
   *
   * @customElement
   * @polymer
   *
   *  @appliesMixin TimeElementPattern
   *  @appliesMixin SwitchMixin
   *  @appliesMixin DatetimeFormMixin
   *  @appliesMixin FormElementMixin
   *  @appliesMixin DatetimeMixin
   *
   * @demo demo/time-elements.html time elements
   **/
class TimeElement extends TimeElementPattern(SwitchMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement))))) {

  static get is() {
    return 'time-element';
  }

  static get template() {
    return html`
      <style include="input-shared-style input-picker-shared-style">
        ${this.styleTemplate}
      </style>
      ${this.timeTemplate}
    `
  }
}
customElements.define(TimeElement.is, TimeElement);
