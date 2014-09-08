(function(){var t={}.hasOwnProperty,e=function(e,r){function o(){this.constructor=e}for(var s in r)t.call(r,s)&&(e[s]=r[s]);return o.prototype=r.prototype,e.prototype=new o,e.__super__=r.prototype,e};define(["Backbone","jquery","i18n!external_tools","str/htmlEscape","jst/ExternalTools/RateToolView","compiled/models/AppReview"],function(t,r,o,s,a){var i,n;return i=function(t){function i(){return n=i.__super__.constructor.apply(this,arguments)}return e(i,t),i.prototype.template=a,i.prototype.tagName="form",i.prototype.id="rate_app_form",i.prototype.els={"#rate-app-star":"$rateAppStar",'textarea[name="review_text"]':"$reviewText"},i.prototype.afterRender=function(){var t=this;return this.$reviewText.html(this.model.get("comments")),this.$rateAppStar.raty({path:"/images/raty/",size:24,starOff:"star-off-big.png",starOn:"star-on-big.png",score:this.model.get("rating"),click:function(){return r(".alert-error").remove()}}),this.$el.dialog({title:o.t("dialog_title_rate_tool","How do you rate this tool?"),width:520,height:"auto",resizable:!0,close:function(){return t.$el.remove()},buttons:[{text:o.t("buttons.cancel","Cancel"),click:function(){return r(this).dialog("close")}},{"class":"btn-primary",text:o.t("submit","Submit"),"data-text-while-loading":o.t("saving","Saving..."),click:function(){return t.submit()}}]}),this.$el.submit(function(){return t.submit(),!1}),this},i.prototype.submit=function(){return r(".alert-error").remove(),this.$rateAppStar.raty("score")?(this.model.save({id:void 0,rating:this.$rateAppStar.raty("score"),comments:this.$reviewText.val()},{success:function(t,e){return"error"===e.type&&r.flashError(s(o.t("save_failed","Unable to save review: %{message}",{message:e.message}))),t.trigger("sync")}}),this.$el.dialog("close")):this.showErrorMessage()},i.prototype.showErrorMessage=function(){var t;return t=o.t("missing_stars","You must select a star rating"),this.$el.prepend("<div class='alert alert-error'>"+t+"</span>")},i}(t.View)})}).call(this);