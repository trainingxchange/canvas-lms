(function(){var t={}.hasOwnProperty,r=function(r,o){function n(){this.constructor=r}for(var e in o)t.call(o,e)&&(r[e]=o[e]);return n.prototype=o.prototype,r.prototype=new n,r.__super__=o.prototype,r};define(["underscore","Backbone"],function(t,o){var n,e,p,u,c,a;return u=t.extend,c=t.map,e=o.Collection,p=o.Model,n=function(t){function o(){return a=o.__super__.constructor.apply(this,arguments)}return r(o,t),o.prototype.model=p,o.prototype.comparator=function(t){return t.get("sortable_name")||t.get("name")},o.prototype.parse=function(t){return c(t,function(t){return u(t,{id:t.collaborator_id})})},o}(e)})}).call(this);