(function() {
  define(['i18n!media_comments', 'jquery', 'compiled/fn/preventDefault', 'str/htmlEscape', 'compiled/jquery/mediaComment'], function(I18n, $, preventDefault, htmlEscape) {
    return $(document).on('click', 'a.instructure_inline_media_comment', preventDefault(function() {
      var $div, $link, $minimizer, id, idAttr, mediaType;

      if (!INST.kalturaSettings) {
        return alert(I18n.t('alerts.kaltura_disabled', "Kaltura has been disabled for this Canvas site"));
      }
      $link = $(this);
      $div = $("<span><span></span><br/></span>");
      mediaType = 'video';
      id = $link.data('media_comment_id') || $link.find(".media_comment_id:first").text();
      $div.css('display', 'block');
      if (!id && (idAttr = $link.attr('id')) && idAttr.match(/^media_comment_/)) {
        id = idAttr.substring(14);
      }
      $link.after($div);
      $link.hide();
      if ($link.data('media_comment_type') === 'audio' || $link.is('.audio_playback, .audio_comment, .instructure_audio_link')) {
        mediaType = 'audio';
      }
      $div.children("span").mediaComment('show_inline', id, mediaType, $link.attr('href'));
      $minimizer = $("<a href='#' style='font-size: 0.8em;'>                     " + (htmlEscape(I18n.t('links.minimize_embedded_kaltura_content', 'Minimize embedded content'))) + "                   </a>");
      $minimizer.appendTo($div).click(preventDefault(function() {
        var _ref;

        if ((_ref = $div.find('video,audio').data('mediaelementplayer')) != null) {
          _ref.pause();
        }
        $div.remove();
        $link.show();
        return $.trackEvent('hide_embedded_content', 'hide_media');
      }));
      return $.trackEvent('show_embedded_content', 'show_media');
    }));
  });

}).call(this);
