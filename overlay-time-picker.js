import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { OverlayPickerMixin } from '@fooloomanzoo/input-picker-pattern/overlay-picker-mixin.js';
import { InputPickerPattern } from '@fooloomanzoo/input-picker-pattern/input-picker-pattern.js';
import { SwitchMixin } from '@fooloomanzoo/input-picker-pattern/switch-mixin.js';
import { DatetimeFormMixin, DatetimeInputMixin } from '@fooloomanzoo/datetime-input/datetime-input-mixin.js';
import { TimeInputPattern } from '@fooloomanzoo/datetime-input/time-input.js';
import { DatetimeMixin } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { TimeElementPattern } from './time-element.js';
import { DatetimePickerMixin } from './datetime-picker-mixin.js';
import { TimePickerPattern } from './time-picker.js';
/**
 *   `<overlay-time-picker>` extends `time-picker` in an overlay.
 *
 *   ```html
 *   <overlay-time-picker value="{{value}}"></overlay-time-picker>
 *   ```
 *
 *  A use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices the polyfill.
 *
 *  ```html
 *    <overlay-time-picker native-on-mobile></overlay-time-picker>
 *  ```
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--time-element` | Mixin applied to the time-element | {}
 *
 *  Have a look at [input-picker-pattern#input-picker-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-picker-shared-style) and [input-picker-pattern#input-shared-style](https://github.com/fooloomanzoo/input-picker-pattern#input-shared-style) to see how to style the element.
 *
 *  @customElement
 *  @polymer
 *
 *  @appliesMixin OverlayPickerMixin
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
 *  @demo demo/overlay-elements.html overlay demo
 *  @demo demo/music-album.html music album demo
 **/
class OverlayTimePicker extends OverlayPickerMixin(TimePickerPattern(DatetimePickerMixin(TimeElementPattern(SwitchMixin(TimeInputPattern(DatetimeInputMixin(DatetimeFormMixin(InputPickerPattern(DatetimeMixin(PolymerElement)))))))))) {

  static get is() {
    return 'overlay-time-picker';
  }

  get _hasNative() {
    return OverlayTimePicker._hasNative;
  }
}
customElements.define(OverlayTimePicker.is, OverlayTimePicker);
