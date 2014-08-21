(function() {
  define(['jquery', 'underscore', 'react', '../mixins/BackboneMixin', '../utils/withGlobalDom', 'compiled/util/deparam', './ColumnHeaders', './LoadingIndicator', './FolderChild', '../mixins/SortableMixin'], function($, _, React, BackboneMixin, withGlobalDom, deparam, ColumnHeaders, LoadingIndicator, FolderChild, SortableMixin) {
    var FolderChildren;

    return FolderChildren = React.createClass({
      mixins: [BackboneMixin('model'), SortableMixin],
      registerListeners: function() {
        var debouncedForceUpdate;

        debouncedForceUpdate = _.debounce(this.forceUpdate.bind(this, null), 0);
        this.props.model.folders.on('all', debouncedForceUpdate, this);
        return this.props.model.files.on('all', debouncedForceUpdate, this);
      },
      componentWillReceiveProps: function() {
        return this.registerListeners();
      },
      componentWillMount: function() {
        this.registerListeners();
        return this.props.model.loadAll();
      },
      render: withGlobalDom(function() {
        var _this = this;

        return div({
          className: 'ef-directory'
        }, ColumnHeaders({
          subject: this.props.model
        }), this.props.model.children().map(function(child) {
          return FolderChild({
            key: child.cid,
            model: child,
            baseUrl: _this.props.baseUrl
          });
        }), LoadingIndicator({
          isLoading: this.props.model.folders.fetchingNextPage || this.props.model.files.fetchingNextPage
        }));
      })
    });
  });

}).call(this);
