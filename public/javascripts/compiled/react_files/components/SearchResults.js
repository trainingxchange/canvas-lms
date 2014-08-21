(function() {
  define(['jquery', 'underscore', 'react', '../mixins/BackboneMixin', 'compiled/models/Folder', '../utils/withGlobalDom', 'compiled/util/deparam', './ColumnHeaders', './LoadingIndicator', './FolderChild', '../mixins/SortableMixin'], function($, _, React, BackboneMixin, Folder, withGlobalDom, deparam, ColumnHeaders, LoadingIndicator, FolderChild, SortableMixin) {
    var FolderChildren;

    return FolderChildren = React.createClass({
      mixins: [BackboneMixin('collection'), SortableMixin],
      componentWillMount: function() {
        this.props.collection.loadAll = true;
        return this.props.collection.fetch({
          data: {
            search_term: '.js'
          }
        });
      },
      render: withGlobalDom(function() {
        var _this = this;

        return div({
          className: 'ef-directory'
        }, ColumnHeaders({
          subject: this.props.collection
        }), this.props.collection.models.sort(Folder.prototype.childrenSorter.bind(this.props.collection)).map(function(child) {
          return FolderChild({
            key: child.cid,
            model: child,
            baseUrl: _this.props.baseUrl
          });
        }), LoadingIndicator({
          isLoading: this.props.collection.fetchingNextPage
        }));
      })
    });
  });

}).call(this);
