(function(){var t=function(t,o){return function(){return t.apply(o,arguments)}},o={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var e in n)o.call(n,e)&&(t[e]=n[e]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t},r=[].indexOf||function(t){for(var o=0,n=this.length;n>o;o++)if(o in this&&this[o]===t)return o;return-1};define(["Backbone","jquery"],function(o,e){var i,l,u;return i=o.Model,l=function(o){function i(){return this.onPoll=t(this.onPoll,this),this.poll=t(this.poll,this),u=i.__super__.constructor.apply(this,arguments)}return n(i,o),i.prototype.defaults={completion:0,url:null,timeout:1e3},i.prototype.pollStates=["queued","running"],i.prototype.isPolling=function(){var t;return t=this.get("workflow_state"),r.call(this.pollStates,t)>=0},i.prototype.initialize=function(){var t=this;return this.pollDfd=new e.Deferred,this.on("change:url",function(){return t.isPolling()?t.poll():void 0}),e(window).on("beforeunload",function(){return clearTimeout(t.timeout)})},i.prototype.url=function(){return this.get("url")},i.prototype.poll=function(){var t=this;return this.fetch().then(this.onPoll,function(){return t.pollDfd.rejectWith(t,arguments)}),this.pollDfd},i.prototype.onPoll=function(){return this.isPolling()?this.timeout=setTimeout(this.poll,this.get("timeout")):(this.pollDfd.resolve(),this.trigger("complete"))},i}(i)})}).call(this);