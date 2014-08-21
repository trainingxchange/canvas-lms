(function() {
  define(['react', '../utils/withGlobalDom'], function(React, withGlobalDom) {
    var PushStateLink;

    return PushStateLink = React.createClass({
      handleClick: function(event) {
        event.preventDefault();
        return window.history.replaceState(null, null, this.props.href);
      },
      render: function() {
        return this.transferPropsTo(React.DOM.a({
          onClick: this.handleClick
        }, this.props.children));
      }
    });
  });

}).call(this);
