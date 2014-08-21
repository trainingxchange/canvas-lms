define('jst/ExternalTools/ExternalToolsCollectionView', ["compiled/handlebars_helpers"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['ExternalTools/ExternalToolsCollectionView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<table class=\"table table-striped\">\n  <thead>\n    <tr>\n      <th>Name</th>\n      <th colspan=\"2\">Extensions</th>\n    </tr>\n  </thead>\n  <tbody class=\"collectionViewItems\"></tbody>\n</table>\n<div class=\"paginatedLoadingIndicator\" style=\"display: none\"></div>\n";
  });
  
      
  return templates['ExternalTools/ExternalToolsCollectionView'];
});
