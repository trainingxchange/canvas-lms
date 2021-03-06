(function() {
  define(['jquery', 'underscore'], function($, _) {
    var convertApiUserContent;

    return convertApiUserContent = function(html, options) {
      var $dummy;

      if (options == null) {
        options = {};
      }
      $dummy = $('<div />').html(html);
      $dummy.find('video.instructure_inline_media_comment,audio.instructure_inline_media_comment').replaceWith(function() {
        var $node;

        $node = $("<a id='media_comment_" + ($(this).data('media_comment_id')) + "'            data-media_comment_type='" + ($(this).data('media_comment_type')) + "'            class='instructure_inline_media_comment " + (this.nodeName.toLowerCase()) + "_comment' />");
        $node.html($(this).html());
        return $node;
      });
      $dummy.find('object.instructure_user_content embed').remove();
      if (!options.forEditing) {
        $dummy.find('object.instructure_user_content,embed.instructure_user_content').replaceWith(function() {
          var $form, $this, action, uuid;

          $this = $(this);
          if (!$this.data('uc_snippet') || !$this.data('uc_sig')) {
            return this;
          }
          uuid = _.uniqueId("uc_");
          action = "/object_snippet";
          if (ENV.files_domain) {
            action = "//" + ENV.files_domain + action;
          }
          $form = $("<form action='" + action + "' method='post' class='user_content_post_form' target='" + uuid + "' id='form-" + uuid + "' />");
          $form.append($("<input type='hidden'/>").attr({
            name: 'object_data',
            value: $this.data('uc_snippet')
          }));
          $form.append($("<input type='hidden'/>").attr({
            name: 's',
            value: $this.data('uc_sig')
          }));
          $('body').append($form);
          setTimeout((function() {
            return $form.submit();
          }), 0);
          return $("<iframe class='user_content_iframe' name='" + uuid + "' style='width: " + ($this.data('uc_width')) + "; height: " + ($this.data('uc_height')) + ";' frameborder='0' />");
        });
      }
      return $dummy.html();
    };
  });

}).call(this);
