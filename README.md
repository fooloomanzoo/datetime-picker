## &lt;datetime-picker&gt;

### What is it for?
**datetime-picker** is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement. The 'calendar-element' will just be loaded if the native picker is not available or is explicitly wanted. It is tested for Firefox, IE11, Chrome and Opera. If you want to use it within Safari, please notice that I can not test it on Macs, but if you can, please contribute.

### Motivation
Internally it uses two input-elements, that are initially set to type *date* and *time*. If the Browser leaves these attributes as they are, then it will be assumed that native *date*- and *time*-inputs are available. If it won't, an element *(calendar-element)* will be displayed instead. **calendar-element** can also be used separately.
It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, or you like to have a different look and you are using *Polymer* already.

### How?
The **[component page](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)** explains, which of the attributes you can use and how. You can see there a **Demo**, too.

You can use it stand-alone or as a range of dates. Examples:

#### Force to use the polyfill
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="my-element.html">
    <link rel="import" href="../other-element/other-element.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<datetime-picker use-not-native></datetime-picker>
```

#### Simple example

```html
<datetime-picker value="{{value}}"></datetime-picker>
```

#### Stand-alone calendar
```html
<calendar-element value="{{value}}" opened></calendar-element>
```

#### Periods
```html
<datetime-picker id="from" date="{{min}}" max="[[max]]"></datetime-picker>
<datetime-picker id="to" date="{{max}}" min="[[min]]"></datetime-picker>
```

### Changes in 2.0
- changed properties `dateString` and `timeString` to `date` and `time`

### Installation
```
bower install --save fooloomanzoo/datetime-picker
```

### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
