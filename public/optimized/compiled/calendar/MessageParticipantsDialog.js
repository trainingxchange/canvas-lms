(function(){var t=function(t,s){return function(){return t.apply(s,arguments)}};define(["jquery","underscore","i18n!calendar","jst/calendar/messageParticipants","jst/calendar/recipientList"],function(s,e,i,n,r){var a;return a=function(){function a(i){var a;this.opts=i,this.messageFailed=t(this.messageFailed,this),this.messageSent=t(this.messageSent,this),this.sendMessage=t(this.sendMessage,this),this.loadParticipants=t(this.loadParticipants,this),this.opts.timeslot?(this.recipients=e(this.opts.timeslot.child_events).map(function(t){return t.user||t.group}),a=void 0===this.recipients[0].short_name?"Group":"User",this.$form=s(n({participant_type:a})),this.$form.find("select.message_groups").remove()):(this.group=this.opts.group,this.$form=s(n({participant_type:this.group.participant_type})),this.dataSource=this.opts.dataSource,this.$select=this.$form.find("select.message_groups").change(this.loadParticipants).val("unregistered")),this.$form.submit(this.sendMessage),this.$participantList=this.$form.find("ul"),this.recipients&&this.$participantList.html(r({recipientType:a,recipients:this.recipients}))}return a.prototype.show=function(){return this.$form.dialog({width:400,resizable:!1,buttons:[{text:i.t("buttons.cancel","Cancel"),click:function(){return s(this).dialog("close")}},{text:i.t("buttons.send_message","Send"),"data-text-while-loading":i.t("buttons.sending_message","Sending..."),"class":"btn-primary",click:function(){return s(this).submit()}}],close:function(){return s(this).remove()}}),this.loadParticipants()},a.prototype.participantStatus=function(t){var e;return null==t&&(t=null),e=s('<li class="status" />'),this.$participantList.html(e),t?e.text(t):e.spin()},a.prototype.loadParticipants=function(){var t,s=this;if(!this.recipients)return t=this.$select.val(),this.loading=!0,this.participantStatus(),this.dataSource.getParticipants(this.group,t,function(t){var e;return delete s.loading,t.length?s.$participantList.html(r({recipientType:s.group.participant_type,recipients:t})):(e="Group"===s.group.participant_type?i.t("no_groups","No groups found"):i.t("no_users","No users found"),s.participantStatus(e))})},a.prototype.sendMessage=function(t){var e,i;return t.preventDefault(),!this.loading&&(e=this.$form.getFormData(),e["recipients[]"]&&e.body)?(i=s.ajaxJSON("/conversations","POST",e,this.messageSent,this.messageFailed),this.$form.disableWhileLoading(i,{buttons:["[data-text-while-loading] .ui-button-text"]})):void 0},a.prototype.messageSent=function(){return this.$form.dialog("close"),s.flashMessage(i.t("messages_sent","Messages Sent"))},a.prototype.messageFailed=function(){return this.$form.find(".error").text(i.t("errors.send_message_failed","There was an error sending your message, please try again"))},a}()})}).call(this);