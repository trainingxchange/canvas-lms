(function(){var t={}.hasOwnProperty,e=function(e,r){function o(){this.constructor=e}for(var n in r)t.call(r,n)&&(e[n]=r[n]);return o.prototype=r.prototype,e.prototype=new o,e.__super__=r.prototype,e};define(["compiled/collections/GroupUserCollection","compiled/models/GroupUser"],function(t){var r,o;return r=function(t){function r(){return o=r.__super__.constructor.apply(this,arguments)}return e(r,t),r.prototype.url=function(){var t;return t="/api/v1/group_categories/"+this.category.id+"/users?per_page=50",this.category.get("allows_multiple_memberships")||(t+="&unassigned=true"),this.url=t},r.prototype.membershipsLocked=function(){return this.category.get("allows_multiple_memberships")},r.prototype.increment=function(t){return this.category.increment("unassigned_users_count",t)},r}(t)})}).call(this);