(function(){require(["jquery","jquery.instructure_misc_plugins"],function(e){return e(document).ready(function(){return e(document).bind("edit_event_dialog",function(){return e("#wizard_box .option.create_calendar_event_option.selected").length>0?e("#wizard_box .edit_calendar_event_option").click():e("#wizard_box .option.create_assignment_option.selected").length>0?e("#wizard_box .tab_assignment_option").click():void 0}).bind("event_dialog",function(){return e("#wizard_box .option.delete_calendar_event_option.selected").length>0?e("#wizard_box .confirm_delete_calendar_event_option").click():void 0}).bind("event_tag_select",function(n,t){return 1===t&&e("#wizard_box .option.tab_assignment_option.selected").length>0?e("#wizard_box .edit_assignment_option").click():void 0}).bind("add_event",function(){return e("#wizard_box .option.edit_calendar_event_option.selected").length>0?e("#wizard_box .review_calendar_event_option").click():e("#wizard_box .option.edit_assignment_option.selected").length>0?e("#wizard_box .review_assignment_option").click():void 0}).bind("delete_event",function(){return e("#wizard_box .option.confirm_delete_calendar_event_option.selected").length>0?e("#wizard_box .review_delete_calendar_event_option").click():void 0}),e(".highlight_calendar_event_title").hover(function(){return e("#edit_calendar_event_form input[name='calendar_event[title]']").indicate()},function(){}),e(".highlight_undated_events").hover(function(){return e(".calendar_undated").indicate()},function(){}),e(".highlight_assignment_tab").hover(function(){return e(".edit_assignment_option").indicate()},function(){}),e(".highlight_assignment_title").hover(function(){return e("#edit_assignment_form input[name='assignment[title]']").indicate()},function(){}),e(".highlight_delete_event").hover(function(){return e("#event_details .delete_event_link").indicate()},function(){})})})}).call(this);