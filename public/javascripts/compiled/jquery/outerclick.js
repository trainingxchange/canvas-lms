(function() {
  define(['jquery'], function($) {
    var $doc, $els, eventName, handleEvent, outerClick;

    $els = $();
    $doc = $(document);
    outerClick = 'outerclick';
    eventName = "click." + outerClick + "-special";
    $.event.special[outerClick] = {
      setup: function() {
        $els = $els.add(this);
        if ($els.length === 1) {
          return $doc.on(eventName, handleEvent);
        }
      },
      teardown: function() {
        $els = $els.not(this);
        if ($els.length === 0) {
          return $doc.off(eventName);
        }
      },
      add: function(handleObj) {
        var oldHandler;

        oldHandler = handleObj.handler;
        return handleObj.handler = function(event, el) {
          event.target = el;
          return oldHandler.apply(this, arguments);
        };
      }
    };
    return handleEvent = function(event) {
      return $els.each(function() {
        var $el;

        $el = $(this);
        if (this !== event.target && $el.has(event.target).length === 0) {
          return $el.triggerHandler(outerClick, [event.target]);
        }
      });
    };
  });

}).call(this);
