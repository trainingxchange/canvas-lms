(function(){var t={}.hasOwnProperty,r=function(r,e){function n(){this.constructor=r}for(var o in e)t.call(e,o)&&(r[o]=e[o]);return n.prototype=e.prototype,r.prototype=new n,r.__super__=e.prototype,r};define(["Backbone"],function(t){var e,n;return e=function(t){function e(){return n=e.__super__.constructor.apply(this,arguments)}return r(e,t),e.prototype.name=function(){return this.get("title")},e.prototype.isAbbreviated=function(){return!this.has("description")},e.prototype.setUrlTo=function(t){return this.url=function(){switch(t){case"add":return this.get("parent_outcome_group").subgroups_url;case"edit":case"delete":return this.get("url")}}.call(this)},e}(t.Model)})}).call(this);