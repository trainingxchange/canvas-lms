(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var i in n)e.call(n,i)&&(t[i]=n[i]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};define(["underscore","compiled/collections/PaginatedCollection"],function(e,r){var i,o;return i=function(r){function i(){return this.parse=t(this.parse,this),o=i.__super__.constructor.apply(this,arguments)}return n(i,r),i.prototype.url="/api/v1/calendar_events",i.prototype.initialize=function(t,e){return this.context_codes=t,this.type=null!=e?e:"event",i.__super__.initialize.apply(this,arguments)},i.prototype.fetch=function(t){var e,n,r,o;return null==t&&(t={}),null==(n=t.remove)&&(t.remove=!1),null==(r=t.data)&&(t.data={}),t.data.type=this.type,t.data.context_codes=this.context_codes,null==(o=(e=t.data).all_events)&&(e.all_events="1"),i.__super__.fetch.call(this,t)},i.prototype.parse=function(){var t,n,r;switch(t=this.type){case"assignment":n=function(t){var n,r;return t.related_id=t.id,n=!1,e.each(null!=(r=t.assignment_overrides)?r:[],function(e){return n?void 0:(t.id=""+t.id+"_override_"+e.id,n=!0)}),t};break;case"event":n=function(e){return e.related_id=e.id=""+t+"_"+e.id,e.parent_event_id&&(e.related_id=""+t+"_"+e.parent_event_id),e}}return r=[],e.each(i.__super__.parse.apply(this,arguments),function(t){return t.hidden?void 0:r.push(n(t))}),r},i}(r)})}).call(this);