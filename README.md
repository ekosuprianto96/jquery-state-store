# My State Management Library

A simple state management library using jQuery.

## Installation

```sh
npm install jquery-state-store
```
## Usage
Include jQuery and the library in your HTML file:

```js
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./jquery-state-store.min.js"></script>
```

#### Initialize and use the library:
```js
$(document).ready(function() {
    $.useState('counter', 0);

    $('#increment').click(function() {
        var currentCounter = $.getState('counter');
        $.setState('counter', currentCounter + 1);
    });

    $('#decrement').click(function() {
        var currentCounter = $.getState('counter');
        $.setState('counter', currentCounter - 1);
    });
});
```
API
$.useState(name, initialValue)
Register a new state.

$.getState(name)
Get the value of the state.

$.setState(name, newValue)
Set a new value for the state.

$.reactive(name, listener)
Register a listener that gets called whenever the state changes.

$.useEffect(name, effect)
Register an effect that gets called with the state value whenever the state changes.

License
MIT
