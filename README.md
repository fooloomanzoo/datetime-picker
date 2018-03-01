[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker)
[![API](https://img.shields.io/badge/API-available-green.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker/elements/datetime-picker)
[![Demo](https://img.shields.io/badge/demo-available-red.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker/demo/demo/datetime-picker.html)

_[Demo and API docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)_
## &lt;datetime-picker&gt;

### What is it for?

`datetime-picker` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that can use the **native** input, too. If the **native** picker is choosen and is not supported, this element uses the **polyfill** date-picker. The `<calendar-element>` and the `<time-element>` will come in place if the native picker is not available or is not explicitly wanted. A range picker is provided by combining the `min`- and `max`-attributes.

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
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
  <datetime-picker native="[[native]]" with-timezone="{{withTimezone}}" auto-confirm="[[autoConfirm]]" value="{{value}}" confirmed-value="{{confirmedValue}}" date="{{date}}" datetime="{{datetime}}" confirmed-date="{{confirmedDate}}" confirmed-datetime="{{confirmedDatetime}}" confirmed-time="{{confirmedTime}}" time="{{time}}" timezone="{{timezone}}" vertical-align="{{verticalAlign}}" horizontal-align="{{horizontalAlign}}"></datetime-picker><br><br>
  <input type="checkbox" checked="{{native::change}}">native picker<br>
  <input type="checkbox" checked="{{autoConfirm::change}}">auto confirm<br>
  <input type="checkbox" checked="{{withTimezone::change}}">with timezone<br>
  horizontal-align: <select value="{{horizontalAlign::change}}">
    <option value="auto">auto</option>
    <option value="left">left</option>
    <option value="right">right</option>
    <option value="center">center</option>
  </select><br>
  vertical-align: <select value="{{verticalAlign::change}}">
    <option value="auto">auto</option>
    <option value="top">top</option>
    <option value="bottom">bottom</option>
    <option value="middle">middle</option>
  </select><br><br>
  <div class="vertical-section-container result">
    <div><code>numeric value</code>: [[value]]</div>
    <div><code>date</code>: [[date]]</div>
    <div><code>time</code>: [[time]]</div>
    <div><code>datetime</code>: [[datetime]]</div>
    <div><code>timezone</code>: <input pattern="[+-]\d\d:\d\d" value="{{timezone::change}}"></div>
    <div><code>confirmed time</code>: [[confirmedTime]]</div>
    <div><code>confirmed date</code>: [[confirmedDate]]</div>
    <div><code>confirmed datetime</code>: [[confirmedDatetime]]</div>
    <div><code>confirmed numeric value</code>: [[confirmedValue]]</div>
  </div>
```

If you like an **overlay** then use `<overlay-datetime-picker>`, what creates the polyfill in an `<overlay-element>`, that extends Polymer.IronOverlayBehavior and will create some of its attribute-bindings.

You can use other pickers and elements, too. In this collection are for:
* **datetime**
  * `<overlay-datetime-picker>`
  * `<datetime-picker>`
* **date**
  * `<overlay-date-picker>`
  * `<date-picker>`
  * `<calendar-element>`
* **time**
  * `<overlay-time-picker>`
  * `<time-picker>`
  * `<time-element>`

Every Element has the same API, so that it would use the given date-properties or for the pickers the native or the polyfill picker. Please see the [docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/component-page.html#/mixins/DatetimeMixin) for the given attributes.

The **picker**-elements can use the **auto-confirm**-attribute, so that all values will be automatically confirmed when the polyfilled inputs are used. Else the attributes will update like the picker is used but will reset to the old attributes when being canceled and `confirmed-value`-, `confirmed-datetime`-, `confirmed-date`- and `confirmed-time`-attribute will be set if they are confirmed. `confirmed-datetime`, `confirmed-date` and `confirmed-time` are the equivalent values of the native inputs. Be aware of **timezone**-attribute, when you sync datetime, because the Datetime-Object in the browser will use the local time-zone. The consistent value will always be the `value`-attribute for every client.

If you are looking just for an input for date and time, please have a look at [datetime-input](https://github.com/fooloomanzoo/datetime-input).

### Motivation

Internally it tests the browser, if **native** input-types `datetime-local`, `date` or `time` are supported. If it is not, a `<calendar-element>` or a `<time-element>` will be displayed instead, according to the kind of picker you choose. You can decide to use the native or the replacements during runtime. calendar-element and time-element can also be used separately. **Internationalization** of the view in the pickers is inplemented and the attributes remain in **iso8061**-format. You can set the timezone of your datetime-values.

It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, you like to have a different look or you would like to have a guaranteed working **datetime-picker**.

Another use case could be for example, if you want on *mobile devices* use the native picker, when supported, and on *desktop devices* this polyfill. For that purpose the attribute `native-on-mobile` is also provided.

```html
  <datetime-picker native="[[isMobile]]"></datetime-picker>
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

#### Stand-alone calendar and date-input (preset by using its attributes)

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
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
<p><calendar-element date="{{date}}"></calendar-element></p>
<p>date: <date-input date="{{date}}" datetime="{{datetime}}"></date-input></p>
<p>datetime: <datetime-input default="2020-05-23" datetime="{{datetime}}"></datetime-input></p>
```

#### Stand-alone time-picker and time-input (preset by using its attributes)

<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
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
<p> time: <time-input time="{{time}}" hours="8"></time-input></p>
```

#### Use the polyfill or the native picker
By default it checks if `datetime-local`, `date` or `time` is supported as input. Set the ``auto-confirm`` attribute to automatically confirm the input. If `native` is set, the native picker will be used instead of the polyfill:


```html
  Autoconfirming Polyfill Picker <datetime-picker auto-confirm value="{{value}}" datetime="{{synchronized}}"></datetime-picker>

  Native Picker <datetime-picker native value="{{value}}"></datetime-picker>
```

#### Define date ranges
Set cross data bindings to limit the values of the inputs. Use the ``confirmed``-attributes to validate only confirmed values. Please also visit the [demos](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/#/elements/datetime-picker/demos/demo/datetime-picker.html):

<!--
```
<custom-element-demo height="300">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
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
<p>
  <datetime-picker class="begin" auto-confirm datetime="{{min}}" max="{{max}}"></datetime-picker>
  <datetime-picker class="end" auto-confirm datetime="{{max}}" min="{{min}}"></datetime-picker>
</p>
<p>
  <div><code>start</code>: [[min]]</div>
  <div><code>end</code>: [[max]]</div>
</p>
```

#### Use it in an overlay
Choose the related elements:
* `<overlay-datetime-picker>`
* `<overlay-date-picker>`
* `<overlay-time-picker>`

```html
<overlay-datetime-picker value="{{value}}" ></overlay-datetime-picker>
<p>value: [[value]]</p>
```

#### Use locale date formats
The properties `date`, `time`, `datetime` are always in **iso8061** but the visualization will be localized. By default your locale date format from `window.navigator.language` will be used, but you can select another *locale*:

<!--
```
<custom-element-demo height="300">
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="import" href="overlay-datetime-picker.html">
    <style>
      html {
        font-family: 'Roboto', sans-serif;
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
<p>
  hour12: <input type="checkbox" checked="{{hour12::change}}">
  <br>
  locale:
  <select value="{{locale::change}}">
    <option value=""></option>
    <option value="en">english</option>
    <option value="fr">français</option>
    <option value="de">deutsch</option>
    <option value="es">español</option>
    <option value="it">italiano</option>
    <option value="ru">русский</option>
    <option value="tr">Türkçe</option>
    <option value="ar">العربية</option>
    <option value="he">עברית</option>
    <option value="ja">日本語</option>
    <option value="zh">中文</option>
  </select>
</p>

<p>
  <calendar-element locale="{{locale}}" date="{{date}}" ></calendar-element>
  <time-element locale="{{locale}}" hour12="[[hour12]]" datetime="{{datetime}}" date="{{date}}"></time-element>
</p>

<p>datetime: [[datetime]]</p>
```

### Installation
```
bower install --save fooloomanzoo/datetime-picker
```
or
```
npm install --save @fooloomanzoo/datetime-picker
```

### Update
to last version
```
bower update
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

* 2.3.5
  - `not-native` is deprecated, use `native` to get a native picker
  - `dropdown-style.html` moved to `input-picker-pattern`

* 2.4.2
  - new elements: `datetime-input`, `date-input` and `date-input`
  - extended keyboard navigation support
  - `auto-confirm`-attribute is for auto confirming the actual input
  - new attributes `confirmed-datetime`, `confirmed-date` and `confirmed-time`

* 2.7.0
  - `timezone` attribute

### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
