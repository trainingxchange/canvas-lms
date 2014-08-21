(function() {
  define(['react', '../utils/withGlobalDom'], function(React, withGlobalDom) {
    var Breadcrumbs;

    return Breadcrumbs = React.createClass({
      propTypes: {
        folderPath: React.PropTypes.string.isRequired
      },
      getCrumbs: function() {
        var i, segment, split, _i, _len, _ref, _ref1, _results;

        _ref = (split = this.props.folderPath.split('/'));
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          segment = _ref[i];
          if (i === 0) {
            _results.push({
              name: ((_ref1 = this.props.currentFolder) != null ? _ref1.get('full_name') : void 0) || 'Files',
              url: this.props.baseUrl,
              key: i
            });
          } else {
            _results.push({
              name: decodeURIComponent(segment),
              url: this.props.baseUrl + 'folder' + split.slice(0, +i + 1 || 9e9).join('/'),
              last: i === split.length - 1,
              key: i
            });
          }
        }
        return _results;
      },
      render: withGlobalDom(function() {
        return nav({
          'aria-label': 'breadcrumbs',
          role: 'navigation',
          className: 'ef-breadcrumbs'
        }, this.getCrumbs().map(function(crumb) {
          return a({
            key: crumb.key,
            href: crumb.url,
            className: (crumb.last ? 'active' : void 0)
          }, span({
            className: 'ellipsible'
          }, crumb.name));
        }));
      })
    });
  });

}).call(this);
