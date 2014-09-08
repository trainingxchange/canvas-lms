(function(){var e=function(e,t){return function(){return e.apply(t,arguments)}},t={}.hasOwnProperty,s=function(e,s){function i(){this.constructor=e}for(var o in s)t.call(s,o)&&(e[o]=s[o]);return i.prototype=s.prototype,e.prototype=new i,e.__super__=s.prototype,e};define(["i18n!context_modules","jquery","Backbone","compiled/collections/ModuleCollection","jst/modules/ProgressionStudentView","jst/modules/ProgressionModuleCollection","compiled/views/PaginatedCollectionView","compiled/views/modules/ProgressionModuleView"],function(t,i,o,n,r,u,l,c){var h,d;return h=function(t){function i(){return this.syncHeight=e(this.syncHeight,this),d=i.__super__.constructor.apply(this,arguments)}return s(i,t),i.prototype.tagName="li",i.prototype.className="student",i.prototype.template=r,i.prototype.events={click:"showProgressions"},i.prototype.initialize=function(){return i.__super__.initialize.apply(this,arguments),this.$index=this.model.collection.view.$el,this.$students=this.$index.find("#progression_students"),this.$modules=this.$index.find("#progression_modules")},i.prototype.afterRender=function(){return i.__super__.afterRender.apply(this,arguments),this.model.collection.currentStudentView||this.showProgressions(),this.syncHeight()},i.prototype.createProgressions=function(){var e,t,s;return t=this.model.get("id"),e=new n(null,{course_id:ENV.COURSE_ID,per_page:50,params:{student_id:t,include:["items"]}}),e.student_id=t,e.syncHeight=this.syncHeight,e.fetch(),s=""+ENV.COURSE_USERS_PATH+"/"+t,this.progressions=new l({collection:e,itemView:c,template:u,student:this.model.attributes,student_link:"<a href='"+s+"'>"+this.model.get("name")+"</a>"}),this.progressions.render(),this.progressions.$el.appendTo(this.$modules)},i.prototype.showProgressions=function(){var e;return this.$modules.attr("aria-busy","true"),null!=(e=this.model.collection.currentStudentView)&&e.hideProgressions(),this.model.collection.currentStudentView=this,this.syncHeight(),this.$el.addClass("active").attr("aria-selected",!0),this.progressions?this.progressions.show():this.createProgressions()},i.prototype.hideProgressions=function(){return this.progressions.hide(),this.$el.removeClass("active").removeAttr("aria-selected")},i.prototype.syncHeight=function(){var e=this;return setTimeout(function(){return e.$students.height(e.$modules.height()),e.$students.find(".collectionViewItems").height((e.$students.height()||0)-(e.$students.find(".header").height()||16)-16)},0)},i}(o.View)})}).call(this);