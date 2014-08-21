(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var s in n)t.call(n,s)&&(e[s]=n[s]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};define(["jquery","underscore","i18n!calendar.edit","Backbone","jst/calendar/editCalendarEventFull","compiled/views/calendar/MissingDateDialogView","wikiSidebar","compiled/object/unflatten","tinymce.editor_box","compiled/tinymce"],function(t,i,s,r,o,a,l,d){var u,c;return u=function(r){function u(){return this.toggleUseSectionDates=e(this.toggleUseSectionDates,this),this.toggleUsingSectionClass=e(this.toggleUsingSectionClass,this),this.destroyModel=e(this.destroyModel,this),this.render=e(this.render,this),c=u.__super__.constructor.apply(this,arguments)}return n(u,r),u.prototype.el=t("#content"),u.prototype.template=o,u.prototype.events={"submit form":"submit","change #use_section_dates":"toggleUseSectionDates","click .delete_link":"destroyModel","click .switch_event_description_view":"toggleHtmlView"},u.prototype.initialize=function(){var e=this;return u.__super__.initialize.apply(this,arguments),this.model.fetch().done(function(){var t,n;return ENV.NEW_CALENDAR_EVENT_ATTRIBUTES&&(t=e.model.parse(ENV.NEW_CALENDAR_EVENT_ATTRIBUTES),t.all_day=!!(null!=(n=t.start_at)?n.equals(t.end_at):void 0)&&t.start_at.equals(t.start_at.clearTime()),e.model.set(t)),e.render()}),this.model.on("change:use_section_dates",this.toggleUsingSectionClass)},u.prototype.render=function(){var e;return u.__super__.render.apply(this,arguments),this.$(".date_field").date_field(),this.$(".time_field").time_field(),e=this.$("textarea").editorBox(),l.inited||l.init(),l.attachToEditor(e).show(),this},u.prototype.destroyModel=function(){var e,t=this;return e=s.t("confirm_delete_calendar_event","Are you sure you want to delete this calendar event?"),confirm(e)?this.$el.disableWhileLoading(this.model.destroy({success:function(){return t.redirectWithMessage(s.t("event_deleted","%{event_title} deleted successfully",{event_title:t.model.get("title")}))}})):void 0},u.prototype.toggleUsingSectionClass=function(){return this.$("#editCalendarEventFull").toggleClass("use_section_dates",this.model.get("use_section_dates")),t(".show_if_using_sections input").prop("disabled",!this.model.get("use_section_dates"))},u.prototype.toggleUseSectionDates=function(e){return this.model.set("use_section_dates",!this.model.get("use_section_dates")),this.updateRemoveChildEvents(e)},u.prototype.toggleHtmlView=function(e){return null!=e&&e.preventDefault(),t("textarea[name=description]").editorBox("toggle"),t(e.currentTarget).siblings("a").andSelf().toggle()},u.prototype.updateRemoveChildEvents=function(e){var n;return n=t(e.target).prop("checked")?"":"1",t("input[name=remove_child_events]").val(n)},u.prototype.redirectWithMessage=function(e){return t.flashMessage(e),this.model.get("return_to_url")?window.location=this.model.get("return_to_url"):void 0},u.prototype.submit=function(e){var n,r,o=this;return null!=e&&e.preventDefault(),r=d(this.$el.getFormData()),r.use_section_dates="1"===r.use_section_dates,i.each([r].concat(r.child_event_data),this.setStartEnd),"1"===r.remove_child_events&&delete r.child_event_data,t("#use_section_dates").prop("checked")&&(n=new a({validationFn:function(){var e;return e=t("[name*=start_date]:visible").filter(function(){return""===t(this).val()}),e.length>0?e:!0},labelFn:function(e){return t(e).parents("tr").prev().find("label").text()},success:function(e){return e.dialog("close"),o.$el.disableWhileLoading(o.model.save(r,{success:function(){return o.redirectWithMessage(s.t("event_saved","Event Saved Successfully"))}})),e.remove()}}),n.render())?void 0:this.saveEvent(r)},u.prototype.saveEvent=function(e){var t=this;return this.$el.disableWhileLoading(this.model.save(e,{success:function(){return t.redirectWithMessage(s.t("event_saved","Event Saved Successfully"))}}))},u.prototype.setStartEnd=function(e){return e?(e.start_at=t.unfudgeDateForProfileTimezone(Date.parse(e.start_date+" "+e.start_time)),e.end_at=t.unfudgeDateForProfileTimezone(Date.parse(e.start_date+" "+e.end_time))):void 0},u.type="event",u.title=function(){return u.__super__.constructor.title.call(this,"event","Event")},u}(r.View)})}).call(this);