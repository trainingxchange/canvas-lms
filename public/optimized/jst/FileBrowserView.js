define('jst/FileBrowserView', ["compiled/handlebars_helpers","compiled/util/registerTemplateCss","i18n!file_browser_view"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['FileBrowserView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing;


  buffer += "<ul role=\"tree\" tabindex=\"0\" activedescendent=\"\" class=\"folderTree\"\n  aria-label=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("file_browser_view")
  },data:data},helper ? helper.call(depth0, "folder_tree_instructions", "Use the up and down arrow keys to navigate through the tree. Press right to expand folders, left to collapse, and enter to choose an image.", options) : helperMissing.call(depth0, "t", "folder_tree_instructions", "Use the up and down arrow keys to navigate through the tree. Press right to expand folders, left to collapse, and enter to choose an image.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"\n></ul>";
  return buffer;
  });
  
      
arguments[1]('FileBrowserView', ".folderTree,.folderTree ul{margin:0;padding:0;list-style:none}.folderTree li,.folderTree ul li{margin:0;padding:0}.folderTree ul{margin-left:8px}.folderTree li a{padding:1px 7px 1px 35px;display:block;background:url(/images/inst_tree/file_types/page_white.png) no-repeat 13px 3px;position:relative}.folderTree li a.folderLabel{background-image:url(/images/inst_tree/folder.png)}.folderTree li a.folderLabel:before{position:absolute;top:5px;left:4px;border:solid transparent;border-width:5px;border-left-color:#525252;content:''}.folderTree li a.folderLabel.expanded:before{left:0;top:7px;border-left-color:transparent;border-top-color:#525252}.folderTree li a.active{background-color:#d6ecfc}.folderTree .preview-thumbnail{margin-left:-23px;max-width:200px;height:30px;vertical-align:middle}\n");

  return templates['FileBrowserView'];
});
