(function(){var t={}.hasOwnProperty,r=function(r,o){function e(){this.constructor=r}for(var n in o)t.call(o,n)&&(r[n]=o[n]);return e.prototype=o.prototype,r.prototype=new e,r.__super__=o.prototype,r};define(["jquery","underscore","Backbone","jst/roles/courseRoles"],function(t,o,e,n){var u,p;return u=function(t){function o(){return p=o.__super__.constructor.apply(this,arguments)}return r(o,t),o.prototype.template=n,o}(e.View)})}).call(this);