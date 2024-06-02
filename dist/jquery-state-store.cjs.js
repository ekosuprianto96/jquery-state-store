'use strict';

(function($) {
  var stateStore = {};
  var listeners = {};
  var effects = {};

  function createReactiveObject(stateName, initialState) {
      return new Proxy(initialState, {
          set(target, key, value) {
              target[key] = value;
              notifyListeners(stateName);
              notifyEffects(stateName);
              return true;
          },
          get(target, key) {
              if (typeof target[key] === 'object' && target[key] !== null) {
                  return createReactiveObject(stateName, target[key]);
              }
              return target[key];
          }
      });
  }

  function useState(name, initialValue) {
      if (!stateStore.hasOwnProperty(name)) {
          if (typeof initialValue === 'object' && initialValue !== null) {
              stateStore[name] = createReactiveObject(name, initialValue);
          } else {
              stateStore[name] = initialValue;
          }
          listeners[name] = [];
          effects[name] = [];
          bindElements(name);
      } else {
          console.warn(`State "${name}" is already registered.`);
      }
  }

  function getState(path) {
      var keys = path.split('.');
      var state = stateStore;
      for (var i = 0; i < keys.length; i++) {
          if (state[keys[i]] === undefined) {
              return undefined;
          }
          state = state[keys[i]];
      }
      return state;
  }

  function setState(path, newValue) {
      var keys = path.split('.');
      var state = stateStore;
      for (var i = 0; i < keys.length - 1; i++) {
          if (state[keys[i]] === undefined) {
              state[keys[i]] = {};
          }
          state = state[keys[i]];
      }
      var lastKey = keys[keys.length - 1];
      state[lastKey] = newValue;
      notifyListeners(keys[0]);
      notifyEffects(keys[0]);
  }

  function reactive(path, listener) {
      var keys = path.split('.');
      var name = keys[0];
      if (listeners.hasOwnProperty(name)) {
          listeners[name].push(listener);
      } else {
          console.warn(`State "${name}" is not registered.`);
      }
  }

  function notifyListeners(name) {
      if (listeners.hasOwnProperty(name)) {
          listeners[name].forEach(function(listener) {
              listener(getState(name));
          });
      }
  }

  function useEffect(name, effect) {
      var keys = name.split('.');
      var topState = keys[0];
      if (effects.hasOwnProperty(topState)) {
          effects[topState].push({ path: name, effect: effect });
          effect(getState(name));
      } else {
          console.warn(`State "${name}" is not registered.`);
      }
  }

  function notifyEffects(name) {
      if (effects.hasOwnProperty(name)) {
          effects[name].forEach(function(effectObj) {
              effectObj.effect(getState(effectObj.path));
          });
      }
  }

  function bindElements(stateName) {
      $('[data-bind]').each(function() {
          var element = $(this);
          var bindings = element.data('bind').split(';');

          bindings.forEach(function(binding) {
              var parts = binding.split(':');
              var directive = parts[0].trim();
              var stateKey = parts[1].trim();

              if (stateKey.startsWith(stateName)) {
                  switch (directive) {
                      case 'text':
                          reactive(stateKey, function() {
                              element.text(getState(stateKey));
                          });
                          break;
                      case 'html':
                          reactive(stateKey, function() {
                              element.html(getState(stateKey));
                          });
                          break;
                      case 'if':
                          reactive(stateKey, function() {
                              if (getState(stateKey)) {
                                  element.show();
                              } else {
                                  element.hide();
                              }
                          });
                          break;
                      case 'data':
                          reactive(stateKey, function() {
                              element.data('value', getState(stateKey));
                          });
                          break;
                      case 'model':
                          reactive(stateKey, function() {
                              element.val(getState(stateKey));
                          });
                          element.on('input', function() {
                              setState(stateKey, element.val());
                          });
                          break;
                      default:
                          console.warn(`Unknown directive: ${directive}`);
                  }
              }
          });
      });
  }

  function applyBindings() {
    $('[data-bind]').each(function() {
        var element = $(this);
        var bindings = element.data('bind').split(';');
    
        bindings.forEach(function(binding) {
            var parts = binding.split(':');
            var directive = parts[0].trim();
            var stateKey = parts[1].trim();
            var initialValue = $.getState(stateKey);
    
            switch (directive) {
                case 'text':
                    element.text(initialValue);
                    break;
                case 'html':
                    element.html(initialValue);
                    break;
                case 'if':
                    if (initialValue) {
                        element.show();
                    } else {
                        element.hide();
                    }
                    break;
                case 'data':
                    element.data('value', initialValue);
                    break;
                case 'model':
                    element.val(initialValue);
                    element.on('input', function() {
                        $.setState(stateKey, element.val());
                    });
                    break;
                default:
                    console.warn(`Unknown directive: ${directive}`);
            }
        });
      });
  }

  // Expose the functions to the global jQuery object
  $.useState = useState;
  $.getState = getState;
  $.setState = setState;
  $.reactive = reactive;
  $.useEffect = useEffect;
  $.applyBindings = applyBindings;

})(jQuery);

$(document).ready(function() {
  $.applyBindings();
});
