(function(){define(["ember","ember-qunit","ic-ajax","../../../../start_app","../../../../environment_setup","../../../../../controllers/quiz/statistics/summary/report_generator_controller","../../../../../models/quiz_report"],function(e,t,r,n){var o,s,i;return i=e.run,o=n(),t.setResolver(e.DefaultResolver.create({namespace:o})),s={id:1,"content-type":"text/csv",display_name:"CNVS-4338 Quiz Student Analysis Report.csv",filename:"quiz_student_analysis_report.csv",url:"/files/207/download?download_frd=1&verifier=ZoWW2Rut19EYVUnpaZngFadznCeu7uAWx8USvl8X",size:1807,created_at:"2014-05-08T05:56:42Z",updated_at:"2014-05-08T05:56:42Z",unlock_at:null,locked:!1,hidden:!1,lock_at:null,hidden_for_user:!1,thumbnail_url:null,locked_for_user:!1},t.moduleFor("controller:quiz_statistics_summary_report_generator","QuizStatisticsSummaryReportGeneratorController",{setup:function(){var r,s,u=this;return o=n(),t.setResolver(e.DefaultResolver.create({namespace:o})),r=o.__container__,s=r.lookup("store:main"),i(function(){return u.model=s.createRecord("quiz_report",{id:1,url:"/quiz_reports/1"}),u.subject=u.subject(),u.subject.set("model",u.model)})},teardown:function(){return r.raw.restore&&r.raw.restore(),i(o,"destroy")}}),t.test("sanity",function(){return ok(this.subject),equal(this.subject.get("model"),this.model)}),t.test("locking: it rejects calls to #generate when locked",function(){var t,n;return t=sinon.stub(r,"raw").returns(e.RSVP.defer().promise),n=sinon.spy(this.subject,"lock"),this.subject.send("generate"),ok(t.calledOnce),ok(n.calledOnce),ok(this.subject.get("isLocked")),this.subject.send("generate"),ok(t.calledOnce)}),t.test("locking: it unlocks once the generation is done, regardless of status",function(){var t,n,o;return o=e.RSVP.defer(),t=sinon.stub(r,"raw").returns(o.promise),n=sinon.spy(this.subject,"lock"),this.subject.send("generate"),ok(this.subject.get("isLocked")),i(function(){return o.reject()}),ok(!this.subject.get("isLocked"))}),t.test("#pullGeneratedReport: it reloads and auto-downloads",function(){var t,n=this;return expect(3),r.defineFixture("/quiz_reports/1?include[]=file",{textStatus:"success",response:{quiz_reports:[{id:1,file:s}]}}),t=sinon.stub(this.subject,"triggerDownload"),e.run(function(){return equal(n.model.get("file.id"),void 0),n.subject.autoDownload=!0,n.subject.pullGeneratedReport().then(function(){return equal(n.model.get("file.id"),1),ok(t.called,"it triggers the download")})})}),t.test("#pullGeneratedReport: it reloads but doesn't auto-download",function(){var t,n=this;return expect(3),r.defineFixture("/quiz_reports/1?include[]=file",{textStatus:"success",response:{quiz_reports:[{id:1,file:s}]}}),t=sinon.stub(this.subject,"triggerDownload"),e.run(function(){return equal(n.model.get("file.id"),void 0),n.subject.pullGeneratedReport().then(function(){return equal(n.model.get("file.id"),1),ok(!t.called,"it doesn't trigger the download")})})})})}).call(this);