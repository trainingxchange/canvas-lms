(function(){var t={}.hasOwnProperty,e=function(e,o){function n(){this.constructor=e}for(var s in o)t.call(o,s)&&(e[s]=o[s]);return n.prototype=o.prototype,e.prototype=new n,e.__super__=o.prototype,e};define(["Backbone","jquery","jst/accounts/admin_tools/AdminTools","jqueryui/tabs"],function(t,o,n){var s,r;return s=function(t){function o(){return r=o.__super__.constructor.apply(this,arguments)}return e(o,t),o.child("restoreContentPaneView","#restoreContentPane"),o.child("messageContentPaneView","#commMessagesPane"),o.child("loggingContentPaneView","#loggingPane"),o.optionProperty("tabs"),o.prototype.template=n,o.prototype.els={"#adminToolsTabs":"$adminToolsTabs"},o.prototype.afterRender=function(){return this.$adminToolsTabs.tabs()},o.prototype.toJSON=function(t){return t=o.__super__.toJSON.apply(this,arguments),t.courseRestore=this.tabs.courseRestore,t.viewMessages=this.tabs.viewMessages,t.logging=this.tabs.logging,t},o}(t.View)})}).call(this);