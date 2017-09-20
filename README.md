[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker)

_[Demo and API docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)_
## &lt;datetime-picker&gt;

### What is it for?

`datetime-picker` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement. The `calendar-element` and the `time-element` will just be used if the native picker is not available or is explicitly wanted.

If you like an **overlay** then use `overlay-datetime-picker`, what extends `datetime-picker` and create the polyfilled elements `time-element` and `calendar-element` in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.

In this collection are:
* `<datetime-picker>`
* `<date-picker>`
* `<time-picker>`
* `<calendar-element>`
* `<time-element>`
* `<overlay-datetime-picker>`
* `<overlay-date-picker>`
* `<overlay-time-picker>`

### Motivation

Internally it uses two input-elements, that are initially set to type *date* and *time*. If the Browser leaves these attributes as they are, then it will be assumed that native *date*- and *time*-inputs are available. If it won't, a `calendar-element` and a `time-element` will be displayed instead. `calendar-element` and `time-element` can also be used separately.

It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, or you like to have a different look and you are using *Polymer* already.

Another use case could be for example, if you want on mobile devices use the `native picker` and on desktop devices this polyfill.

```html
  <datetime-picker use-not-native="[[!isMobile]]"></datetime-picker>
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

#### use the polyfill

<!--
```
<custom-element-demo height="330">
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

<datetime-picker use-not-native value="{{value}}" date="{{synchronized}}"></datetime-picker>

<div style="padding: 8px;"><code>Two pickers can be synchronized: </code> <b>[[synchronized]]</b></div>
<div style="padding: 8px;"><code>A number representation is automatically provided: </code> <b>[[value]]</b></div>

<datetime-picker value="{{value}}"></datetime-picker>

```

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
<div style="padding: 12px;"><code>date: </code> <b>[[date]]</b></div>
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
<div style="padding: 12px;"><code>time: </code> <b>[[time]]</b></div>
```

#### Periods

```html
<datetime-picker id="from" date="{{min}}" max="[[max]]"></datetime-picker>
<datetime-picker id="to" date="{{max}}" min="[[min]]"></datetime-picker>
```

#### Overlay

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
<overlay-datetime-picker value="{{value}}" use-not-native></overlay-datetime-picker>
<div style="padding: 12px;"><code>value: </code> <b>[[value]]</b></div>
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


* 2.1.6
  - all elements are using `template-strings`
  - using `<number-input>` for all numeric inputs
  - `<datetime-picker>` uses as native input now `<input type="datetime-local">`
  - fix for `calendar-element` for daylight-saving time
  - in `calendar-element` uses a numeric input for `year`-property and a select-box for `month`-property
  - `clamp`-property allows to clamp the date-value to a lower limit, e.g. `clamp="day"` means that the month will be clamped to it's first day
  - `clamp`-property for pickers enable to hide certain properties from being pickable, e.g. `clamp="day"` hides the day selector
  - internationalization/localization for datetime-part-order and separation signs
  - abstractions of each element leads to smaller file sizes


### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
