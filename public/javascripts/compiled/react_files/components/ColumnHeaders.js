(function() {
  define(['react', '../utils/withGlobalDom', 'compiled/fn/preventDefault'], function(React, withGlobalDom, preventDefault) {
    var ColumnHeaders, columns;

    columns = [
      {
        displayName: 'Name',
        property: 'name',
        className: 'ef-name-col'
      }, {
        displayName: 'Date Modified',
        property: 'updated_at',
        className: 'ef-date-modified-col'
      }, {
        displayName: 'Modified By',
        className: 'ef-modified-by-col',
        property: 'user'
      }, {
        displayName: 'Size',
        property: 'size',
        className: 'ef-size-col'
      }
    ];
    return ColumnHeaders = React.createClass({
      makeSorter: function(property) {
        var _this = this;

        return preventDefault(function(event) {
          return _this.props.subject.set({
            sort: property,
            order: (_this.props.subject.get('sort') === property) && (_this.props.subject.get('order') === 'asc') ? 'desc' : 'asc'
          });
        });
      },
      render: withGlobalDom(function() {
        var _this = this;

        return div({
          className: 'ef-directory'
        }, header({
          className: 'ef-directory-header'
        }, columns.map(function(column) {
          var isSortedCol;

          isSortedCol = _this.props.subject.get('sort') === column.property;
          return div({
            key: column.property,
            className: "" + column.className + " " + (isSortedCol ? 'current-filter' : void 0)
          }, a({
            onClick: _this.makeSorter(column.property)
          }, column.displayName, isSortedCol && _this.props.subject.get('order') === 'asc' ? i({
            className: 'icon-arrow-up'
          }) : void 0, isSortedCol && _this.props.subject.get('order') === 'desc' ? i({
            className: 'icon-arrow-down'
          }) : void 0));
        }), div({
          className: 'ef-links-col'
        })));
      })
    });
  });

}).call(this);
