(function(){var e=function(e,r){return function(){return e.apply(r,arguments)}},r={}.hasOwnProperty,t=function(e,t){function o(){this.constructor=e}for(var n in t)r.call(t,n)&&(e[n]=t[n]);return o.prototype=t.prototype,e.prototype=new o,e.__super__=t.prototype,e};define(["Backbone","jquery","jst/accounts/admin_tools/CourseSearchForm","i18n!course_search","jquery.instructure_forms"],function(r,o,n,i){var s,a;return s=function(r){function s(){return this.enableSearchForm=e(this.enableSearchForm,this),this.disableSearchForm=e(this.disableSearchForm,this),a=s.__super__.constructor.apply(this,arguments)}return t(s,r),s.prototype.tagName="form",s.prototype.template=n,s.prototype.events={submit:"search"},s.prototype.els={"#courseSearchField":"$courseSearchField"},s.prototype.afterRender=function(){return this.model.on("restoring",this.disableSearchForm),this.model.on("doneRestoring",this.enableSearchForm)},s.prototype.search=function(e){var r,t;return e.preventDefault(),t=o.trim(this.$courseSearchField.val()),""===t?this.$courseSearchField.errorBox(i.t("cant_be_blank","Can't be blank")):(r=this.model.search(o.trim(t)),this.$el.disableWhileLoading(r))},s.prototype.disableSearchForm=function(){return this.$el.find(":input").prop("disabled",!0)},s.prototype.enableSearchForm=function(){return this.$el.find(":input").prop("disabled",!1)},s.prototype.toJSON=function(e){return e=s.__super__.toJSON.apply(this,arguments),e.formDisabled=this.disabled,e},s}(r.View)})}).call(this);