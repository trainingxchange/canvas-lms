(function(){var t={}.hasOwnProperty,o=function(o,r){function n(){this.constructor=o}for(var e in r)t.call(r,e)&&(o[e]=r[e]);return n.prototype=r.prototype,o.prototype=new n,o.__super__=r.prototype,o};define(["Backbone","compiled/models/ExternalFeed","compiled/str/splitAssetString"],function(t,r){var n,e;return n=function(t){function n(){return e=n.__super__.constructor.apply(this,arguments)}return o(n,t),n.prototype.model=r,n}(t.Collection)})}).call(this);