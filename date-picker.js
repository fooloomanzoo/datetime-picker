import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { InputPickerPattern } from '@fooloomanzoo/input-picker-pattern/input-picker-pattern.js';
import { SwitchMixin } from '@fooloomanzoo/input-picker-pattern/switch-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '@fooloomanzoo/datetime-input/datetime-input-mixin.js';
import { DateInputPattern } from '@fooloomanzoo/datetime-input/date-input.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { CalendarElementPattern } from './calendar-element.js';
import { DatetimePickerMixin } from './datetime-picker-mixin.js';
import '@fooloomanzoo/input-picker-pattern/dropdown-style.js';
import '@fooloomanzoo/input-picker-pattern/dropdown-tip-style.js';

/**
 * Mixin for date-picker
 *
 * @mixinFunction
 * @polymer
 */
export const DatePickerPattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get expectedNativeInputType() {
      return htmlLiteral`date`;
    }

    static get pickerTemplate() {
      return html`
        <div id="picker" class="dropdown" horizontal$="[[_ifClamped(clamp, 'day')]]">
          ${this.calendarTemplate}
          <div id="buttons">
            ${this.buttonTemplate}
          <div>
        </div>
      `;
    }

    static get styleTemplate() {
      return htmlLiteral`
        ${super.styleTemplate || htmlLiteral``}
        :host(:not([opened])) #calendar #days > *:hover:before {
          border-color: var(--inner-input-focus-background);
        }
      `;
    }

    _computeNativeInput(date, time) {
      if (!(date && time)) {
        if (!(date || time)) {
          this._nativeInput = '';
        }
        return;
      }
      this._nativeInput = date;
    }

    _reflectNativeInput(nativeInput) {
      if (!this._computeShouldNative(this.native) || !nativeInput) {
        return;
      }
      this._dateTimeChanged(nativeInput, this.time);
    }

    renderCalendar(year, month, day) {
      if (!this.opened || (this._hasNative && this.native)) {
        return;
      }
      super.renderCalendar(year, month, day);
    }

    _openedChanged(opened) {
      super._openedChanged && super._openedChanged(opened);
      if (this._hasNative && this.native) {
        return;
      }
      if (opened) {
        super.renderCalendar(this.year, this.month, this.day);
        if (this.$.daySelector) {
          this.$.daySelector.focus();
        }
      } else {
        setTimeout(() => {
          // remove current day nodes, when picker closes
          this._setCurrentHoveredDayNode(null);
          this._setCurrentActiveDayNode(null);
          this._setCurrentSelectedDayNode(null);
        }, 0)
      }
    }

    _confirmedValueChanged(confirmedValue) {
      super._confirmedValueChanged(confirmedValue);
      this.__lastSelectedDay = [this.year, this.month - 1, this.day];
    }
  }
});

/**
 *  `<date-picker>` is a picker for date for **[Polymer](https://github.com/Polymer/polymer)** that can use the **native** input, too. If the **native** picker is choosen and is not supported, this element uses the **polyfill** date-picker. The `<calendar-element>` will come in place if the native picker is not available or is not explicitly wanted. A range picker is provided by combining the `min`- and `max`-attributes.
 *
 *  ```html
 *    <date-picker value="{{value}}"></date-picker>
 *  ```
 *
 *  If you need an **overlay** then use `overlay-date-picker`, that creates the element in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--calendar-element`                   | Mixin applied to the calendar                  | {}
 * `--calendar-cell`                      | Mixin applied to the date cells                | {}
 * `--calendar-cell-hovered-background`   | background of the hovered date cells           | transparent
 * `--calendar-cell-hovered-border-color` | border-color of the hovered date cells         | currentColor
 * `--calendar-cell-size`                 | width of a date cell                           | 3em
 * `--calendar-cell-border-radius`        | border-radius of a date cell                   | 0.3em
 * `--calendar-cell-font-size`            | font-size of a date cell                       | 0.75em
 * `--calendar-cell-notinmonth-opacity`   | text opacity of a date cell that are not in the current month | 0.6
 * `--calendar-cell-weekend-opacity`      | text opacity of a date cell that are on weekend | 1
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element. `--inner-input-focus-background` and `--inner-input-focus-color` will style the selected date-cell and inputs.
 *
 *  @polymer
 *  @customElement
 *
 *  @appliesMixin DatePickerPattern
 *  @appliesMixin DatetimePickerMixin
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin DateInputPattern
 *  @appliesMixin CalendarElementPattern
 *  @appliesMixin SwitchMixin
 *  @appliesMixin InputPickerPattern
 *  @appliesMixin DatetimeFormMixin
 *  @appliesMixin DatetimeMixin
 *
 *  @demo demo/index.html
 *  @demo demo/date-elements.html date elements
 *  @demo demo/form.html in a form
 *  @demo demo/music-album.html music album demo
 **/
class DatePicker extends DatePickerPattern(DatetimePickerMixin(CalendarElementPattern(SwitchMixin(DateInputPattern(DatetimeInputMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement))))))))) {

  static get is() {
    return 'date-picker';
  }

  get _hasNative() {
    return DatePicker._hasNative;
  }

  static get styleToInclude() {
    return htmlLiteral`${super.styleToInclude || htmlLiteral``}dropdown-style`;
  }
}
customElements.define(DatePicker.is, DatePicker);
