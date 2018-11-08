import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '../../@polymer/polymer/lib/utils/mixin.js';
import { InputPickerPattern } from '../input-picker-pattern/input-picker-pattern.js';
import { SwitchMixin } from '../input-picker-pattern/switch-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '../datetime-input/datetime-input-mixin.js';
import { DateInputPattern } from '../datetime-input/date-input.js';
import { TimeInputPattern } from '../datetime-input/time-input.js';
import { DatetimeMixin } from '../property-mixins/datetime-mixin.js';
import { CalendarElementPattern } from './calendar-element.js';
import { DatePickerPattern } from './date-picker.js';
import { TimeElementPattern } from './time-element.js';
import { TimePickerPattern } from './time-picker.js';
import { DatetimePickerMixin } from './datetime-picker-mixin.js';

/**
 * Mixin for datetime-picker
 *
 * @mixinFunction
 * @polymer
 */
export const DatetimePickerPattern = dedupingMixin( superClass => {

  return class extends superClass {

    static get expectedNativeInputType() {
      return htmlLiteral`datetime-local`;
    }

    static get pickerTemplate() {
      return html`
        <div id="picker" class="dropdown" horizontal$="[[_ifClamped(clamp, 'day')]]">
          ${this.calendarTemplate}
          ${this.timeTemplate}
          <div id="buttons">
            ${this.buttonTemplate}
          </div>
        </div>
      `;
    }

    static get properties() {
      return {
        /**
         * Clamp datetime to a property
         * possible values: 'month', 'day', 'hour', 'minute', 'second', 'millisecond' or ''
         */
        clamp: {
          type: String,
          value: 'millisecond',
          notify: true
        }
      }
    }

    _computeNativeInput(date, time) {
      if (!date || !time) {
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
  }
});

/**
 *  `<datetime-picker>` is a picker for date and time for **[Polymer](https://github.com/Polymer/@polymer)** that can use the **native** input, too. If the **native** picker is choosen and is not supported, this element uses the **polyfill** datetime-picker. The `<calendar-element>` and the `<time-element>` will come in place if the native picker is not available or is not explicitly wanted. A range picker is provided by combining the `min`- and `max`-attributes.
 *
 *  ```html
 *    <datetime-picker value="{{value}}"></datetime-picker>
 *  ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices this polyfill.
 *
 *  ```html
 *    <datetime-picker native-on-mobile></datetime-picker>
 *  ```
 *
 *  If you need an **overlay** then use `overlay-datetime-picker`, that creates the element in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.
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
 * `--time-element`                       | Mixin applied to the time-element               | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element. `--inner-input-focus-background` and `--inner-input-focus-color` will style the selected date-cell and inputs.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin DatetimePickerPattern
 *  @appliesMixin DatePickerPattern
 *  @appliesMixin TimePickerPattern
 *  @appliesMixin DatetimePickerMixin
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin DateInputPattern
 *  @appliesMixin TimeInputPattern
 *  @appliesMixin CalendarElementPattern
 *  @appliesMixin TimeElementPattern
 *  @appliesMixin SwitchMixin
 *  @appliesMixin InputPickerPattern
 *  @appliesMixin DatetimeFormMixin
 *  @appliesMixin DatetimeMixin
 *
 *  @demo demo/index.html
 *  @demo demo/datetime-elements.html datetime elements
 *  @demo demo/form.html in a form
 *  @demo demo/music-album.html music album demo
 **/
class DatetimePicker extends DatetimePickerPattern(DatePickerPattern(TimePickerPattern(DatetimePickerMixin(CalendarElementPattern(TimeElementPattern(SwitchMixin(DateInputPattern(TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement))))))))))))) {

  static get is() {
    return 'datetime-picker';
  }

  static get styleToInclude() {
    return htmlLiteral`${super.styleToInclude || htmlLiteral``}dropdown-style`;
  }

  get _hasNative() {
    return DatetimePicker._hasNative;
  }
}

customElements.define(DatetimePicker.is, DatetimePicker);
