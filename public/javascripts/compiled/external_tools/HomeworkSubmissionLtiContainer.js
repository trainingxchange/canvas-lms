(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['Backbone', 'i18n!assignments', 'jquery', 'underscore', 'jst/assignments/homework_submission_tool', 'compiled/views/ExternalTools/ExternalContentReturnView', 'compiled/external_tools/ExternalToolCollection', 'compiled/views/assignments/ExternalContentHomeworkSubmissionView', 'jquery.disableWhileLoading'], function(Backbone, I18n, $, _, homeworkSubmissionTool, ExternalContentReturnView, ExternalToolCollection, ExternalContentHomeworkSubmissionView) {
    var HomeworkSubmissionLtiContainer;

    return HomeworkSubmissionLtiContainer = (function() {
      function HomeworkSubmissionLtiContainer(toolsFormSelector) {
        this.uploadFailure = __bind(this.uploadFailure, this);
        this.uploadSuccess = __bind(this.uploadSuccess, this);
        this.submissionFailure = __bind(this.submissionFailure, this);
        this.submitAssignment = __bind(this.submitAssignment, this);
        this.disableLoader = __bind(this.disableLoader, this);
        this.redirectSuccessfulAssignment = __bind(this.redirectSuccessfulAssignment, this);
        this.checkFileStatus = __bind(this.checkFileStatus, this);        this.renderedViews = {};
        this.toolsForm = $(toolsFormSelector);
        this.externalToolCollection = new ExternalToolCollection;
        this.externalToolCollection.add(ENV.EXTERNAL_TOOLS);
      }

      HomeworkSubmissionLtiContainer.prototype.loadExternalTools = function() {
        var _this = this;

        if (this.externalToolCollection.length > 0) {
          $(".submit_from_external_tool_option").parent().show();
          this.toolsForm.find("ul.tools").empty();
          return this.externalToolCollection.forEach(function(tool) {
            return _this.addToolToMoreList(tool);
          });
        } else {
          return this.toolsForm.find("ul.tools li").text(I18n.t("no_tools_found", "No tools found"));
        }
      };

      HomeworkSubmissionLtiContainer.prototype.embedLtiLaunch = function(toolId) {
        var returnView, tool;

        tool = this.externalToolCollection.findWhere({
          id: toolId.toString(10)
        });
        this.cleanupViewsForTool(tool);
        returnView = this.createReturnView(tool);
        $('#submit_from_external_tool_form_' + toolId).append(returnView.el);
        returnView.render();
        return this.renderedViews[toolId.toString(10)].push(returnView);
      };

      HomeworkSubmissionLtiContainer.prototype.cleanupViewsForTool = function(tool) {
        var views,
          _this = this;

        if (_.has(this.renderedViews, tool.get('id'))) {
          views = this.renderedViews[tool.get('id')];
          views.forEach(function(v) {
            return v.remove();
          });
        }
        return this.renderedViews[tool.get('id')] = [];
      };

      HomeworkSubmissionLtiContainer.prototype.cancelSubmission = function() {
        $('#submit_assignment').hide();
        return $('.submit_assignment_link').show();
      };

      HomeworkSubmissionLtiContainer.prototype.addToolToMoreList = function(tool) {
        var $li, html;

        tool.attributes.display_text = tool.get('homework_submission').label;
        html = homeworkSubmissionTool(tool.attributes);
        $li = $(html).data('tool', tool);
        return this.toolsForm.find("ul.tools").append($li);
      };

      HomeworkSubmissionLtiContainer.prototype.createReturnView = function(tool) {
        var returnView,
          _this = this;

        returnView = new ExternalContentReturnView({
          model: tool,
          launchType: 'homework_submission',
          launchParams: {
            assignment_id: ENV.SUBMIT_ASSIGNMENT.ID
          },
          displayAsModal: false
        });
        returnView.on('ready', function(data) {
          var homeworkSubmissionView;

          tool = this.model;
          homeworkSubmissionView = _this.createHomeworkSubmissionView(tool, data);
          homeworkSubmissionView.parentView = _this;
          this.remove();
          $('#submit_from_external_tool_form_' + tool.get('id')).append(homeworkSubmissionView.el);
          _this.cleanupViewsForTool(tool);
          _this.renderedViews[tool.get('id')].push(homeworkSubmissionView);
          return homeworkSubmissionView.render();
        });
        returnView.on('cancel', function(data) {});
        return returnView;
      };

      HomeworkSubmissionLtiContainer.prototype.createHomeworkSubmissionView = function(tool, data) {
        var homeworkSubmissionView,
          _this = this;

        homeworkSubmissionView = new ExternalContentHomeworkSubmissionView({
          externalTool: tool,
          model: new Backbone.Model(data)
        });
        homeworkSubmissionView.on('relaunchTool', function(tool, model) {
          this.remove();
          return this.parentView.embedLtiLaunch(tool.get('id'));
        });
        homeworkSubmissionView.on('submit', function(tool, model) {
          return _this.uploadFileFromUrl(tool, model);
        });
        homeworkSubmissionView.on('cancel', function(tool, model) {
          return this.parentView.cancelSubmission();
        });
        return homeworkSubmissionView;
      };

      HomeworkSubmissionLtiContainer.prototype.checkFileStatus = function(url, callback, error) {
        var _this = this;

        return $.ajaxJSON(url, "GET", {}, (function(data) {
          if (data.upload_status === "ready") {
            callback(data.attachment);
          } else if (data.upload_status === "errored") {
            error(data.message);
          } else {
            setTimeout((function() {
              _this.checkFileStatus(url, callback, error);
            }), 2500);
          }
        }), function(data) {
          return error(data.message);
        });
      };

      HomeworkSubmissionLtiContainer.prototype.redirectSuccessfulAssignment = function(responseData) {
        window.onbeforeunload = function() {};
        window.location.reload();
        this.loaderPromise.resolve();
      };

      HomeworkSubmissionLtiContainer.prototype.disableLoader = function() {
        return this.loaderPromise.resolve();
      };

      HomeworkSubmissionLtiContainer.prototype.submitAssignment = function(fileData) {
        var data, submissionUrl;

        data = {
          submission: {
            submission_type: "online_upload",
            file_ids: [fileData.id]
          },
          comment: {
            text_comment: this.assignmentSubmission.get('comment')
          }
        };
        submissionUrl = "/api/v1/courses/" + ENV.COURSE_ID + "/assignments/" + ENV.SUBMIT_ASSIGNMENT.ID + "/submissions";
        $.ajaxJSON(submissionUrl, "POST", data, this.redirectSuccessfulAssignment, this.disableLoader);
      };

      HomeworkSubmissionLtiContainer.prototype.submissionFailure = function(message) {
        this.loaderPromise.resolve();
        thisForm.find(".submit_button").text(I18n.t("file_retrieval_error", "Retrieving File Failed"));
        return $.flashError(I18n.t("invalid_file_retrieval", "There was a problem retrieving the file sent from this tool."));
      };

      HomeworkSubmissionLtiContainer.prototype.uploadSuccess = function(data) {
        this.checkFileStatus(data.status_url, this.submitAssignment, this.submissionFailure);
      };

      HomeworkSubmissionLtiContainer.prototype.uploadFailure = function(data) {
        this.loaderPromise.resolve();
        thisForm.find(".submit_button").text(I18n.t("file_retrieval_error", "Retrieving File Failed"));
      };

      HomeworkSubmissionLtiContainer.prototype.uploadFileFromUrl = function(tool, modelData) {
        var fileParams, fileUploadUrl, thisForm;

        this.loaderPromise = $.Deferred();
        thisForm = $('#submit_from_external_tool_form_' + tool.get('id'));
        this.assignmentSubmission = modelData;
        fileParams = {
          url: this.assignmentSubmission.get('url'),
          name: this.assignmentSubmission.get('text'),
          content_type: ''
        };
        fileUploadUrl = "/api/v1/courses/" + ENV.COURSE_ID + "/assignments/" + ENV.SUBMIT_ASSIGNMENT.ID + "/submissions/" + ENV.current_user_id + "/files";
        $.ajaxJSON(fileUploadUrl, "POST", fileParams, this.uploadSuccess, this.uploadFailure);
        thisForm.disableWhileLoading(this.loaderPromise, {
          buttons: {
            ".submit_button": I18n.t("getting_file", "Retrieving File...")
          }
        });
      };

      return HomeworkSubmissionLtiContainer;

    })();
  });

}).call(this);
