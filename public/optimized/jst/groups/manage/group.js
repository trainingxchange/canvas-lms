define('jst/groups/manage/group', ["compiled/handlebars_helpers","compiled/util/registerTemplateCss"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['groups/manage/group'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div data-view=\"groupDetail\" class=\"row-fluid\"></div>\n<div data-view=\"groupUsers\" class=\"group-users group-expanded-item\"></div>\n";
  });
  
      
arguments[1]('groups/manage/group', ".group-expanded .group-collapsed-item,.group-collapsed .group-expanded-item{display:none}.toggle-group>i{padding-right:0.5em}.toggle-group>i:before{font-size:1.25em}.group-summary{font-size:0.9em;color:#555}.action-darkgray{color:#666}.action-darkgray:hover{color:#333}.groups-list{padding-bottom:80px}.group{padding:1.5em 0;border-top:1px dashed #c2c8d0}.group:first-child{border-top-style:none}.group .row-fluid [class*=span]{min-height:0}.group .group-actions{text-align:right}.group .group-actions>a{margin-left:5%}.group .group-actions>*{text-align:left}.group .row-fluid{padding-bottom:1px}.group.droppable-hover{background-color:#dde0e4}.group .show-group-full{display:none}.group.slots-full .show-group-full{display:inline-block}.group-category-contents-condensed .group{padding:0.7em 1em}.no-results{background:#fff;border-color:#c1c7cf;border-radius:3px;border-style:dashed;border-width:1px;color:#878d92;margin:5px;padding:8px;text-align:center}\n");

  return templates['groups/manage/group'];
});
