(function(){var t={}.hasOwnProperty,e=function(e,o){function n(){this.constructor=e}for(var r in o)t.call(o,r)&&(e[r]=o[r]);return n.prototype=o.prototype,e.prototype=new n,e.__super__=o.prototype,e};define(["Backbone","jst/conversations/contextMessage"],function(t,o){var n,r,s;return r=t.View,n=function(t){function n(){return s=n.__super__.constructor.apply(this,arguments)}return e(n,t),n.prototype.tagName="li",n.prototype.template=o,n.prototype.events={"click a.context-more":"toggle","click a.delete-btn":"remove"},n.prototype.initialize=function(){return n.__super__.initialize.apply(this,arguments),this.model.set({isCondensable:this.model.get("body").length>180}),this.model.set({isCondensed:!0})},n.prototype.toJSON=function(){var t;return t=n.__super__.toJSON.apply(this,arguments),t.isCondensable&&t.isCondensed&&(t.body=t.body.substr(0,180).replace(/\W\w*$/,"")),t},n.prototype.toggle=function(t){return t.preventDefault(),this.model.set({isCondensed:!this.model.get("isCondensed")}),this.render(),this.$("a").focus()},n}(r)})}).call(this);