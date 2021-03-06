(function() {
  require(['i18n!zip_file_imports', 'jquery', 'jquery.ajaxJSON', 'jquery.instructure_forms', 'jqueryui/dialog', 'compiled/jquery.rails_flash_notifications', 'jqueryui/progressbar'], function(I18n, $) {
    return $(document).ready(function() {
      var $frame, $zipFile;

      $zipFile = $("#zip_file_import_form #zip_file");
      $zipFile.change(function() {
        var val;

        val = $(this).val();
        if (val && !val.match(/\.zip$/)) {
          $("#zip_only_message").show();
          return $("#upload_form .submit_button").attr('disabled', true);
        } else {
          $("#zip_only_message").hide();
          return $("#upload_form .submit_button").attr('disabled', false);
        }
      });
      $zipFile.change();
      $("#uploading_progressbar").progressbar();
      $("#zip_file_import_form").submit(function() {
        $("#uploading_please_wait_dialog").dialog({
          bgiframe: true,
          width: 400,
          modal: true,
          closeOnEscape: false,
          dialogClass: "ui-dialog-no-close-button"
        });
        return true;
      });
      $frame = $("<iframe id='import_frame' name='import_frame'/>");
      $("body").append($frame.hide());
      $("#zip_file_import_form").attr('target', 'import_frame');
      return $("#zip_file_import_form").submit(function(event) {
        var importFailed, params, pollImport, pollURL;

        event.preventDefault();
        $("#uploading_progressbar").progressbar('value', 0);
        pollURL = null;
        $("#zip_file_import_form .errors").hide();
        importFailed = function(errors) {
          var $div, $li, $ul, error, error_message, idx, _i, _len;

          $div = $("<div class='errors' style='color: #a00; font-weight: bold;'/>");
          error_message = I18n.t('errors.extracting_file', "There were some errors extracting the zip file.  Please try again");
          $div.text(error_message);
          $.flashError(error_message);
          $("#zip_import_batch_id").val($("#zip_import_batch_id").val() + "0");
          $ul = $("<ul class='errors'/>");
          for (_i = 0, _len = errors.length; _i < _len; _i++) {
            idx = errors[_i];
            error = errors[idx];
            $li = $("<li/>");
            $li.text(error);
            $ul.append($li);
          }
          $("#zip_file_import_form .errors").hide();
          $("#zip_file_import_form").prepend($ul).prepend($div);
          return $("#uploading_please_wait_dialog").dialog('close');
        };
        pollImport = function() {
          return $.getJSON(pollURL, function(data) {
            var zfi;

            zfi = data.zip_file_import;
            if (zfi === null) {
              pollImport.blankCount = pollImport.blankCount || 0;
              pollImport.blankCount++;
              if (pollImport.blankCount > 10) {
                return importFailed([I18n.t('errors.server_status', "The server stopped returning a valid status")]);
              } else {
                return setTimeout(pollImport, 2000);
              }
            } else if (zfi.data && zfi.data.errors) {
              return importFailed(zfi.data.errors);
            } else if (zfi.workflow_state === 'failed') {
              return importFailed([]);
            } else if (zfi.workflow_state === 'imported') {
              $("#uploading_progressbar").progressbar('value', 100);
              $("#uploading_please_wait_dialog").prepend(I18n.t('notices.uploading_complete', "Uploading complete!"));
              return location.href = $("#return_to").val();
            } else {
              pollImport.errorCount = 0;
              pollImport.blankCount = 0;
              $("#uploading_progressbar").progressbar('value', (zfi.progress || 0) * 100);
              return setTimeout(pollImport, 2000);
            }
          }, function() {
            pollImport.errorCount = pollImport.errorCount || 0;
            pollImport.errorCount++;
            if (pollImport.errorCount > 10) {
              return importFailed([I18n.t('errors.server_stopped_responding', "The server stopped responding to status requests")]);
            } else {
              return setTimeout(pollImport, 2000);
            }
          });
        };
        params = {
          'folder_id': $(this).find("select[name=folder_id]").val(),
          'format': 'json'
        };
        return $.ajaxJSONFiles($(this).attr('action'), 'POST', params, $(this).find("#zip_file"), function(data) {
          var zip_import_id;

          zip_import_id = data.zip_file_import.id;
          pollURL = $(".zip_file_import_status_url").attr('href');
          pollURL = $.replaceTags(pollURL, 'id', zip_import_id);
          return pollImport();
        }, function(data) {
          return $dialog.text(I18n.t('errors.uploading', "There were errors uploading the zip file."));
        });
      });
    });
  });

}).call(this);
