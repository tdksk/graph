(function (global) {
  function $(id) {
    return document.getElementById(id);
  }

  function addEvent(elm,listener,fn) {
    try {
      elm.addEventListener(listener, fn, false);
    } catch(e) {
      elm.attachEvent(
        'on' + listener
        ,function () {
          fn.apply(elm, arguments);
        }
      );
    }
  }

  global.$ = $;
  global.addEvent = addEvent;
})(window);
