(function() {
  define(['i18n!shared.flash_notices', 'jquery', 'underscore', 'compiled/fn/preventDefault', 'jqueryui/effects/drop', 'vendor/jquery.cookie'], function(I18n, $, _, preventDefault) {
    var $buffer, $holder, $screenreader_holder, flashBox, screenReaderFlashBox;

    $buffer = $("#flash_message_buffer");
    $holder = $("#flash_message_holder");
    $screenreader_holder = $("#flash_screenreader_holder");
    $holder.on('click', '.close_link', preventDefault(function() {}));
    $holder.on('click', 'li', function() {
      var $this, bufferIndex;

      $this = $(this);
      if ($this.hasClass('no_close')) {
        return;
      }
      if ($this.hasClass('unsupported_browser')) {
        $.cookie('unsupported_browser_dismissed', '1');
      }
      $this.stop(true, true).remove();
      if ((bufferIndex = $this.data('buffer-index')) != null) {
        return $buffer.find("[data-buffer-index=" + bufferIndex + "]").remove();
      }
    });
    screenReaderFlashBox = function(type, content) {
      var $screenreader_node;

      $screenreader_node = $("<span role=\"alert\">" + content + "</span>");
      $screenreader_node.appendTo($screenreader_holder);
      return window.setTimeout((function() {
        return $screenreader_node.remove();
      }), 20000);
    };
    flashBox = function(type, content, timeout, cssOptions) {
      var $node;

      if (cssOptions == null) {
        cssOptions = {};
      }
      $node = $("<li class=\"ic-flash-" + type + "\">\n  <i></i>\n  " + content + "\n  <a href=\"#\" class=\"close_link icon-end\">" + (I18n.t("close", "Close")) + "</a>\n</li>");
      $node.appendTo($holder).css(_.extend({
        zIndex: 1
      }, cssOptions)).show('drop', {
        direction: "up"
      }, 'fast', function() {
        return $(this).css('z-index', 2);
      }).delay(timeout || 7000).animate({
        'z-index': 1
      }, 0).fadeOut('slow', function() {
        return $(this).slideUp('fast', function() {
          return $(this).remove();
        });
      });
      return setTimeout((function() {
        return screenReaderFlashBox(type, content);
      }), 100);
    };
    $.flashMessage = function(content, timeout) {
      if (timeout == null) {
        timeout = 3000;
      }
      return flashBox("success", content, timeout);
    };
    $.flashError = function(content, timeout) {
      return flashBox("error", content, timeout);
    };
    $.flashWarning = function(content, timeout) {
      if (timeout == null) {
        timeout = 3000;
      }
      return flashBox("warning", content, timeout);
    };
    $.screenReaderFlashMessage = function(content) {
      return screenReaderFlashBox('success', content);
    };
    return $.screenReaderFlashError = function(content) {
      return screenReaderFlashBox('error', content);
    };
  });

}).call(this);
