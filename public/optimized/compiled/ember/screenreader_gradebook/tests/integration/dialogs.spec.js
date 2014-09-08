(function(){define(["../start_app","ember","../shared_ajax_fixtures","jquery","vendor/jquery.ba-tinypubsub"],function(e,t,n){var r,s,o,i,u,a;return r=null,n.create(),i=function(e){return click(e).then(function(){var e;return e=find(".ui-dialog:visible","body"),equal(e.length,1,"the dialog opens")})},u=function(e){return i(e).then(function(){var e;return e=find(".ui-dialog:visible","body"),ok(find('.ui-dialog-title:contains("#{expectedTitle}")',e),"dialog has the expected title")})},o=function(e,t){return u(e,t).then(function(){return click(find(".ui-dialog-titlebar-close:visible","body")).then(function(){var e;return e=find(".ui-dialog:visible","body"),equal(e.length,0,"the dialog closes")})})},a=function(e,n,r){return null==r&&(r=""),e.respond("POST",n,[200,{"Content-Type":"application/json"},JSON.stringify(t.copy(r,!0))])},s=function(e,t,n){return null==n&&(n=""),e.respond(t,JSON.stringify(n))},module("screenreader_gradebook: dialogs open and close",{setup:function(){return r=e()},teardown:function(){return t.run(r,"destroy")}}),test("upload scores dialog displays properly",function(){return visit("/"),o("#upload","Choose a CSV file to Upload")}),test("set group weights dialog displays propery",function(){return visit("/"),o("#ag_weights","Manage assignment group weighting")}),module("screenreader_gradebook: assignment dialogs open and close",{setup:function(){var n=this;return r=e(),visit("/").then(function(){return n.controller=r.__container__.lookup("controller:screenreader_gradebook"),n.selected=n.controller.get("assignments").objectAt(0),t.run(function(){return n.controller.set("selectedAssignment",n.selected)})})},teardown:function(){return t.run(r,"destroy")}}),test("default grade dialog displays properly",function(){return o("#set_default_grade","Default grade for "+this.selected.name)}),test("curve grades dialog displays properly",function(){return o("#curve_grades","Curve Grades for "+this.selected.name)}),module("screenreader_gradebook: submission dialogs open and close",{setup:function(){var n=this;return r=e(),visit("/").then(function(){return n.controller=r.__container__.lookup("controller:screenreader_gradebook"),n.assignment=n.controller.get("assignments").objectAt(0),n.student=n.controller.get("students").objectAt(0),t.run(function(){return n.controller.setProperties({selectedAssignment:n.assignment,selectedStudent:n.student})})})},teardown:function(){return t.run(r,"destroy")}}),test("submission details dialog",function(){return o("#submission_details",""+this.student.name)}),module("screenreader_gradebook: assignment and assignment_group dialogs saving",{setup:function(){var s=this;return r=e(),visit("/").then(function(){return s.controller=r.__container__.lookup("controller:screenreader_gradebook"),s.selAssignment=s.controller.get("assignments").objectAt(0),s.selStudent=s.controller.get("students").objectAt(0),s.server=sinon.fakeServer.create(),s.alert=sinon.stub(window,"alert"),s.modified_assignment_group={id:"1",name:"AG1",position:1,group_weight:100},t.run(function(){return s.controller.set("submissions",Em.copy(n.submissions,!0)),s.controller.set("selectedAssignment",s.selAssignment),s.controller.set("selectedStudent",s.selStudent)})})},teardown:function(){return t.$(".ui-dialog:visible").length&&t.$(".ui-dialog:visible").remove(),this.alert.restore(),this.server.restore(),t.run(r,"destroy")}}),test("default grade dialog updates the current students grade",function(){var e,t=this;return e=null,visit("/").then(function(){return i("#set_default_grade").then(function(){return e=find(".ui-dialog:visible","body"),fillIn(find("[name=default_grade]",e),100).then(function(){return click(find("[name=overwrite_existing_grades]",e)).then(function(){return click(".button_type_submit",e),a(t.server,"/courses/"+ENV.GRADEBOOK_OPTIONS.context_id+"/gradebook/update_submission",n.set_default_grade_response)})})})}),andThen(function(){return equal(parseInt(find("#student_and_assignment_grade").val(),10),100)})}),test("group weights dialog update groups weights and final grade",function(){var e,t=this;return e=null,visit("/").then(function(){var n;return n=find(".total-grade").text(),equal(parseFloat(n),"2.1"),i("#ag_weights").then(function(){return e=find(".ui-dialog:visible","body"),click(find("#group_weighting_scheme",e)),s(t.server,"/courses/1",{course:{group_weighting_scheme:"percent"}}),andThen(function(){return fillIn(find("#assignment_group_1_weight",e),100).then(function(){return click(find(".ui-button",e)),s(t.server,"/api/v1/courses/1/assignment_groups/1",t.modified_assignment_group),andThen(function(){var e,t;return t=find(".total-grade").text(),e=find(".assignment-group-grade").first().text(),equal(parseFloat(t),"3"),notEqual(e.indexOf("3 / 100"),-1)})})})})})}),module("screenreader_gradebook: curve grades display",{setup:function(){var n=this;return r=e(),visit("/").then(function(){return n.controller=r.__container__.lookup("controller:screenreader_gradebook"),n.selected=n.controller.get("assignments").objectAt(0),t.run(function(){return n.controller.set("selectedAssignment",n.selected)})})},teardown:function(){return t.run(r,"destroy")}}),test("curve grades button does display with points poisslbe",function(){var e;return e=find("#curve_grades").text(),notEqual(e.indexOf("Curve Grades"),-1)}),test("curve grades button does not display with 0 points possible",function(){var e=this;return t.run(function(){return e.controller.set("selectedAssignment.points_possible",0)}),equal(find("#curve_grades").text(),"")}),test("curve grades button does not display with null points poisslbe",function(){var e=this;return t.run(function(){return e.controller.set("selectedAssignment.points_possible",null)}),equal(find("#curve_grades").text(),"")})})}).call(this);