(function() {
  define(['INST', 'i18n!user_lists', 'jquery', 'jquery.ajaxJSON', 'jquery.instructure_forms', 'jquery.instructure_misc_helpers', 'jquery.instructure_misc_plugins', 'jquery.loadingImg', 'compiled/jquery.rails_flash_notifications', 'jquery.scrollToVisible', 'jquery.templateData', 'vendor/jquery.scrollTo'], function(INST, I18n, $) {
    var $enrollment_blank, $form, $user_list_duplicates_found, $user_list_no_valid_users, $user_list_with_errors, $user_lists_processed_people, $user_lists_processed_person_template, UL, user_lists_path;

    $user_lists_processed_person_template = $("#user_lists_processed_person_template").removeAttr("id").detach();
    $user_list_no_valid_users = $("#user_list_no_valid_users");
    $user_list_with_errors = $("#user_list_with_errors");
    $user_lists_processed_people = $("#user_lists_processed_people");
    $user_list_duplicates_found = $("#user_list_duplicates_found");
    $form = $("#enroll_users_form");
    $enrollment_blank = $("#enrollment_blank").removeAttr("id").hide();
    user_lists_path = $("#user_lists_path").attr("href");
    UL = INST.UserLists = {
      init: function() {
        UL.showTextarea();
        $form.find(".cancel_button").click(function() {
          $(".add_users_link").show();
          return $form.hide();
        }).end().find(".go_back_button").click(UL.showTextarea).end().find(".verify_syntax_button").click(function(e) {
          e.preventDefault();
          UL.showProcessing();
          return $.ajaxJSON(user_lists_path, "POST", $form.getFormData(), UL.showResults);
        }).end().submit(function(event) {
          event.preventDefault();
          event.stopPropagation();
          $form.find(".add_users_button").text(I18n.t("adding_users", "Adding Users...")).attr("disabled", true);
          return $.ajaxJSON($form.attr("action"), "POST", $form.getFormData(), UL.success, UL.failure);
        });
        $form.find("#enrollment_type").change(function() {
          return $("#limit_privileges_to_course_section_holder").showIf($(this).find(':selected').data("isAdmin") != null);
        }).change();
        return $(".unenroll_user_link").click(function(event) {
          var $section, $sections, $toDelete, $user;

          event.preventDefault();
          event.stopPropagation();
          if ($(this).hasClass("cant_unenroll")) {
            return alert(I18n.t("cant_unenroll", "This user was automatically enrolled using the campus enrollment system, so they can't be manually removed.  Please contact your system administrator if you have questions."));
          } else {
            $user = $(this).parents(".user");
            $sections = $(this).parents(".sections");
            $section = $(this).parents(".section");
            $toDelete = $user;
            if ($sections.find(".section:visible").size() > 1) {
              $toDelete = $section;
            }
            return $toDelete.confirmDelete({
              message: I18n.t("delete_confirm", "Are you sure you want to remove this user?"),
              url: $(this).attr("href"),
              success: function() {
                return $(this).fadeOut(function() {
                  return UL.updateCounts();
                });
              }
            });
          }
        });
      },
      success: function(enrollments) {
        var addedMsg, already_existed;

        $form.find(".user_list").val("");
        UL.showTextarea();
        if (!enrollments || !enrollments.length) {
          return false;
        }
        already_existed = 0;
        $.each(enrollments, function() {
          return already_existed += UL.addUserToList(this.enrollment);
        });
        addedMsg = I18n.t("users_added", {
          one: "1 user added",
          other: "%{count} users added"
        }, {
          count: enrollments.length - already_existed
        });
        if (already_existed > 0) {
          addedMsg += " " + I18n.t("users_existed", {
            one: "(1 user already existed)",
            other: "(%{count} users already existed)"
          }, {
            count: already_existed
          });
        }
        return $.flashMessage(addedMsg);
      },
      failure: function(data) {
        return $.flashError(I18n.t("users_adding_failed", "Failed to enroll users"));
      },
      showTextarea: function() {
        var $user_list;

        $form.find(".add_users_button, .go_back_button, #user_list_parsed").hide();
        $form.find(".verify_syntax_button, .cancel_button, #user_list_textarea_container").show().removeAttr("disabled");
        $form.find(".verify_syntax_button").attr("disabled", false).text(I18n.t("buttons.continue", "Continue..."));
        $user_list = $form.find(".user_list").removeAttr('disabled').loadingImage('remove').focus();
        if ($user_list.is(':visible')) {
          return $user_list.select();
        }
      },
      showProcessing: function() {
        $form.find(".verify_syntax_button").attr("disabled", true).text(I18n.t("messages.processing", "Processing..."));
        return $form.find(".user_list").attr("disabled", true).loadingImage();
      },
      showResults: function(userList) {
        $form.find(".add_users_button, .go_back_button, #user_list_parsed").show();
        $form.find(".add_users_button").attr("disabled", false).focus().text(I18n.t("add_n_users", {
          one: "OK Looks Good, Add This 1 User",
          other: "OK Looks Good, Add These %{count} Users"
        }, {
          count: userList.users.length
        }));
        $form.find(".verify_syntax_button, .cancel_button, #user_list_textarea_container").hide();
        $form.find(".user_list").removeAttr("disabled").loadingImage("remove");
        $user_lists_processed_people.html("").show();
        if (!userList || !userList.users || !userList.users.length) {
          $user_list_no_valid_users.appendTo($user_lists_processed_people);
          return $form.find(".add_users_button").hide();
        } else {
          if (userList.errored_users && userList.errored_users.length) {
            $user_list_with_errors.appendTo($user_lists_processed_people).find(".message_content").text(I18n.t("user_parsing_errors", {
              one: "There was 1 error parsing that list of users.",
              other: "There were %{count} errors parsing that list of users."
            }, {
              count: userList.errored_users.length
            }) + " " + I18n.t("invalid_users_notice", "There may be some that were invalid, and you might need to go back and fix any errors.") + " " + I18n.t("users_to_add", {
              one: "If you proceed as is, 1 user will be added.",
              other: "If you proceed as is, %{count} users will be added."
            }, {
              count: userList.users.length
            }));
          }
          if (userList.duplicates && userList.duplicates.length) {
            $user_list_duplicates_found.appendTo($user_lists_processed_people).find(".message_content").text(I18n.t("duplicate_users", {
              one: "1 duplicate user found, duplicates have been removed.",
              other: "%{count} duplicate user found, duplicates have been removed."
            }, {
              count: userList.duplicates.length
            }));
          }
          return $.each(userList.users, function() {
            var userDiv;

            userDiv = $user_lists_processed_person_template.clone(true).fillTemplateData({
              data: this
            }).appendTo($user_lists_processed_people);
            if (this.user_id) {
              userDiv.addClass("existing-user").attr("title", I18n.t("titles.existing_user", "Existing user"));
            }
            return userDiv.show();
          });
        }
      },
      updateCounts: function() {
        return $.each(["student", "teacher", "ta", "teacher_and_ta", "student_and_observer", "observer"], function() {
          return $("." + this + "_count").text($("." + this + "_enrollments .user:visible").length);
        });
      },
      addUserToList: function(enrollment) {
        var $before, $enrollment, $list, already_existed, enrollmentType;

        enrollmentType = $.underscore(enrollment.type);
        $list = $(".user_list." + enrollmentType + "s");
        if (!$list.length) {
          if (enrollmentType === "student_enrollment" || enrollmentType === "observer_enrollment") {
            $list = $(".user_list.student_and_observer_enrollments");
          } else {
            $list = $(".user_list.teacher_and_ta_enrollments");
          }
        }
        $list.find(".none").remove();
        enrollment.invitation_sent_at = I18n.t("just_now", "Just Now");
        $before = null;
        $list.find(".user").each(function() {
          var name;

          name = $(this).getTemplateData({
            textValues: ["name"]
          }).name;
          if (name && enrollment.name && name.toLowerCase() > enrollment.name.toLowerCase()) {
            $before = $(this);
            return false;
          }
        });
        enrollment.enrollment_id = enrollment.id;
        already_existed = true;
        if (!$("#enrollment_" + enrollment.id).length) {
          already_existed = false;
          $enrollment = $enrollment_blank.clone(true).fillTemplateData({
            textValues: ["name", "membership_type", "email", "enrollment_id"],
            id: "enrollment_" + enrollment.id,
            hrefValues: ["id", "user_id", "pseudonym_id", "communication_channel_id"],
            data: enrollment
          }).addClass(enrollmentType).removeClass("nil_class user_").addClass("user_" + enrollment.user_id).toggleClass("pending", enrollment.workflow_state !== "active")[($before ? "insertBefore" : "appendTo")]($before || $list).show().animate({
            backgroundColor: "#FFEE88"
          }, 1000).animate({
            display: "block"
          }, 2000).animate({
            backgroundColor: "#FFFFFF"
          }, 2000, function() {
            return $(this).css("backgroundColor", "");
          });
          $enrollment.find(".enrollment_link").removeClass("enrollment_blank").addClass("enrollment_" + enrollment.id);
          $enrollment.parents(".user_list").scrollToVisible($enrollment);
        }
        UL.updateCounts();
        if (already_existed) {
          return 1;
        } else {
          return 0;
        }
      }
    };
    $(UL.init);
    return UL;
  });

}).call(this);
