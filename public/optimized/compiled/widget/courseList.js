(function(){define(["jquery","compiled/widget/CustomList","jst/courseList/wrapper","jst/courseList/content","vendor/jquery.ba-tinypubsub"],function(e,n,t,u){var r;return r=e,{init:function(){return e(function(){var i,o,s,c;return i=e("#menu_enrollments"),o=i.closest(".menu-item-drop"),s=o.prev(".menu-item-title"),0!==i.length?(e.subscribe("menu/hovered",c=function(s){var l;if(r(s).find(i).find(".customListOpen").length)return e.unsubscribe("menu/hovered",c),l=!1,i.delegate(".customListOpen","click",function(){return l=!0}),e.getJSON("/all_menu_courses",function(e){var r;return r=new n("#menu_enrollments",e,{appendTarget:"#menu_enrollments .menu-item-customize",autoOpen:l,wrapper:t,content:u,onToggle:function(e){return o.toggleClass("menuCustomListEditing",e)}})})}),s.click(function(e){return e.metaKey||e.ctrlKey?void 0:(e.preventDefault(),s.focus())})):void 0})}}})}).call(this);