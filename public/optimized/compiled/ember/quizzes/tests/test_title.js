(function(){define(["ember"],function(){return function(t){return test("updates document.title for "+t.path+" correctly",function(){return visit(t.path),andThen(function(){return equal(document.title,t.title)})})}})}).call(this);