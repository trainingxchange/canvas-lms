(function(){define(["i18n!react_files","react","compiled/util/friendlyBytes"],function(t,e,s){var u;return u=e.createClass({propTypes:{contextType:e.PropTypes.oneOf(["users","groups","accounts","courses"]).isRequired,contextId:e.PropTypes.number.isRequired},update:function(){var t=this;return $.get("/api/v1/"+this.props.contextType+"/"+this.props.contextId+"/files/quota",function(e){return t.setState(e)})},componentDidMount:function(){return this.update(),setInterval(this.update,3e5)},render:function(){var u,o,n;return u=t.t("usage_details","%{quota_used} of %{quota}",{quota_used:s(null!=(o=this.state)?o.quota_used:void 0),quota:s(null!=(n=this.state)?n.quota:void 0)}),e.DOM.div({className:"ef-folder-totals"},u)}})})}).call(this);