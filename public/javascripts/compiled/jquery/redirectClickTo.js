(function() {
  define(['jquery'], function($) {
    return $.fn.redirectClickTo = function(target, options) {
      var css;

      if (options == null) {
        options = {};
      }
      target = $(target).get(0);
      if (!target) {
        return;
      }
      if (options.css !== false) {
        css = options.css || {
          cursor: 'pointer'
        };
      }
      if (css) {
        this.css(css);
      }
      this.off('.redirectClickTo');
      return this.on('click.redirectClickTo', function(event) {
        var e, ignoreEvent, oevent;

        ignoreEvent = event.target === target;
        ignoreEvent = ignoreEvent || event.isDefaultPrevented();
        if (!ignoreEvent) {
          event.stopPropagation();
          event.preventDefault();
          if (document.createEvent) {
            oevent = event.originalEvent;
            e = document.createEvent('MouseEvents');
            e.initMouseEvent(oevent.type, true, true, window, 0, oevent.screenX, oevent.screenY, oevent.clientX, oevent.clientY, oevent.ctrlKey, oevent.altKey, oevent.shiftKey, oevent.metaKey, oevent.button, oevent.relatedTarget);
            return target.dispatchEvent(e);
          } else if (target.click) {
            return target.click();
          }
        }
      });
    };
  });

}).call(this);
