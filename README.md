# datetime-picker

## What does it do?
**datetime-picker** a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)**, that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement.

## Motivation
Internally it uses two input-elements, that are initially set to type *date* and *time*. If the Browser leaves these attributes as they are, then it will be assumed that native *date*- and *time*-inputs are available. If it won't an element *(calendar-component)* will be loaded and displayed instead. **calendar-component** can also be used separat.
It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, or you like to have a different look and you are using *Polymer* already. 
Because this approach just loads, when it needs to, it is also efficient. Without *gzip* or minifying, *date-picker* got a size of about 3kB and *calendar-component* about 17kB. If you are using it in a minifying process and send them compressed, *date-picker* is about just 1 kB and *calendar-component* about 4kB.

## How?
The **[component page](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)** explains, which of the attributes you can use and how. You can see there a **Demo**, too.

You can use it stand-alone or as a range of dates. Examples:

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="datetime-picker.html">
    <link rel="import" href="calendar-component.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
1. Simple example
  ```html
  <datetime-picker value="{{value}}"></datetime-picker>
  ```

2. Force to use the polyfill
  ```html
  <datetime-picker value="{{value}}" use-not-native></datetime-picker>
  ```

3. Stand-alone calendar
  ```html
  <calendar-component value="{{value}}" opened></calendar-component>
  ```

4. Periods
  ```html
  <datetime-picker id="from" date-string="{{minDate}}" max-date="[[maxDate]]"></datetime-picker>
  <datetime-picker id="to" date-string="{{maxDate}}" min-date="[[minDate]]"></datetime-picker>
  ```

## Installation
```
bower install --save fooloomanzoo/datetime-picker
```


## Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
