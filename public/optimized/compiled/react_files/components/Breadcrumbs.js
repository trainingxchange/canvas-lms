(function(){define(["react","../utils/withGlobalDom"],function(e,r){var s;return s=e.createClass({propTypes:{folderPath:e.PropTypes.string.isRequired},getCrumbs:function(){var e,r,s,a,l,t,n,i;for(t=s=this.props.folderPath.split("/"),i=[],e=a=0,l=t.length;l>a;e=++a)r=t[e],i.push(0===e?{name:(null!=(n=this.props.currentFolder)?n.get("full_name"):void 0)||"Files",url:this.props.baseUrl,key:e}:{name:decodeURIComponent(r),url:this.props.baseUrl+"folder"+s.slice(0,+e+1||9e9).join("/"),last:e===s.length-1,key:e});return i},render:r(function(){return nav({"aria-label":"breadcrumbs",role:"navigation",className:"ef-breadcrumbs"},this.getCrumbs().map(function(e){return a({key:e.key,href:e.url,className:e.last?"active":void 0},span({className:"ellipsible"},e.name))}))})})})}).call(this);