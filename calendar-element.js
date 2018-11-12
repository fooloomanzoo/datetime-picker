import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { FormElementMixin } from '@fooloomanzoo/input-picker-pattern/form-element-mixin.js';
import { DatetimeMixin, maxDayOfMonth } from '@fooloomanzoo/property-mixins/datetime-mixin.js';
import { DatetimeFormMixin } from '@fooloomanzoo/datetime-input/datetime-input-mixin.js';
import { SwitchMixin } from '@fooloomanzoo/input-picker-pattern/switch-mixin.js';
import '@fooloomanzoo/number-input/integer-input.js';
import { style as inputPickerStyle } from '@fooloomanzoo/input-picker-pattern/input-picker-shared-style.js';
import { style as inputStyle } from '@fooloomanzoo/input-picker-pattern/input-shared-style.js';

/**
 * clamp a date object to the day property
 * @param  {Date} d   The date object
 * @return {Date} d   The clamped date object
 */
const clampDay = function(d) {
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}

/**
 * computes the difference beetween two dates in the count of days
 * @param  {Date} end    The end date
 * @param  {Date} start  The start date
 * @return {number}      The number of days between the end date and the start date
 */
const dayDiff = function(end, start) {
  return Math.ceil((end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * 6E4) / 864E5);
}

/**
 * Mixin for calendar-element
 *
 * @mixinFunction
 * @polymer
 */
