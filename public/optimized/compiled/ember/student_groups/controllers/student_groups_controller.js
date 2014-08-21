(function(){define(["i18n!student_groups","ember"],function(e,r){var t;return t=r.ObjectController.extend({filterText:"",content:r.Object.create(),searchPlaceholder:function(){return e.t("search_groups_placeholder","Search Groups or People")}.property(),searchAriaLabel:function(){return e.t("student_groups_filter_description","As you type in this field, the list of groups will be automatically filtered to only include those whose names match your input.")}.property(),usersPath:"/courses/"+ENV.course_id+"/users",groupsUrl:"/api/v1/courses/"+ENV.course_id+"/groups?include[]=users&include[]=group_category",sortedGroups:function(){var e,r;return e=this.get("groups")||[],r=this.get("filterText").toLowerCase(),e=e.filter(function(e){return 0===r.length||e.name.toLowerCase().indexOf(r)>=0||e.users.find(function(e){return e.display_name&&e.display_name.toLowerCase().indexOf(r)>=0||e.name&&e.name.toLowerCase().indexOf(r)>=0})}),e.sortBy("group_category_id")}.property("groups.[]","filterText"),removeFromCategory:function(e){return this.groupsForCategory(e).forEach(function(e){var r;return r=e.users.findBy("id",ENV.current_user_id),r?e.users.removeObject(r):void 0})},groupsForCategory:function(e){return this.get("groups").filterBy("group_category_id",e)},isMemberOfCategory:function(e){return this.groupsForCategory(e).any(function(e){return e.users.findBy("id",ENV.current_user_id)})}})})}).call(this);