(function(){define(["../../shared/search_matcher"],function(t){return module("search_matcher",{setup:function(){return this.target="One two three four"}}),test("ignores case by default",function(){return equal(t(this.target,"one"),!0)}),test("considers case when asked to",function(){return equal(t(this.target,"one",!1),!1)}),test("finds multiples",function(){return equal(t(this.target,"one three"),!0)}),test("finds multiples out of order",function(){return equal(t(this.target,"four three"),!0)})})}).call(this);