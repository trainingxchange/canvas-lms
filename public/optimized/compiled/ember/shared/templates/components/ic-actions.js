define(["ember","compiled/ember/shared/helpers/common"],function(e){e.TEMPLATES["components/ic-actions"]=e.Handlebars.template(function(s,t,n,a,h){function r(e,s){var t,a,h,r="";return s.buffer.push("\n  "),a=n["ic-menu-trigger"]||e&&e["ic-menu-trigger"],h={hash:{title:"title"},hashTypes:{title:"ID"},hashContexts:{title:e},inverse:f.noop,fn:f.program(2,i,s),contexts:[],types:[],data:s},t=a?a.call(e,h):m.call(e,"ic-menu-trigger",h),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n  "),h={hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(4,p,s),contexts:[],types:[],data:s},(a=n["ic-menu-list"])?t=a.call(e,h):(a=e&&e["ic-menu-list"],t=typeof a===b?a.call(e,h):a),n["ic-menu-list"]||(t=y.call(e,"ic-menu-list",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(4,p,s),contexts:[],types:[],data:s})),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n"),r}function i(e,s){var t,a="";return s.buffer.push('<i class="icon-settings"><span class="screenreader-only">'),t=n._triageMustache.call(e,"title",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</span></i>"),a}function p(e,s){var t,a="";return s.buffer.push("\n    "),t=n._triageMustache.call(e,"yield",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n  "),a}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,e.Handlebars.helpers),h=h||{};var u,o,c,l="",f=this,m=n.helperMissing,b="function",y=n.blockHelperMissing;return c={hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(1,r,h),contexts:[],types:[],data:h},(o=n["ic-menu"])?u=o.call(t,c):(o=t&&t["ic-menu"],u=typeof o===b?o.call(t,c):o),n["ic-menu"]||(u=y.call(t,"ic-menu",{hash:{},hashTypes:{},hashContexts:{},inverse:f.noop,fn:f.program(1,r,h),contexts:[],types:[],data:h})),(u||0===u)&&h.buffer.push(u),h.buffer.push("\n\n"),l})});