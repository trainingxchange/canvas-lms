(function(){define(["ember","../../start_app","../../environment_setup","../../../models/question_statistics/response_ratio_calculator"],function(t,e,r,n){var o,s,i;return s=t.run,o=null,i=null,module("ResponseRatioCalculator",{setup:function(){return o=e(),i=n.create({content:{},quizStatistics:{}})},teardown:function(){return s(o,"destroy")}}),test("should run",function(){return ok(!0)}),test("#ratio: happy path",function(){return s(function(){return i.set("participantCount",10),i.set("answerPool",[{id:1,responses:0,correct:!0}]),equal(i.get("ratio"),0),i.set("answerPool",[{id:1,responses:3,correct:!0}]),equal(i.get("ratio"),.3),i.set("answerPool",[{id:1,responses:10,correct:!0}]),equal(i.get("ratio"),1)})}),test("#ratio: doesnt divide by zero",function(){return s(function(){return i.set("participantCount",0),i.set("answerPool",[{id:1,responses:2,correct:!0}]),equal(i.get("ratio"),0)})}),test("#correctMultipleAnswerRatio",function(){return s(function(){return i.set("questionType","multiple_answers_question"),i.set("correct",1),i.set("participantCount",5),equal(i.get("ratio"),.2),i.set("participantCount",0),equal(i.get("ratio"),0)})})})}).call(this);