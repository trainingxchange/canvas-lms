(function(){var t={}.hasOwnProperty,e=function(e,o){function i(){this.constructor=e}for(var r in o)t.call(o,r)&&(e[r]=o[r]);return i.prototype=o.prototype,e.prototype=new i,e.__super__=o.prototype,e};define(["underscore","i18n!groups","compiled/views/DialogFormView","jst/EmptyDialogFormWrapper","jst/groups/manage/groupCategoryEdit","str/htmlEscape"],function(t,o,i,r,p,n){var s,l;return s=function(s){function u(){return l=u.__super__.constructor.apply(this,arguments)}return e(u,s),u.prototype.template=p,u.prototype.wrapperTemplate=r,u.prototype.className="form-dialog group-category-edit",u.prototype.defaults={width:500,height:ENV.allow_self_signup?360:210,title:o.t("edit_group_set","Edit Group Set"),fixDialogButtons:!1},u.prototype.els={".self-signup-help":"$selfSignupHelp",".self-signup-description":"$selfSignup",".self-signup-toggle":"$selfSignupToggle",".self-signup-controls":"$selfSignupControls"},u.prototype.events=t.extend({},i.prototype.events,{"click .dialog_closer":"close","click .self-signup-toggle":"toggleSelfSignup"}),u.prototype.afterRender=function(){return this.toggleSelfSignup()},u.prototype.openAgain=function(){return u.__super__.openAgain.apply(this,arguments),this.render(),this.$("input:first").focus()},u.prototype.toggleSelfSignup=function(){var t;return t=!this.$selfSignupToggle.prop("checked"),this.$selfSignupControls.css({opacity:t?.5:1}),this.$selfSignupControls.find(":input").prop("disabled",t)},u.prototype.validateFormData=function(){return this.$("[name=group_limit]")[0].validity.valid?void 0:{group_limit:[{message:o.t("group_limit_number","Group limit must be a number")}]}},u.prototype.toJSON=function(){var e,o;return e=this.model.present(),t.extend({},{ENV:ENV},e,{enable_self_signup:e.self_signup,restrict_self_signup:"restricted"===e.self_signup,group_limit:'<input name="group_limit"\n       type="number"\n       min="2"\n       class="input-micro"\n       value="'+n(null!=(o=e.group_limit)?o:"")+'">'})},u}(i)})}).call(this);