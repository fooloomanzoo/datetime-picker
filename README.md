
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/datetime-picker)

_[Demo and API docs](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)_

## &lt;datetime-picker&gt;

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="datetime-picker.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<datetime-picker></datetime-picker>

<datetime-picker use-not-native></datetime-picker>
```

### What is it for?
`datetime-picker` is a picker for date and time for **[Polymer](https://github.com/Polymer/polymer)** that prefers to use the native input. This element is for using the *native* date-picker, if it exists, or to replace it by a CustomElement. The `calendar-element` and the `time-element` will just be used if the native picker is not available or is explicitly wanted.

If the `calendar-` or the `time-element` should appear in an overlay then set the `overlay`-attribute of the element, else it will appear as a backdrop. The elements are then slotted into an element that extends *IronOverlayBehavior* and will create some attribute-bindings to `datetime-picker`.

### Motivation
Internally it uses two input-elements, that are initially set to type *date* and *time*. If the Browser leaves these attributes as they are, then it will be assumed that native *date*- and *time*-inputs are available. If it won't, a `calendar-element` and a `time-element` will be displayed instead. `calendar-element` and `time-element` can also be used separately.
It might be useful for you to use, if you like to keep the native approach of Browsers like in Chrome for Desktop or Mobile, or you like to have a different look and you are using *Polymer* already.

### How?
The **[component page](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/)** explains, which of the attributes you can use and how. You can see there a **[Demo](https://fooloomanzoo.github.io/datetime-picker/components/datetime-picker/#/elements/datetime-picker/demos/demo/datetime-picker.html)**, too.

You can use it stand-alone or as a range of dates. Examples:

#### Force to use the polyfill

```html
<datetime-picker use-not-native></datetime-picker>
```

#### Simple example

```html
<datetime-picker value="{{value}}"></datetime-picker>
```

#### Stand-alone calendar
```html
<calendar-element date="{{date}}"></calendar-element>
```

#### Stand-alone time-picker
```html
<time-element time="{{time}}"></time-element>
```

#### Periods
```html
<datetime-picker id="from" date="{{min}}" max="[[max]]"></datetime-picker>
<datetime-picker id="to" date="{{max}}" min="[[min]]"></datetime-picker>
```

### Installation
```
bower install --save fooloomanzoo/datetime-picker
```

### Polymer Build Considerations

If you build an app using `polymer-cli` or `polymer-build` and bundle your resources, then you need to put `..., "bower_components/datetime-picker/lazy-import.html", "bower_components/datetime-picker/overlay-element.html ,..."` in `"fragments"` and `"bower_components/datetime-picker/datetime-picker.html"` in `"extraDependencies"`, or load them directly, to keep them to be included in the app.

You can build the sources manually unbundled by running `npm run build` or `gulp build` with the provided script.

### Changes in 2.0.0
- changed properties `dateString` and `timeString` to `date` and `time`
- polyfill is split up in two elements ('calendar-element' and 'time-element')
- minified version available ('build/..', ~18kB)

### Changes in 2.0.6
- overlay-element introduced
- shared custom-style-element introduced
- renaming some custom-style-properties

### Contribute?
Feel free to send a new issue, a commit, a pull request or just fork it!
