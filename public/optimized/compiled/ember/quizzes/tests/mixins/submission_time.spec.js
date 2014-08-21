(function(){define(["ember","../../mixins/submission_time"],function(e,i){var t,n;return n=function(e){var i;return i=new Date((new Date).getTime()+6e4*e),i.toISOString()},t=function(t,n,s,u){return u||(u=!1),s||(s=void 0),e.Object.createWithMixins(i,{okayToReload:u,quizSubmission:{startedAt:t,finishedAt:n,quiz:{timeLimit:s}}})},module("SubmissionTime"),test("isActive when startedAt but no finishedAt",function(){var e,i;return e=n(-5),i=t(e,void 0),equal(i.get("isActive"),!0)}),test("not isActive when startedAt and finishedAt",function(){var e,i,s;return e=n(-5),i=n(-1),s=t(e,i),equal(s.get("isActive"),!1)}),test("calculates current duration when not timed quiz and no finish time",function(){var e,i,s;return i=n(-5),s=t(i),e=sinon.spy(s,"calcCurrentSeconds"),s.updateRunningTime(),equal(e.called,!0,"uses calcCurrentSeconds, to count submission duration")}),test("closeOutSubmission makes quizSubmission no longer active",function(){var e,i;return i=n(-2),e=t(i,void 0,2),e.closeOutSubmission(i,120),ok(!!e.get("quizSubmission.finishedAt"),"sets temp finishedAt time"),equal(e.get("isActive"),!1)}),test("timed quizzes should stop counting at zero seconds left",function(){var e,i,s;return s=n(-2),e=n(0),i=t(s,void 0,2),i.set("endAt",e),sinon.spy(i,"startStopRunningTime"),i.updateRunningTime(),ok(!!i.get("quizSubmission.finishedAt"),"sets temp finishedAt time"),equal(i.get("quizSubmission.timeSpent"),120),equal(i.get("isActive"),!1)}),test("friendlySubmissionTime returns if there isnt a started submission",function(){var e,i;return i=n(-2),e=t(i),e.set("hasActiveSubmission",!1),ok(!e.get("friendlyTime"))}),test("friendlySubmissionTime returns the lesser of time limit, and time spent",function(){var e,i,s;return s=n(-2),i=t(s,void 0,2),i.set("hasActiveSubmission",!0),i.set("quizSubmission.timeSpent",180),e=i.get("friendlyTime"),equal(e,"02:00")}),test("calcRemainingSeconds uses endAt to determine when a submission should end",function(){var e,i,s,u;return s=n(-2),u=n(2),i=t(s),i.set("hasActiveSubmission",!0),i.set("quizSubmission.endAt",u),e=i.calcRemainingSeconds(),equal(e,120)}),test("isTimeExpired correctly determines if endAt has passed",function(){var e,i,s,u;return s=n(-3),u=n(-2),e=n(-1),i=t(s,u),i.set("hasActiveSubmission",!0),i.set("quizSubmission.endAt",e),ok(i.isTimeExpired())})})}).call(this);