(function(){var t={}.hasOwnProperty,r=function(r,e){function o(){this.constructor=r}for(var n in e)t.call(e,n)&&(r[n]=e[n]);return o.prototype=e.prototype,r.prototype=new o,r.__super__=e.prototype,r};define(["jst/UserObservee","Backbone"],function(t,e){var o,n;return o=function(e){function o(){return n=o.__super__.constructor.apply(this,arguments)}return r(o,e),o.prototype.template=t,o.prototype.tagName="li",o}(e.View)})}).call(this);