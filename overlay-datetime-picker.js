import { PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '../../@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '../../@polymer/polymer/lib/utils/mixin.js';
import { OverlayPickerMixin } from '../input-picker-pattern/overlay-picker-mixin.js';
import { InputPickerPattern } from '../input-picker-pattern/input-picker-pattern.js';
import { SwitchMixin } from '../input-picker-pattern/switch-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '../datetime-input/datetime-input-mixin.js';
import { DateInputPattern } from '../datetime-input/date-input.js';
import { TimeInputPattern } from '../datetime-input/time-input.js';
import { DatetimeMixin } from '../property-mixins/datetime-mixin.js';
import { CalendarElementPattern } from './calendar-element.js';
import { DatetimePickerPattern } from './datetime-picker.js';
import { DatePickerPattern } from './date-picker.js';
import { TimeElementPattern } from './time-element.js';
import { TimePickerPattern } from './time-picker.js';
import { DatetimePickerMixin } from './datetime-picker-mixin.js';
/**
 *   `<overlay-datetime-picker>` extends `datetime-picker` and behaves simular.
 *
 *   ```html
 *   <overlay-datetime-picker value="{{value}}" ></overlay-datetime-picker>
 *   ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices the polyfill.
 *
 *  ```html
 *    <overlay-datetime-picker native-on-mobile></overlay-datetime-picker>
 *  ```
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--calendar-element`               | Mixin applied to the calendar                  | {}
 * `--calendar-cell`                  | Mixin applied to the date cells                | {}
 * `--calendar-cell-hovered`          | Mixin applied to hovered date cells            | {}
 * `--calendar-cell-size`             | width of a date cell                           | 3em
 * `--calendar-cell-border-radius`    | border-radius of a date cell                   | 0.25em
 * `--calendar-cell-font-size`        | font-size of a date cell                       | 0.75em
 * `--time-element`                   | Mixin applied to the time-element              | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin OverlayPickerMixin
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
 *  @demo demo/overlay-elements.html overlay demo
 *  @demo demo/music-album.html music album demo
 **/
class OverlayDatetimePicker extends OverlayPickerMixin(DatetimePickerPattern(DatePickerPattern(TimePickerPattern(DatetimePickerMixin(CalendarElementPattern(TimeElementPattern(SwitchMixin(DateInputPattern(TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement)))))))))))))) {

  static get is() {
    return 'overlay-datetime-picker';
  }

  get _hasNative() {
    return OverlayDatetimePicker._hasNative;
  }
}
window.customElements.define(OverlayDatetimePicker.is, OverlayDatetimePicker);
