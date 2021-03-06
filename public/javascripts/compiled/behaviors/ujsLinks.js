(function() {
  define(['jquery'], function($) {
    var allowAction, handleMethod, handleRemove;

    handleMethod = function(link) {
      var form, href, metadataInput, method, target;

      link.data('handled', true);
      href = link.data('url') || link.attr('href');
      method = link.data('method');
      target = link.attr('target');
      form = $("<form method='post' action='" + href + "'></form>");
      metadataInput = "<input name='_method' value='" + method + "' type='hidden' />";
      if (ENV.AUTHENTICITY_TOKEN) {
        metadataInput += "<input name='authenticity_token' value='" + ENV.AUTHENTICITY_TOKEN + "' type='hidden' />";
      }
      if (target) {
        form.attr('target', target);
      }
      return form.hide().append(metadataInput).appendTo('body').submit();
    };
    allowAction = function(element) {
      var message;

      message = element.data('confirm');
      if (!message) {
        return true;
      }
      return confirm(message);
    };
    $(document).delegate('a[data-confirm], a[data-method], a[data-remove]', 'click', function(event) {
      var $link;

      $link = $(this);
      if ($link.data('handled') || !allowAction($link)) {
        return false;
      }
      if ($link.data('remove')) {
        handleRemove($link);
        return false;
      } else if ($link.data('method')) {
        handleMethod($link);
        return false;
      }
    });
    return handleRemove = function($link) {
      var $elToRemove, $startLookingFrom, closestKyleMenu, revert, selector, triggerRemove, url;

      selector = $link.data('remove');
      $startLookingFrom = $link;
      url = $link.data('url');
      closestKyleMenu = $link.closest(':ui-popup').popup('option', 'trigger').data('KyleMenu');
      if (closestKyleMenu && closestKyleMenu.opts.appendMenuTo) {
        $startLookingFrom = closestKyleMenu.$placeholder;
      }
      $elToRemove = $startLookingFrom.closest(selector);
      $elToRemove.bind({
        beforeremove: function() {
          return $elToRemove.hide();
        },
        remove: function() {
          return $elToRemove.remove();
        }
      });
      $elToRemove.trigger('beforeremove');
      triggerRemove = function() {
        return $elToRemove.trigger('remove');
      };
      revert = function() {
        return $elToRemove.show();
      };
      if (url) {
        return $.ajaxJSON(url, "DELETE", {}, triggerRemove, revert);
      } else {
        return triggerRemove();
      }
    };
  });

}).call(this);
