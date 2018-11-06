import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { InputPickerPattern } from '@fooloomanzoo/input-picker-pattern/input-picker-pattern.js';
import { SwitchMixin } from '@fooloomanzoo/input-picker-pattern/switch-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '@fooloomanzoo/datetime-input/datetime-input-mixin.js';
import { TimeInputPattern } from '@fooloomanzoo/datetime-input/time-input.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { TimeElementPattern } from './time-element.js';
import { DatetimePickerMixin } from './datetime-picker-mixin.js';
import '@fooloomanzoo/input-picker-pattern/dropdown-style.js';
import '@fooloomanzoo/input-picker-pattern/dropdown-tip-style.js';

/**
 * Mixin for time-picker
 *
 * @appliesMixin TimeInputPattern
 * @appliesMixin TimeElementPattern
 * @appliesMixin DatetimePickerMixin
 *
 * @mixinFunction
 * @polymer
 */
export const TimePickerPattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get expectedNativeInputType() {
      return htmlLiteral`time`;
    }

    static get pickerTemplate() {
      return html`
        <div id="picker" class="dropdown" horizontal>
          ${this.timeTemplate}
          <div id="buttons">
            ${this.buttonTemplate}
          <div>
        </div>
      `;
    }

    _computeNativeInput(date, time) {
      if (!(date && time)) {
        if (!(date || time)) {
          this._nativeInput = '';
        }
        return;
      }
      this._nativeInput = time;
    }

    _reflectNativeInput(nativeInput) {
      if (!this._computeShouldNative(this.native) || !nativeInput) {
        return;
      }
      this._dateTimeChanged(this.date, nativeInput);
    }
  }
});

/**
 *  `<time-picker>` is a picker for time for **[Polymer](https://github.com/Polymer/polymer)** that can use the **native** input, too. If the **native** picker is choosen and is not supported, this element uses the **polyfill** time-picker. The `<time-element>` will come in place if the native picker is not available or is not explicitly wanted. A range picker is provided by combining the `min`- and `max`-attributes.
 *
 *  ```html
 *    <time-picker value="{{value}}"></time-picker>
 *  ```
 *
 *  If you need an **overlay** then use `overlay-time-picker`, that creates the element in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--time-element`                   | Mixin applied to the time-element              | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @polymer
 *  @customElement
 *
 *  @appliesMixin DatetimePickerMixin
 *  @appliesMixin DatetimeInputMixin
 *  @appliesMixin TimePickerPattern
 *  @appliesMixin TimeInputPattern
 *  @appliesMixin TimeElementPattern
 *  @appliesMixin SwitchMixin
 *  @appliesMixin InputPickerPattern
 *  @appliesMixin DatetimeFormMixin
 *  @appliesMixin DatetimeMixin
 *
 *  @demo demo/index.html
 *  @demo demo/time-elements.html time elements
 *  @demo demo/form.html in a form
 *  @demo demo/music-album.html music album demo
 **/
class TimePicker extends TimePickerPattern(DatetimePickerMixin(TimeElementPattern(SwitchMixin(TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement))))))))) {

  static get is() {
    return 'time-picker';
  }

  static get styleToInclude() {
    return htmlLiteral`${super.styleToInclude || htmlLiteral``}dropdown-style`;
  }

  get _hasNative() {
    return TimePicker._hasNative;
  }
}
customElements.define(TimePicker.is, TimePicker);
