(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,n=function(t,n){function r(){this.constructor=t}for(var s in n)e.call(n,s)&&(t[s]=n[s]);return r.prototype=n.prototype,t.prototype=new r,t.__super__=n.prototype,t};define(["Backbone","jst/content_migrations/subviews/OverwriteAssessmentContent"],function(e,r){var s,o;return s=function(e){function s(){return this.setAttribute=t(this.setAttribute,this),o=s.__super__.constructor.apply(this,arguments)}return n(s,e),s.prototype.template=r,s.prototype.events={"change #overwriteAssessmentContent":"setAttribute"},s.prototype.setAttribute=function(){var t;return t=this.model.get("settings")||{},t.overwrite_quizzes=!!this.$el.find("#overwriteAssessmentContent").is(":checked"),this.model.set("settings",t)},s}(e.View)})}).call(this);