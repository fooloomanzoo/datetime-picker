[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker)

_[Demo and API docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)_
## &lt;datetime-picker&gt;

### What is it for?

`datetime-picker` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement. The `calendar-element` and the `time-element` will just be used if the native picker is not available or is explicitly wanted.

If you like an **overlay** then use `overlay-datetime-picker`, what extends `datetime-picker` and create the polyfilled elements `time-element` and `calendar-element` in an `overlay-element`, that extends *IronOverlayBehavior* and will create some of its attribute-bindings.

### Motivation

Internally it uses two input-elements, that are initially set to type *date* and *time*. If the Browser leaves these attributes as they are, then it will be assumed that native *date*- and *time*-inputs are available. If it won't, a `calendar-element` and a `time-element` will be displayed instead. `calendar-element` and `time-element` can also be used separately.
It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, or you like to have a different look and you are using *Polymer* already.

### How?

The **[component page](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)** explains, which of the attributes you can use and how. You can see there a **[Demo](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/#/elements/datetime-picker/demos/demo/datetime-picker.html)**, too.

You can use it stand-alone, with overlay or as a range of dates. Examples:


#### use the polyfill

<!--
```
<custom-element-demo height="330">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: Source Sans Pro', sans-serif;
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

<datetime-picker use-not-native value="{{value}}" datetime="{{synchronized}}"></datetime-picker>

<div>Two pickers can be synchronized:  <b>[[synchronized]]</b></div>
<div>A number representation is automatically provided:  <b>[[value]]</b></div>

<datetime-picker value="{{value}}"></datetime-picker>

```

#### Stand-alone calendar

<!--
```
<custom-element-demo height="280">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: Source Sans Pro', sans-serif;
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
```

<!--
```
<custom-element-demo height="90">
  <template>
    <link rel="import" href="datetime-picker.html">
    <style>
      html {
        font-family: Source Sans Pro', sans-serif;
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
#### Stand-alone time-picker
```html
<time-element time="{{time}}"></time-element>
```

#### Periods

```html
<datetime-picker id="from" date="{{min}}" max="[[max]]"></datetime-picker>
<datetime-picker id="to" date="{{max}}" min="[[min]]"></datetime-picker>
```

#### Overlay
<!--
```
<custom-element-demo height="330">
  <template>
    <link rel="import" href="overlay-datetime-picker.html">
    <style>
      html {
        font-family: Source Sans Pro', sans-serif;
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
<overlay-datetime-picker value="{{value}}"></overlay-datetime-picker>
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


### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
