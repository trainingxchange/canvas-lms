(function() {
  require(["jquery", "compiled/registration/registrationErrors", "jquery.instructure_forms", 'jquery.instructure_misc_plugins', 'user_sortable_name'], function($, registrationErrors) {
    return $(function() {
      var $disambiguation_box, $merge_link, $registration_form, $where_to_log_in, showPane;

      $registration_form = $("#registration_confirmation_form");
      $disambiguation_box = $(".disambiguation_box");
      showPane = function(paneToShow) {
        return $.each([$disambiguation_box, $registration_form, $where_to_log_in], function(i, $pane) {
          return $pane.showIf($pane.is(paneToShow));
        });
      };
      $(".btn#back").click(function(event) {
        showPane($disambiguation_box);
        return event.preventDefault();
      });
      $(".btn#register").click(function(event) {
        showPane($registration_form);
        return event.preventDefault();
      });
      $merge_link = $(".btn#merge").click(function(event) {
        if ($merge_link.attr('href') === 'new_user_account') {
          showPane($registration_form);
          return event.preventDefault();
        }
      });
      $("input:radio[name=\"pseudonym_select\"]").change(function() {
        return $merge_link.attr("href", $("input:radio[name=\"pseudonym_select\"]:checked").attr("value"));
      });
      $where_to_log_in = $('#where_to_log_in');
      if ($where_to_log_in.length) {
        $('#merge_if_clicked').click(function() {
          return window.location = $merge_link.attr("href");
        });
        $merge_link.click(function(event) {
          event.preventDefault();
          return showPane($where_to_log_in);
        });
      }
      $registration_form.find(":text:first").focus().select();
      return $registration_form.formSubmit({
        disableWhileLoading: 'spin_on_success',
        errorFormatter: registrationErrors,
        success: function(data) {
          var _ref;

          return location.href = (_ref = data.url) != null ? _ref : '/';
        }
      });
    });
  });

}).call(this);
