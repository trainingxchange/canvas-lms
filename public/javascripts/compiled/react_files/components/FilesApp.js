(function() {
  define(['underscore', 'react', '../utils/withGlobalDom', 'compiled/models/Folder', './Toolbar', './Breadcrumbs', './FolderTree', './FilesUsage', './FolderChildren', './SearchResults'], function(_, React, withGlobalDom, Folder, Toolbar, Breadcrumbs, FolderTree, FilesUsage, FolderChildren, SearchResults) {
    var FilesApp;

    return FilesApp = React.createClass({
      propTypes: {
        currentFolder: React.PropTypes.instanceOf(Folder).isRequired
      },
      render: withGlobalDom(function() {
        return div(null, Toolbar({
          baseUrl: this.props.baseUrl
        }), (this.props.showBreadcrumb ? Breadcrumbs({
          baseUrl: this.props.baseUrl,
          folderPath: this.props.folderPath
        }) : void 0), div({
          className: 'ef-main'
        }, aside({
          className: 'visible-desktop ef-folder-content'
        }, FolderTree(), FilesUsage({
          contextType: this.props.contextType,
          contextId: this.props.contextId
        })), this.props.currentFolder ? FolderChildren({
          model: this.props.currentFolder,
          baseUrl: this.props.baseUrl
        }) : SearchResults({
          collection: this.props.searchResults
        })));
      })
    });
  });

}).call(this);
