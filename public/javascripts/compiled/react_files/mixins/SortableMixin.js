(function() {
  define(['jquery', 'compiled/util/deparam'], function(_arg, deparam) {
    var SortableMixin, param;

    param = _arg.param;
    SortableMixin = {
      subject: function() {
        return this.props.model || this.props.collection;
      },
      handleSortChange: function() {
        var params, url;

        url = new URL(window.location);
        params = deparam(url.search.replace(/^\?/, ''));
        params.sort = this.subject().get('sort');
        params.order = this.subject().get('order');
        url.search = param(params);
        return window.history.replaceState(null, null, url.toString());
      }
    };
    SortableMixin.componentWillReceiveProps = SortableMixin.componentWillMount = function() {
      var queryParams;

      queryParams = deparam(window.location.search.replace(/^\?/, ''));
      if ('sort' in queryParams) {
        this.subject().set('sort', queryParams.sort);
      }
      if ('order' in queryParams) {
        this.subject().set('order', queryParams.order);
      }
      return this.subject().on('change:sort change:order', this.handleSortChange, this);
    };
    return SortableMixin;
  });

}).call(this);