export const CalendarElementPattern = dedupingMixin( superClass => {
  return class extends superClass {

    static get styleTemplate() {
      return html`
        ${super.styleTemplate || html``}
        ${inputStyle}
        <style>
          #calendar {
            color: var(--input-picker-color);
            background-color: var(--input-picker-background);
            border-radius: var(--input-picker-border-radius);
            padding: var(--input-picker-padding);
            @apply --input-picker;
            display: inline-flex;
            flex-flow: column nowrap;
            @apply --calendar-element;
          }
          #calendar #top {
            display: inline-flex;
            flex-flow: row nowrap;
            align-items: stretch;
            align-self: stretch;
          }
          #calendar #monthSelector {
            flex: 1 0 auto;
            --inner-input-color: var(--input-picker-color, inherit);
            --inner-input-border-style: solid;
            --inner-input-focus-border-style: solid;
          }
          #calendar #monthSelector option {
            color: var(--inner-input-focus-color, currentColor);
            background: var(--inner-input-focus-background, rgba(0,0,0,0.1));
            text-align: center;
          }
          #calendar #yearSelector {
            font-weight: bold;
            flex: 0 0 auto;
            --input-color: var(--inner-input-color, var(--input-picker-color, inherit));
            --input-border-style: solid;
            --input-focus-border-style: solid;
            --input-padding: var(--inner-input-padding, 0.5em);
            align-self: stretch;
          }
          #calendar #daySelector {
            position: relative;
          }
          #calendar #daySelector:focus {
            outline: none;
          }
          #calendar #caption {
            display: inline-flex;
            flex-flow: row nowrap;
          }
          #calendar #caption > *,
          #calendar #days > * {
            @apply --calendar-cell;
            -webkit-background-clip: padding-box;
            color: inherit;
            background-clip: padding-box;
            line-height: normal;
            float: left;
            position: relative;
            font-size: var(--calendar-cell-font-size, 0.75em);
            border-radius: var(--calendar-cell-border-radius, 0.3em);
            min-width: 2ch;
            min-height: 1em;
            box-sizing: content-box;
            background-color: transparent;
            transition-property: background-color;
            transition-duration: var(--input-transition-duration, 250ms);
            transition-timing-function: var(--input-transition-timing-function, cubic-bezier(0.6, 1, 0.2, 1));
            width: var(--calendar-cell-size, 3em);
          }
          #calendar #days > * {
            height: var(--calendar-cell-size, 3em);
          }
          #calendar #caption > *{
            height: var(--calendar-caption-height, 1em);
          }
          #calendar #days > *:nth-child(7n+1) {
            clear: left;
          }
          #calendar #days > *:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            border-radius: inherit;
            border: thin solid transparent;
            transition-property: opacity;
            transition-duration: var(--input-transition-duration, 250ms);
            transition-timing-function: var(--input-transition-timing-function, cubic-bezier(0.6, 1, 0.2, 1));
          }
          #calendar #caption > *:after,
          #calendar #days > *:after {
            content: attr(data-day);
            color: currentColor;
            position: absolute;
            white-space: nowrap;
            opacity: 1;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
          }
          #calendar #daySelector *:nth-child(7n-1):after,
          #calendar #daySelector *:nth-child(7n):after {
            opacity: var(--calendar-cell-weekend-opacity, 1);
          }
          #calendar #daySelector[disabled] #days {
            font-style: var(--input-disabled-font-style, oblique);
            opacity: var(--input-disabled-opacity, 0.75);
          }
          #calendar #days {
            cursor: pointer;
          }
          #calendar #days > *:hover {
            will-change: background-color;
            background-color: var(--calendar-cell-hovered-background, transparent);
          }
          #calendar #daySelector:not([disabled]) .selected {
            background-color: var(--inner-input-focus-background);
            color: var(--inner-input-focus-color);
          }
          #calendar #days > *:hover:before {
            will-change: opacity, border-color;
            border-color: var(--calendar-cell-hovered-border-color, currentColor);
            opacity: 0.5;
          }
          #calendar #days > .current:before,
          #calendar #days > .active:before {
            opacity: 0.5;
            border-color: currentColor;
          }
          #calendar #days > .selected:before,
          :host(:hover) #calendar #days > .active:before,
          #calendar #daySelector:focus .active:before {
            border-color: var(--inner-input-focus-background);
          }
          :host(:hover) #calendar #days > .active:before,
          #calendar #days > .active:hover:before {
            opacity: 0.75;
          }
          #calendar #days > .active:before {
            transition-duration: 0;
          }
          #calendar #days > .selected:before {
            opacity: 0.9;
          }
          #calendar #days > .notinmonth:after {
            opacity: var(--calendar-cell-notinmonth-opacity, 0.6);
          }
          #calendar #days > .outofrange {
            pointer-events: none !important;
          }
          #calendar #days > .outofrange:after {
            opacity: 0.5;
          }
          #calendar #days > .outofrange:before {
            opacity: 0.25;
          }
          #calendar #days > .outofrange:not(.notinmonth):after {
            font-style: var(--input-disabled-font-style, oblique);
          }
          #calendar #days > .outofrange:after {
            opacity: 0.5;
            @apply --input-disabled;
          }
        </style>
      `;
    }

    static get calendarTemplate() {
      return html`
        <div id="calendar" tabindex>
          <div id="top">
            <button class="icon switch" prop$="[[_computeIncremPropTop(_partsDisabled.month, clamp)]]" step="-1" style="order:0" disabled$="[[_partsDisabled.year]]">${this._iconStepLeftTemplate}</button>
            <select id="monthSelector" hidden$="[[_ifClamped(clamp, 'month')]]" style="order:[[_computeOrderMonth(dateOrder)]];" disabled$="[[_partsDisabled.month]]" value="{{month::change}}">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
              <option value="6"></option>
              <option value="7"></option>
              <option value="8"></option>
              <option value="9"></option>
              <option value="10"></option>
              <option value="11"></option>
              <option value="12"></option>
            </select>
            <integer-input id="yearSelector" style="order:[[_computeOrderMonth(dateOrder, 'true')]];" pad-length="4" disabled="[[_partsDisabled.year]]" start-at="[[_getDefaultForProp('year')]]" placeholder="[[_getDefaultForProp('year')]]" value="{{year}}"></integer-input>
            <button class="icon switch" prop$="[[_computeIncremPropTop(_partsDisabled.month, clamp)]]" step="1" style="order:3" disabled$="[[_partsDisabled.year]]">${this._iconStepRightTemplate}</button>
          </div>

          <div id="daySelector" hidden$="[[_ifClamped(clamp, 'day')]]" disabled$="[[_partsDisabled.day]]" tabindex="0" on-keydown="_checkKeycodeForDates">
            <div id="caption">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
            <div id="days" on-touchstart="_onClickDay" on-click="_onClickDay" on-mousemove="_onMouseMoveDay">
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
              <div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
          </div>
        </div>
      `
    }

    static get properties() {
      return {
        /**
         * Defines the first day of the week to use. Defaults to `1` (`monday`)
         * e.g. when `firstDayOfWeek` is `0` the first day of the week would be `sunday`
         */
        firstDayOfWeek: {
          type: Number,
          value: 1
        },

        /**
         * Current hovered day node
         * to access: bind the attribute ('current-hovered-day-node') and get its dataset `year`, `month` or `day`-property
         */
        currentHoveredDayNode: {
          type: Node,
          readOnly: true,
          notify: true
        },

        /**
         * Node of the last clicked day-field (by clicking or keypress)
         * to access: bind the attribute ('current-active-day-node') and get its dataset `year`, `month` or `day`-property
         */
        currentActiveDayNode: {
          type: Node,
          readOnly: true,
          notify: true,
          observer: '_currentActiveDayNodeChanged'
        },

        /**
         * Node of the last selected day
         * to access: bind the attribute ('current-selected-day-node') and get its dataset `year`, `month` or `day`-property
         */
        currentSelectedDayNode: {
          type: Node,
          readOnly: true,
          notify: true,
          observer: '_currentSelectedDayNodeChanged'
        },

        /**
         * Clamp datetime to a property
         * possible values: 'month', 'day', 'hour'
         */
        clamp: {
          type: String,
          value: 'hour',
          notify: true
        },

        /**
         * if true perspective starts at 0 (1970-01-01)
         */
        _timeOnly: {
          type: Boolean,
          value: false
        }
      }
    }

    static get observers() {
      return [
        'renderCalendar(year, month, day)',
        '_setWeekDayCaptions(locale, firstDayOfWeek)',
        '_setMonthSelectorOptions(locale)'
      ]
    }

    connectedCallback() {
      super.connectedCallback();
      this.renderCalendar(this.year, this.month, this.day);
    }

    _computeOrderMonth(dateOrder, forYear) {
      if (!(dateOrder && dateOrder.parts)) {
        return;
      }
      let indexMonth = dateOrder.parts.indexOf('month');
      let indexYear = dateOrder.parts.indexOf('year');
      if (indexMonth < indexYear) {
        return forYear ? 2 : 1;
      }
      return forYear ? 1 : 2;
    }

    _onMouseMoveDay(e) {
      if (e) {
        const paths = e.path || [e.target];
        for (let i = 0; i < paths.length; i++) {
          if (paths[i].dataset && paths[i].dataset.day) {
            if (paths[i] !== this.currentHoveredDayNode) {
              this._setCurrentHoveredDayNode(paths[i]);
            }
            return;
          }
        }
      }
      this._setCurrentHoveredDayNode(null);
    }

    _onClickDay(e) {
      this._onMouseMoveDay(e);
      if (this.currentHoveredDayNode) {
        if (this.currentActiveDayNode) {
          if (this._dayDblClicked === true) {
            this._setCurrentSelectedDayNode(this.currentActiveDayNode);
            // emulating double-click behaviour for click event (tab event will appear as double click)
            this._dayDblClicked = false;
            // confirm, when dblclick
            this.confirm && this.confirm();
            return;
          }
        }
        this._setCurrentActiveDayNode(this.currentHoveredDayNode);
        // setting up dblclick behaviour
        this._dayDblClicked = true;
        setTimeout(() => {
          this._dayDblClicked = false;
        }, 500);
      }
    }

    _currentActiveDayNodeChanged(node, oldNode) {
      oldNode && oldNode.classList.remove('active');
      if (node) {
        node.classList.add('active');
        if (this.__updatingTimezoneOffset) {
          return;
        }
        this._computeDatetime(+node.dataset.year, +node.dataset.month, +node.dataset.day, this.hour, this.minute, this.second, this.millisecond);
      }
    }

    _currentSelectedDayNodeChanged(node, oldNode) {
      oldNode && oldNode.classList.remove('selected');
      if (node) {
        node.classList.add('selected');
        this.__lastSelectedDay = [+node.dataset.year, +node.dataset.month - 1, +node.dataset.day];
      }
    }

    _computeIncremPropTop(hideMonth) {
      if (hideMonth === true) {
        return 'year';
      }
      return 'month';
    }

    _setWeekDayCaptions(locale, firstDayOfWeek) {
      if (!locale) {
        return;
      }
      // set weekday titles
      for (let i = 0; i < 7; i++) {
        let d = new Date(Date.UTC(2000, 0, 1 + i));
        let weekday = ((d.getUTCDay() - (firstDayOfWeek || 0)) % 7 + 7) % 7; // mathematical modulo
        if (this.$.caption.children[weekday]) {
          this.$.caption.children[weekday].dataset.day = d.toLocaleDateString(locale, {
            timeZone: 'UTC',
            weekday: 'short'
          });
        }
      }
    }

    _setMonthSelectorOptions(locale) {
      if (!locale) {
        return;
      }
      for (let i = 0; i < 12; i++) {
        this.$.monthSelector.options[i].text = (new Date(1970, i, 15)).toLocaleDateString(locale, {
          month: 'long'
        });
      }
    }

    /**
     * renderCalendars the current daySelector (manually).
     * @param {number} year The year of the date of the current daySelector.
     * @param {number} month The month of the date of the current daySelector.
     * @param {number} day The day of the date of the current daySelector.
     * @param {number} date The current selected date.
     */
    renderCalendar(year, month, day) {
      const currentDate = clampDay(this._checkThreshold(new Date()));
      let activeDate = !(year === undefined || month === undefined || day === undefined) ? new Date(year, +month - 1, day) : undefined;
      if (!isNaN(activeDate)) {
        // setting full year each time manually to avoid wrong dates for two digit years
        activeDate.setFullYear(year);
        activeDate = clampDay(this._checkThreshold(activeDate));
        // resetting visible year and month to match a possible threshold
        year = activeDate.getFullYear();
        month = activeDate.getMonth() + 1;
      } else {
        year = currentDate.getFullYear();
        month = currentDate.getMonth() + 1;
      }
      let selectedDate = this.__lastSelectedDay ? new (Date.bind.apply(Date, [null].concat(this.__lastSelectedDay))) : undefined;
      if (!isNaN(selectedDate)) {
        selectedDate = clampDay(this._checkThreshold(selectedDate));
      }
      const lastDateOfPreviousMonth = new Date(year, month - 1, 0);
      lastDateOfPreviousMonth.setFullYear(month <= 1 ? year - 1 : year);

      const prevmonthlength = lastDateOfPreviousMonth.getDate();
      const thismonthlength = +new Date(new Date(year, month, 0).setFullYear(year)).getDate();
      const firstVisibleDayIndex = ((lastDateOfPreviousMonth.getDay() + 1 - (this.firstDayOfWeek || 0)) % 7 + 7) % 7 - 1; // mathematical modulus

      const currentDayIndex = dayDiff(currentDate, lastDateOfPreviousMonth) + firstVisibleDayIndex,
        activeDayIndex = isNaN(activeDate) ? undefined : (dayDiff(activeDate, lastDateOfPreviousMonth) + firstVisibleDayIndex),
        selectedDayIndex = isNaN(selectedDate) ? undefined : (dayDiff(selectedDate, lastDateOfPreviousMonth) + firstVisibleDayIndex);

      let min, max;
      if (this._minValue) {
        min = dayDiff(clampDay(new Date(this._minValue)), lastDateOfPreviousMonth) + firstVisibleDayIndex;
      }
      if (this._maxValue) {
        max = dayDiff(clampDay(new Date(this._maxValue)), lastDateOfPreviousMonth) + firstVisibleDayIndex;
      }

      let selectedDayInView;
      let counter = -firstVisibleDayIndex;

      // for each children in date view
      for (let i = 0; i < 42; i++, counter++) {
        // Day in or out of the month
        if (counter <= 0) {
          // previous month
          if (month > 1) {
            this.$.days.children[i].dataset.year = year;
            this.$.days.children[i].dataset.month = month - 1;
          } else {
            // previous year
            this.$.days.children[i].dataset.year = year - 1;
            this.$.days.children[i].dataset.month = 12;
          }
          this.$.days.children[i].dataset.day = prevmonthlength + counter;
          this.$.days.children[i].classList.add('notinmonth');
        } else if (counter > thismonthlength) {
          // next month
          if (month < 12) {
            this.$.days.children[i].dataset.year = year;
            this.$.days.children[i].dataset.month = month + 1;
          } else {
            // next year
            this.$.days.children[i].dataset.year = year + 1;
            this.$.days.children[i].dataset.month = 1;
          }
          this.$.days.children[i].dataset.day = counter - thismonthlength;
          this.$.days.children[i].classList.add('notinmonth');
        } else {
          // in month
          this.$.days.children[i].dataset.year = year;
          this.$.days.children[i].dataset.month = month;
          this.$.days.children[i].dataset.day = counter;
          this.$.days.children[i].classList.remove('notinmonth');
        }

        this.$.days.children[i].classList.remove('current')
        this.$.days.children[i].classList.remove('min');
        this.$.days.children[i].classList.remove('max');

        // Day is out of range
        if (i < min || i > max) {
          this.$.days.children[i].classList.add('outofrange');
        } else {
          this.$.days.children[i].classList.remove('outofrange');
        }
      }

      // Current Day is in view
      if (this.$.days.children[currentDayIndex]) {
        this.$.days.children[currentDayIndex].classList.add('current');
      }

      // // Selected Day is in view
      if (!isNaN(selectedDayIndex) && this.$.days.children[selectedDayIndex]) {
        this._setCurrentSelectedDayNode(this.$.days.children[selectedDayIndex]);
      } else {
        this._setCurrentSelectedDayNode(null);
      }

      // Active Day is in view
      if (!isNaN(activeDayIndex) && this.$.days.children[activeDayIndex]) {
        this._setCurrentActiveDayNode(this.$.days.children[activeDayIndex]);
      }

      // Min Day is in view
      if (!isNaN(min) && this.$.days.children[min]) {
        this.$.days.children[min].classList.add('min');
      }

      // Max Day is in view
      if (!isNaN(max) && this.$.days.children[max]) {
        this.$.days.children[max].classList.add('max');
      }

      this.$.monthSelector.selectedIndex = month - 1;
      this.$.yearSelector.input = year;
    }

    _minChanged(min) {
      super._minChanged(min);
      this.renderCalendar(this.year, this.month, this.day);
    }

    _maxChanged(max) {
      super._maxChanged(max);
      this.renderCalendar(this.year, this.month, this.day);
    }

    /**
     * key press event handler on days area
     * @param  {[type]} e Event
     */
    _checkKeycodeForDates(e) {
      if (e && e.keyCode) {
        switch (e.keyCode) {
          case 13: // enter // falls through
          case 32: // space
            // set current selected node to current active node
            if (this.currentActiveDayNode) {
              this._setCurrentSelectedDayNode(this.currentActiveDayNode);
            }
            e.stopPropagation();
            return;
          case 27: // esc
            // reset current active node to selected node
            if (this.__lastSelectedDay) {
              this._computeDatetime(this.__lastSelectedDay[0], this.__lastSelectedDay[1] + 1, this.__lastSelectedDay[2], this.hour, this.minute, this.second, this.millisecond);
            }
            return;
          case 37: // falls through
          case 38: // falls through
          case 39: // falls through
          case 40:
            // arrow keys
            const node = (this.currentActiveDayNode || this.currentSelectedDayNode || this.currentHoveredDayNode);
            let year, month, day;
            if (node) {
              year = +node.dataset.year;
              month = +node.dataset.month;
              day = +node.dataset.day;
            } else {
              year = +this.$.yearSelector.input;
              month = +this.$.monthSelector.selectedIndex + 1;
              day = new Date().getDate();
            }
            switch (e.keyCode) {
              case 37: // left
                // unshift day
                day = day - this._partsStep.day;
                while (day < 1) {
                  month--;
                  if (month < 1) {
                    month = 12;
                    year--;
                  }
                  day = maxDayOfMonth(year, month) - day;
                }
                break;
              case 39: // right
                // shift day
                day = day + this._partsStep.day;
                let maxDay;
                while (day > (maxDay = maxDayOfMonth(year, month))) {
                  month++;
                  if (month > 12) {
                    month = 1;
                    year++;
                  }
                  day = day - maxDay;
                }
                break;
              case 38: // up
                // unshift month
                month--;
                if (month < 1) {
                  month = 12;
                  year--;
                }
                day = Math.min(day, maxDayOfMonth(year, month));
                break;
              case 40: // down
                // shift month
                month++;
                if (month > 12) {
                  month = 1;
                  year++;
                }
                if (day > maxDayOfMonth(year, month)) {
                  day = 1;
                }
                break;
            }
            this.renderCalendar(year, month, day);
            e.preventDefault();
            e.stopPropagation();
            return;
          }
      }
    }

    _getDefaultForProp(prop) {
      const d = (this._defaultValue && new Date(this._defaultValue)) || new Date();
      switch (prop) {
        case 'year':
          return d.getFullYear();
        case 'month':
          return d.getMonth() + 1;
        default:
          return 0;
      }
    }
  }
});

/**
* `<calendar-element>` adds a calendar to your page using Polymer.
*
* If you like to connect it to an input, try it like:
*
*   ```html
*     <input type="date" value="{{date::input}}">
*
*     <calendar-element date="{{date}}"></calendar-element>
*   ```
*
* For example if you clamp on `hour`, you can round `datetime` and `value` to `00:00:00`. If you set `clamp="day"` you hide the day-selection.
*
* The following custom properties and mixins are also available for styling:
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
* @customElement
* @polymer
*
*  @appliesMixin CalendarElementPattern
*  @appliesMixin SwitchMixin
*  @appliesMixin DatetimeFormMixin
*  @appliesMixin FormElementMixin
*  @appliesMixin DatetimeMixin
*
* @demo demo/date-elements.html date elements
**/
export class CalendarElement extends CalendarElementPattern(SwitchMixin(DatetimeFormMixin(FormElementMixin(DatetimeMixin(PolymerElement))))) {

  static get is() {
    return 'calendar-element';
  }

  static get template() {
    return html`
      ${inputPickerStyle}
      ${this.styleTemplate}
      ${this.calendarTemplate}
    `
  }
}

if (!customElements.get(CalendarElement.is)) {
  customElements.define(CalendarElement.is, CalendarElement);
}
