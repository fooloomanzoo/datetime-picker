# datetime-picker

a picker for date and time for Polymer, that prefers to use the native input. This element is for using the native date-picker, if it exists, or to polyfill it by a custom element.

[Component Page]{https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/}

You can use it stand-alone or in range of Dates. Example

```html
<datetime-picker id="dateFrom" date-string="{{minDate}}" max-date="[[maxDate]]"></datetime-picker>
<datetime-picker id="dateTo" date-string="{{maxDate}}" min-date="[[minDate]]"></datetime-picker>
```
