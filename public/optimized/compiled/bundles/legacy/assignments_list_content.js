(function(){require(["i18n!assignments.assignments_list_content","jquery","jquery.instructure_misc_plugins","jquery.templateData","vendor/date"],function(s,t){return window.managedAssignments=null,t(document).ready(function(){var n,e,i,a,d,r,_,u;if(managedAssignments)for(r in managedAssignments)e=managedAssignments[r].assignment,n=t(".assignment_"+e.id),n.fillTemplateData({data:{submitted_count:e.submitted_count||"0",graded_count:e.graded_count||"0"}}),(e.submitted_count||e.graded_count)&&(n.find(".submitted").showIf(!!e.submitted_count&&!e.graded_count),n.find(".graded").showIf(!!e.graded_count&&!e.submitted_count),n.find(".submitted_and_graded").showIf(e.submitted_count&&e.graded_count),n.find(".submitted_details").showIf(!(!e.submitted_count&&!e.graded_count)));if(ENV.submissions_hash)for(r in ENV.submissions_hash)u=ENV.submissions_hash[r].submission,n=t(".assignment_"+r),u&&(u.score||0===u.score)?(n.addClass("group_assignment_graded"),n.find(".grade").show()):(n.removeClass("group_assignment_graded"),n.find(".grade").hide()),u&&u.submission_type&&!u.score&&(n.addClass("group_assignment_ungraded"),i=parseInt(n.find(".needs_grading_count").text(),10)||0,i++,n.find(".needs_grading_count").text(i)),n.fillTemplateData({data:u,hrefValues:["assignment_id","user_id"]}),n.find(".submission_comment_link").showIf(u&&u.submission_comments_count),n.find(".rubric_assessment_link").showIf(u&&u.has_rubric_assessment),a=n.filter(":first").getTemplateData({textValues:["due_date_string","due_time_string"]}),d=Date.parse(a.due_date_string+" "+a.due_time_string),_=new Date,u&&u.submitted_at&&n.addClass("group_assignment_submitted"),d&&(!u||!u.submitted_at)&&_>d&&n.addClass("group_assignment_overdue");return t("#groups_for_student .assignment_group").find(".more_info").hide().end().find(".more_info_brief").showIf("percent"===t("#group_weighting_scheme").text()).append(" of final grade"),t(".show_groups_link,.hide_groups_link").click(function(s){return s.preventDefault(),t(this).hasClass("show_groups_link")&&!t("#groups_for_student").hasClass("populated")&&(t("#assignments_for_student .group_assignment").each(function(){var s,e;return n=t(this).clone(!0),e=n.find(".assignment_group_id").text(),s=t("#groups_for_student .group_"+e),s.find(".assignment_list").append(n)}),t("#groups_for_student").addClass("populated")),t("#groups_for_student").showIf(t(this).hasClass("show_groups_link")),t("#assignments_for_student").showIf(t(this).hasClass("hide_groups_link")),t(".show_groups_link").showIf(t(this).hasClass("hide_groups_link")),t(".hide_groups_link").showIf(t(this).hasClass("show_groups_link"))}),t(".group_assignment").hover(function(){var n;return t(this).hasClass("group_assignment_overdue")?t(this).attr("title",s.t("assignments.overdue","This assignment is overdue")):t(this).hasClass("group_assignment_ungraded")?(n=t(this).getTemplateData({textValues:["needs_grading_count"]}).needs_grading_count,t(this).attr("title",s.t("assignments.needs_grading_count","%{needs_grading_count} submissions for this assignment still need grading",{needs_grading_count:n}))):t(this).hasClass("group_assignment_graded")?t(this).attr("title",s.t("assignments.graded","This assignment has been graded")):void 0},function(){return t(this).attr("title","")})})})}).call(this);