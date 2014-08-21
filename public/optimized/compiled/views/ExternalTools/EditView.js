(function(){var t=function(t,r){return function(){return t.apply(r,arguments)}},r={}.hasOwnProperty,e=function(t,e){function o(){this.constructor=t}for(var n in e)r.call(e,n)&&(t[n]=e[n]);return o.prototype=e.prototype,t.prototype=new o,t.__super__=e.prototype,t};define(["i18n!external_tools","jquery","jst/ExternalTools/EditView","compiled/views/ValidatedFormView","compiled/jquery/fixDialogButtons"],function(r,o,n,i){var a,s;return a=function(i){function a(){return this.onSaveFail=t(this.onSaveFail,this),s=a.__super__.constructor.apply(this,arguments)}return e(a,i),a.prototype.template=n,a.prototype.tagName="form",a.prototype.id="external_tool_form",a.prototype.className="validated-form-view form-horizontal bootstrap-form",a.prototype.events={"change #external_tool_config_type":"onConfigTypeChange"},a.prototype.afterRender=function(){var t=this;return a.__super__.afterRender.apply(this,arguments),this.$el.dialog({title:r.t("dialog_title_edit_tool","Edit External Tool"),width:520,height:"auto",resizable:!0,close:function(){return t.$el.remove()},buttons:[{"class":"btn-primary",text:r.t("submit","Submit"),"data-text-while-loading":r.t("saving","Saving..."),click:function(){return t.submit()}}]}),this.onConfigTypeChange(),this.$el.submit(function(){return t.submit(),!1}),this},a.prototype.submit=function(){return this.$el.parent().find(".btn-primary").removeClass("ui-state-hover"),a.__super__.submit.apply(this,arguments)},a.prototype.onConfigTypeChange=function(){var t;return t=this.$("#external_tool_config_type").val(),this.$(".config_type").hide().attr("aria-expanded",!1),this.$(".config_type."+t).show().attr("aria-expanded",!0)},a.prototype.showErrors=function(t){var r,e,o,n,i,a;this.removeErrors(),a=[];for(o in t)e=t[o],r=this.findField(o),n=function(){var t,r,o;for(o=[],t=0,r=e.length;r>t;t++)i=e[t].message,o.push(this.translations[i]||i);return o}.call(this).join("</p><p>"),a.push(this.addError(r,n));return a},a.prototype.removeErrors=function(){return this.$(".error .help-inline").remove(),this.$(".control-group").removeClass("error"),this.$(".alert.alert-error").remove()},a.prototype.addError=function(t,r){return t=o(t),t.parents(".control-group").addClass("error"),t.after("<span class='help-inline'>"+r+"</span>"),t.one("keypress",function(){return o(this).parents(".control-group").removeClass("error"),o(this).parents(".control-group").find(".help-inline").remove()})},a.prototype.onSaveFail=function(){var t;return a.__super__.onSaveFail.apply(this,arguments),t=r.t("generic_error","There was an error in processing your request"),this.$el.prepend("<div class='alert alert-error'>"+t+"</span>")},a}(i)})}).call(this);