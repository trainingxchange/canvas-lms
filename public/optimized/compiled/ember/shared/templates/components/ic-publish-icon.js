define(["ember","compiled/ember/shared/helpers/common"],function(s){s.TEMPLATES["components/ic-publish-icon"]=s.Handlebars.template(function(e,a,t,h,n){this.compilerInfo=[4,">= 1.0.0"],t=this.merge(t,s.Handlebars.helpers),n=n||{};var l,p="",r=this.escapeExpression;return n.buffer.push("<i "),n.buffer.push(r(t["bind-attr"].call(a,{hash:{"class":"iconClass"},hashTypes:{"class":"STRING"},hashContexts:{"class":a},contexts:[],types:[],data:n}))),n.buffer.push('></i>\n<span class="publish-text" tabindex="-1">'),l=t._triageMustache.call(a,"text",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:n}),(l||0===l)&&n.buffer.push(l),n.buffer.push('</span>\n<span class="screenreader-only accessible_label">'),l=t._triageMustache.call(a,"aria-label",{hash:{},hashTypes:{},hashContexts:{},contexts:[a],types:["ID"],data:n}),(l||0===l)&&n.buffer.push(l),n.buffer.push("</span>\n"),p})});