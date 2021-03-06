(function() {
  define(['jquery', 'compiled/fn/preventDefault', 'jqueryui/dialog'], function($, preventDefault) {
    $.fn.openAsDialog = function(options) {
      if (options == null) {
        options = {};
      }
      return this.click(preventDefault(function(e) {
        var $dialog, $iframe, $link, _ref, _ref1, _ref2, _ref3;

        $link = $(e.target);
        if ((_ref = options.width) == null) {
          options.width = 550;
        }
        if ((_ref1 = options.height) == null) {
          options.height = 500;
        }
        if ((_ref2 = options.title) == null) {
          options.title = $link.attr('title');
        }
        if ((_ref3 = options.resizable) == null) {
          options.resizable = false;
        }
        $dialog = $("<div>");
        $iframe = $('<iframe>', {
          style: "position:absolute;top:0;left:0;border:none",
          src: $link.attr('href') + '?embedded=1&no_headers=1'
        });
        $dialog.append($iframe);
        $dialog.on("dialogopen", function() {
          var $container;

          $container = $dialog.closest('.ui-dialog-content');
          $iframe.height($container.outerHeight());
          return $iframe.width($container.outerWidth());
        });
        return $dialog.dialog(options);
      }));
    };
    $(function() {
      return $('a[data-open-as-dialog]').openAsDialog();
    });
    return $;
  });

}).call(this);
