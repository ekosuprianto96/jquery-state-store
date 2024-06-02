# My State Management Library

A simple state management library using jQuery.

## Usage
Include jQuery and the library in your HTML file:

```js
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="./jquery-state-store.min.js"></script>
```

#### Initialize and use the library:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./node_modules/jquery-state-store/dist/jquery-state-store.min.js"></script>
    <title>Jquery State Management</title>
</head>
<body>
    <p data-bind="text:counter">0</p>
    <button id="increment">Increment</button>
    <button id="decrement">Decrement</button>
    
    <script>
        $.useState('counter', 0);

        $(document).ready(function() {
            
            $('#increment').click(function() {
                var currentCounter = $.getState('counter');
                $.setState('counter', currentCounter + 1);
            });

            $('#decrement').click(function() {
                var currentCounter = $.getState('counter');
                $.setState('counter', currentCounter - 1);
            });

        })
    </script>
</body>
</html>
```
### Directives
#### data-bind:text
Sets the text content of the element to the state value.

```html
<p data-bind="text:counter"></p>
```

#### data-bind:html
Sets the HTML content of the element to the state value.

```html
<div data-bind="html:user.name"></div>
```
#### data-bind:if
Conditionally displays the element based on the state value.

```html
<div data-bind="if:counter > 0">
    Counter is greater than zero.
</div>
```
#### data-bind:data
Sets the specified data attribute of the element to the state value.

```html
<div data-bind="data:title:user.name"></div>
```
#### data-bind:model
Binds the state value to the input element's value, making it two-way reactive.

```html
<input type="text" data-bind="model:user.name" />
```
### Example Usage
Here is an example of how to use the directives in your HTML and JavaScript:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>State Management Example</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="node_modules/jquery-state-store/stateManagement.js"></script>
</head>
<body>
    <div>
        <button id="increment">Increment</button>
        <button id="decrement">Decrement</button>
    </div>
    <p data-bind="text:counter"></p>
    <div data-bind="if:counter > 0">
        Counter is greater than zero.
    </div>
    <input type="text" data-bind="model:user.name" />
    <p data-bind="text:user.name"></p>

    <script>
        $(document).ready(function() {
            // Initialize states
            $.useState('counter', 0);
            $.useState('user', { name: 'John Doe', age: 30 });

            // Example of setting state
            $('#increment').click(function() {
                var currentCounter = $.getState('counter');
                $.setState('counter', currentCounter + 1);
            });

            $('#decrement').click(function() {
                var currentCounter = $.getState('counter');
                $.setState('counter', currentCounter - 1);
            });

            // Apply bindings
            $.applyBindings();
        });
    </script>
</body>
</html>

```
### API
```js
$.useState(name, initialValue)
//Register a new state.

$.getState(name)
//Get the value of the state.

$.setState(name, newValue)
//Set a new value for the state.

$.reactive(name, listener)
//Register a listener that gets called whenever the state changes.

$.useEffect(name, effect)
//Register an effect that gets called with the state value whenever the state changes.
```
### License
### MIT
