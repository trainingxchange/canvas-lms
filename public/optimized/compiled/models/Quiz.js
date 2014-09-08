(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e={}.hasOwnProperty,i=function(t,i){function s(){this.constructor=t}for(var n in i)e.call(i,n)&&(t[n]=i[n]);return s.prototype=i.prototype,t.prototype=new s,t.__super__=i.prototype,t};define(["jquery","underscore","Backbone","compiled/models/Assignment","compiled/models/DateGroup","compiled/collections/AssignmentOverrideCollection","compiled/collections/DateGroupCollection","str/pluralize","i18n!quizzes","jquery.ajaxJSON","jquery.instructure_misc_helpers"],function(e,s,n,u,o,l,r,h,a){var p,c;return p=function(n){function h(){return this.toView=t(this.toView,this),this.singleSectionDueDate=t(this.singleSectionDueDate,this),this.allDates=t(this.allDates,this),this.multipleDueDates=t(this.multipleDueDates,this),this.defaultDates=t(this.defaultDates,this),this.htmlUrl=t(this.htmlUrl,this),this.lockAt=t(this.lockAt,this),this.unlockAt=t(this.unlockAt,this),this.dueAt=t(this.dueAt,this),this.unpublish=t(this.unpublish,this),this.publish=t(this.publish,this),c=h.__super__.constructor.apply(this,arguments)}return i(h,n),h.prototype.resourceName="quizzes",h.prototype.defaults={due_at:null,unlock_at:null,lock_at:null,unpublishable:!0,points_possible:null},h.prototype.initialize=function(t,e){return null==e&&(e={}),h.__super__.initialize.apply(this,arguments),this.initAssignment(),this.initAssignmentOverrides(),this.initUrls(),this.initTitleLabel(),this.initUnpublishable(),this.initQuestionsCount(),this.initPointsCount(),this.initAllDates()},h.prototype.initAssignment=function(){return this.attributes.assignment?this.set("assignment",new u(this.attributes.assignment)):void 0},h.prototype.initAssignmentOverrides=function(){var t;return this.attributes.assignment_overrides?(t=new l(this.attributes.assignment_overrides),this.set("assignment_overrides",t,{silent:!0})):void 0},h.prototype.initUrls=function(){return this.get("html_url")?(this.set("base_url",this.get("html_url").replace(/quizzes\/\d+/,"quizzes")),this.set("url",""+this.get("base_url")+"/"+this.get("id")),this.set("edit_url",""+this.get("base_url")+"/"+this.get("id")+"/edit"),this.set("publish_url",""+this.get("base_url")+"/publish"),this.set("unpublish_url",""+this.get("base_url")+"/unpublish")):void 0},h.prototype.initTitleLabel=function(){return this.set("title_label",this.get("title")||this.get("readable_type"))},h.prototype.initUnpublishable=function(){return this.get("can_unpublish")===!1&&this.get("published")?this.set("unpublishable",!1):void 0},h.prototype.initQuestionsCount=function(){var t;return t=this.get("question_count"),this.set("question_count_label",a.t("question_count","Question",{count:t}))},h.prototype.initPointsCount=function(){var t,e;return t=this.get("points_possible"),e="",t&&t>0&&(e=a.t("assignment_points_possible","pt",{count:t})),this.set("possible_points_label",e)},h.prototype.initAllDates=function(){var t;return null!=(t=this.get("all_dates"))?this.set("all_dates",new r(t)):void 0},h.prototype.publish=function(){return this.set("published",!0),e.ajaxJSON(this.get("publish_url"),"POST",{quizzes:[this.get("id")]})},h.prototype.unpublish=function(){return this.set("published",!1),e.ajaxJSON(this.get("unpublish_url"),"POST",{quizzes:[this.get("id")]})},h.prototype.disabledMessage=function(){return a.t("cant_unpublish_when_students_submit","Can't unpublish if there are student submissions")},h.prototype.dueAt=function(t){return arguments.length>0?this.set("due_at",t):this.get("due_at")},h.prototype.unlockAt=function(t){return arguments.length>0?this.set("unlock_at",t):this.get("unlock_at")},h.prototype.lockAt=function(t){return arguments.length>0?this.set("lock_at",t):this.get("lock_at")},h.prototype.htmlUrl=function(){return this.get("url")},h.prototype.defaultDates=function(){var t;return t=new o({due_at:this.get("due_at"),unlock_at:this.get("unlock_at"),lock_at:this.get("lock_at")})},h.prototype.multipleDueDates=function(){var t;return t=this.get("all_dates"),t&&t.length>1},h.prototype.allDates=function(){var t,e,i;return t=this.get("all_dates"),e=t&&t.models||[],i=s.map(e,function(t){return t.toJSON()})},h.prototype.singleSectionDueDate=function(){var t;return(null!=(t=s.find(this.allDates(),"dueAt"))?t.dueAt.toISOString():void 0)||this.dueAt()},h.prototype.isOnlyVisibleToOverrides=function(t){return arguments.length>0?this.set("only_visible_to_overrides",t):this.get("only_visible_to_overrides")||!1},h.prototype.toView=function(){var t,e,i,s,n;for(e=["htmlUrl","multipleDueDates","allDates","dueAt","lockAt","unlockAt","singleSectionDueDate"],i={id:this.get("id")},s=0,n=e.length;n>s;s++)t=e[s],i[t]=this[t]();return i},h}(n.Model)})}).call(this);