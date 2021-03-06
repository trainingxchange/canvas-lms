(function() {
  define(['compiled/editor/markScriptsLoaded', 'compiled/editor/stocktiny', 'tinymce/jscripts/tiny_mce/plugins/instructure_contextmenu/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_embed/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_image/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_equation/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_equella/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_external_tools/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_links/editor_plugin', 'tinymce/jscripts/tiny_mce/plugins/instructure_record/editor_plugin'], function(markScriptsLoaded, tinymce) {
    markScriptsLoaded(['plugins/instructure_contextmenu/editor_plugin', 'plugins/instructure_embed/editor_plugin', 'plugins/instructure_image/editor_plugin', 'plugins/instructure_equation/editor_plugin', 'plugins/instructure_equella/editor_plugin', 'plugins/instructure_external_tools/editor_plugin', 'plugins/instructure_links/editor_plugin', 'plugins/instructure_record/editor_plugin']);
    return tinymce;
  });

}).call(this);
