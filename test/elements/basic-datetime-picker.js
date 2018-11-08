import { PolymerElement } from '../../../../@polymer/polymer/polymer-element.js';
import { html, htmlLiteral } from '../../../../@polymer/polymer/lib/utils/html-tag.js';
import { InputPickerPattern } from '../../../input-picker-pattern/input-picker-pattern.js';
import { DatetimeFormMixin } from '../../../datetime-input/datetime-input-mixin.js';
import { DatetimeMixin } from '../../../property-mixins/datetime-mixin.js';
import { DatetimePickerMixin } from '../../datetime-picker-mixin.js';

class BasicDatetimePicker extends DatetimePickerMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement)))) {
  static get is() {
    return 'basic-datetime-picker';
  }

  static get expectedNativeInputType() {
    return htmlLiteral`datetime-local`;
  }

  static get inputTemplate() {
    return html`[[datetime]] | [[confirmedValue]]`;
  }

  get _hasNative() {
    return BasicDatetimePicker._hasNative;
  }
}
window.customElements.define(BasicDatetimePicker.is, BasicDatetimePicker);
