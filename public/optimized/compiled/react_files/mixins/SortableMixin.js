(function(){define(["jquery","compiled/util/deparam"],function(e,t){var r,o;return o=e.param,r={subject:function(){return this.props.model||this.props.collection},handleSortChange:function(){var e,r;return r=new URL(window.location),e=t(r.search.replace(/^\?/,"")),e.sort=this.subject().get("sort"),e.order=this.subject().get("order"),r.search=o(e),window.history.replaceState(null,null,r.toString())}},r.componentWillReceiveProps=r.componentWillMount=function(){var e;return e=t(window.location.search.replace(/^\?/,"")),"sort"in e&&this.subject().set("sort",e.sort),"order"in e&&this.subject().set("order",e.order),this.subject().on("change:sort change:order",this.handleSortChange,this)},r})}).call(this);