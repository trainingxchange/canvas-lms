(function() {
  define(['i18n!react_files', 'react', 'compiled/util/friendlyBytes'], function(I18n, React, friendlyBytes) {
    var FilesUsage;

    return FilesUsage = React.createClass({
      propTypes: {
        contextType: React.PropTypes.oneOf(['users', 'groups', 'accounts', 'courses']).isRequired,
        contextId: React.PropTypes.number.isRequired
      },
      update: function() {
        var _this = this;

        return $.get("/api/v1/" + this.props.contextType + "/" + this.props.contextId + "/files/quota", function(data) {
          return _this.setState(data);
        });
      },
      componentDidMount: function() {
        this.update();
        return setInterval(this.update, 1000 * 60 * 5);
      },
      render: function() {
        var text, _ref, _ref1;

        text = I18n.t('usage_details', '%{quota_used} of %{quota}', {
          quota_used: friendlyBytes((_ref = this.state) != null ? _ref.quota_used : void 0),
          quota: friendlyBytes((_ref1 = this.state) != null ? _ref1.quota : void 0)
        });
        return React.DOM.div({
          className: "ef-folder-totals"
        }, text);
      }
    });
  });

}).call(this);
