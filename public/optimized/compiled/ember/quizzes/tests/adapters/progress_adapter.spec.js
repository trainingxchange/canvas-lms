(function(){define(["ember","../start_app","../environment_setup","../shared_ajax_fixtures","../../adapters/progress_adapter"],function(r,e,t,n){var u,a;return u=null,a=null,module("Quiz Report Adapter",{setup:function(){return u=e(),n.create(),a=u.__container__.lookup("adapter:progress")},teardown:function(){return r.run(u,"destroy")}}),test("it builds the proper URL",function(){return strictEqual(a.buildURL("progress",1),"/api/v1/progress/1")})})}).call(this);