[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker)

_[Demo and API docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)_
## &lt;datetime-picker&gt;

### What is it for?

`datetime-picker` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement. The `<calendar-element>` and the `<time-element>` will be used if the native picker is not available or is explicitly wanted.

If you like an **overlay** then use `<overlay-datetime-picker>`, what creates the polyfill in an `<overlay-element>`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.

You can use other pickers, too. In this collection are:
* `<datetime-picker>`
* `<date-picker>`
* `<time-picker>`
* `<overlay-datetime-picker>`
* `<overlay-date-picker>`
* `<overlay-time-picker>`
* `<calendar-element>`
* `<time-element>`

Every Element has the same API, so that it would use the native or the polyfill picker.

### Motivation

Internally it tests the browser, if **native** input-types `datetime-local`, `date` or `time` are supported. If it is not, a `<calendar-element>` or a `<time-element>` will be displayed instead, according to the kind of picker. You can decide to use the native or the replacements during runtime. calendar-element and time-element can also be used separately. **Internationalization** of the view in the pickers is inplemented and the attributes remain in **iso8061**-format.

It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, you like to have a different look or you would like to have a guaranteed working **datetime-picker**.

Another use case could be for example, if you want on *mobile devices* use the native picker, when supported, and on *desktop devices* this polyfill.

```html
  <datetime-picker not-native="[[!isMobile]]"></datetime-picker>
  ...
    isMobile() {
      const ua = window.navigator.userAgent;
      return (/[mM]obi/i.test(ua) || /[tT]ablet/i.test(ua) || /[aA]ndroid/i.test(ua));
    }
  ...
```

### How?

The **[component page](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)** explains, which of the attributes you can use and how. You can see there a **[demo](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/#/elements/datetime-picker/demos/demo/datetime-picker.html)**, too.

You can use it stand-alone, with overlay or as a range of dates. Examples:

#### Stand-alone calendar
<!--
```
<custom-element-demo height="300">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
<calendar-element date="{{date}}"></calendar-element>
<p>date: [[date]]</p>
```

#### Stand-alone time-picker
<!--
```
<custom-element-demo height="100">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
<time-element time="{{time}}"></time-element>
<p>time: [[time]]</p>
```

#### Use the polyfill or the native picker
<!--
```
<custom-element-demo height="410">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
        line-height: 1.5;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html

<h4>Polyfill Picker</h4>
<datetime-picker not-native value="{{value}}" datetime="{{synchronized}}"></datetime-picker>
<h4>Native Picker</h4>
<datetime-picker value="{{value}}"></datetime-picker>
<p>
Two pickers can be synchronized: [[synchronized]]
A number representation is automatically provided: [[value]]
</p>
```


#### Use it in an overlay
<!--
```
<custom-element-demo height="380">
  <template>
    <link rel="import" href="overlay-datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
<overlay-datetime-picker value="{{value}}" not-native></overlay-datetime-picker>
<p>value: [[value]]</p>
```

#### Use locale date formats
<!--
```
<custom-element-demo height="300">
  <template>
    <link rel="import" href="overlay-datetime-picker.html">
    <style>
      html {
        font-family: 'Source Sans Pro', sans-serif;
      }
    </style>
    <dom-bind>
      <template is="dom-bind">
        <next-code-block></next-code-block>
      </template>
    </dom-bind>
  </template>
</custom-element-demo>
```
-->
```html
<select value="{{locale::change}}">
  <option value="en">english</option>
  <option value="fr">français</option>
  <option value="de">deutsch</option>
  <option value="es">español</option>
  <option value="it">italiano</option>
  <option value="ru">русский</option>
  <option value="ja">日本語</option>
  <option value="zh">中文</option>
</select>
<calendar-element datetime="{{datetime}}" locale="{{locale}}" not-native></calendar-element>
<p>datetime: [[datetime]]</p>
```

#### Define date ranges
```html
<datetime-picker id="from" date="{{min}}" max="[[max]]"></datetime-picker>
<datetime-picker id="to" date="{{max}}" min="[[min]]"></datetime-picker>
```


### Installation
```
bower install --save fooloomanzoo/datetime-picker
```


### Notable Changes
* 2.0.0
  - changed properties `dateString` and `timeString` to `date` and `time`
  - polyfill is split up in two elements ('calendar-element' and 'time-element')
  - minified version available ('build/..', ~18kB)

* 2.0.6 - 7
  - `overlay`-element introduced
  - shared custom-style-element introduced
  - unifying some custom-style-properties
  - renaming `position` to `verticalAlign` and `horizontalAlign`

* 2.1.7
  - all elements are using `template-strings`
  - using `<number-input>` for all numeric inputs
  - `<datetime-picker>` uses as native input now `<input type="datetime-local">`
  - fix for `calendar-element` for daylight-saving time
  - in `calendar-element` uses a numeric input for `year`-property and a select-box for `month`-property
  - `clamp`-property allows to clamp the date-value to a lower limit, e.g. `clamp="day"` means that the month will be clamped to it's first day
  - `clamp`-property for pickers enable to hide certain properties from being pickable, e.g. `clamp="day"` hides the day selector
  - internationalization/localization for datetime-part-order and separation signs
  - abstractions of each element leads to smaller file sizes

* 2.2.0
  - `use-not-native` is renamed to `not-native`

### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
