(function() {
  require(['INST', 'i18n!assignment', 'jquery', 'compiled/models/Assignment', 'compiled/views/PublishButtonView', 'compiled/views/assignments/SpeedgraderLinkView', 'compiled/util/vddTooltip', 'compiled/jquery/ModuleSequenceFooter', 'jquery.instructure_forms'], function(INST, I18n, $, Assignment, PublishButtonView, SpeedgraderLinkView, vddTooltip) {
    $(function() {
      var $el, model;

      $el = $('#assignment_publish_button');
      if ($el.length > 0) {
        model = new Assignment({
          id: $el.attr('data-id'),
          unpublishable: !$el.hasClass('disabled'),
          published: $el.hasClass('published')
        });
        model.doNotParse();
        new SpeedgraderLinkView({
          model: model,
          el: '#assignment-speedgrader-link'
        }).render();
        new PublishButtonView({
          model: model,
          el: $el
        }).render();
      }
      if (ENV.DRAFT_STATE) {
        $('#sequence_footer').moduleSequenceFooter({
          courseID: ENV.COURSE_ID,
          assetType: 'Assignment',
          assetID: ENV.ASSIGNMENT_ID,
          location: location
        });
      }
      return vddTooltip();
    });
    return $(function() {
      $(".upload_submissions_link").click(function(event) {
        event.preventDefault();
        return $("#re_upload_submissions_form").slideToggle();
      });
      $(".download_submissions_link").click(function(event) {
        event.preventDefault();
        INST.downloadSubmissions($(this).attr('href'));
        return $(".upload_submissions_link").slideDown();
      });
      $("#re_upload_submissions_form").submit(function(event) {
        var data;

        data = $(this).getFormData();
        if (!data.submissions_zip) {
          event.preventDefault();
          return event.stopPropagation();
        } else if (!data.submissions_zip.match(/\.zip$/)) {
          event.preventDefault();
          event.stopPropagation();
          return $(this).formErrors({
            submissions_zip: I18n.t('errors.upload_as_zip', "Please upload files as a .zip")
          });
        }
      });
      return $("#edit_assignment_form").bind('assignment_updated', function(event, data) {
        if (data.assignment && data.assignment.peer_reviews) {
          return $(".assignment_peer_reviews_link").slideDown();
        } else {
          return $(".assignment_peer_reviews_link").slideUp();
        }
      });
    });
  });

}).call(this);
