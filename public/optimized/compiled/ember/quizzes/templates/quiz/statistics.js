define(["ember","compiled/ember/shared/helpers/common"],function(s){s.TEMPLATES["quiz/statistics"]=s.Handlebars.template(function(e,t,n,a,i){function r(s,e){var t,a,i="";return e.buffer.push("\n    "),e.buffer.push(d((t=n.partial||s&&s.partial,a={hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["STRING"],data:e},t?t.call(s,"quiz/statistics/error",a):y.call(s,"partial","quiz/statistics/error",a)))),e.buffer.push("\n  "),i}function h(s,e){var t,a,i,r="";return e.buffer.push("\n    \n    <section>\n      "),e.buffer.push(d((a=n.render||s&&s.render,i={hash:{},hashTypes:{},hashContexts:{},contexts:[s,s],types:["STRING","ID"],data:e},a?a.call(s,"quiz/statistics/summary","controller",i):y.call(s,"render","quiz/statistics/summary","controller",i)))),e.buffer.push('\n    </section>\n\n    \n    <section id="question-statistics-section">\n      <header class="padded">\n        <h3 class="section-title inline">'),e.buffer.push(d((a=n.t||s&&s.t,i={hash:{},hashTypes:{},hashContexts:{},contexts:[s,s],types:["STRING","STRING"],data:e},a?a.call(s,"question_breakdown","Question Breakdown",i):y.call(s,"t","question_breakdown","Question Breakdown",i)))),e.buffer.push('</h3>\n\n        <aside class="pull-right">\n          <button '),e.buffer.push(d(n.action.call(s,"showAllDetails",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["STRING"],data:e}))),e.buffer.push(' class="btn">\n            <i '),e.buffer.push(d(n["bind-attr"].call(s,{hash:{"class":"allDetailsVisible:icon-collapse:icon-expand"},hashTypes:{"class":"STRING"},hashContexts:{"class":s},contexts:[],types:[],data:e}))),e.buffer.push("></i>\n          </button>\n          "),i={hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(4,o,e),contexts:[],types:[],data:e},(a=n["ic-menu"])?t=a.call(s,i):(a=s&&s["ic-menu"],t=typeof a===T?a.call(s,i):a),n["ic-menu"]||(t=I.call(s,"ic-menu",{hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(4,o,e),contexts:[],types:[],data:e})),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n        </aside>\n      </header>\n\n      "),t=n.each.call(s,"item","in","questionStatistics",{hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(12,f,e),contexts:[s,s,s],types:["ID","ID","ID"],data:e}),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n    </section>\n  "),r}function o(s,e){var t,a,i,r="";return e.buffer.push("\n            "),i={hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(5,u,e),contexts:[],types:[],data:e},(a=n["ic-menu-trigger"])?t=a.call(s,i):(a=s&&s["ic-menu-trigger"],t=typeof a===T?a.call(s,i):a),n["ic-menu-trigger"]||(t=I.call(s,"ic-menu-trigger",{hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(5,u,e),contexts:[],types:[],data:e})),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n            "),i={hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(7,p,e),contexts:[],types:[],data:e},(a=n["ic-menu-list"])?t=a.call(s,i):(a=s&&s["ic-menu-list"],t=typeof a===T?a.call(s,i):a),n["ic-menu-list"]||(t=I.call(s,"ic-menu-list",{hash:{},hashTypes:{},hashContexts:{},inverse:x.noop,fn:x.program(7,p,e),contexts:[],types:[],data:e})),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n          "),r}function u(s,e){var t,a="";return e.buffer.push('\n              <button class="btn">\n                <span>'),t=n._triageMustache.call(s,"controller.sortLabel",{hash:{},hashTypes:{},hashContexts:{},contexts:[s],types:["ID"],data:e}),(t||0===t)&&e.buffer.push(t),e.buffer.push('</span>\n                <i class="icon-mini-arrow-down"></i>\n              </button>\n            '),a}function p(s,e){var t,a,i,r="";return e.buffer.push("\n              "),a=n["ic-menu-item"]||s&&s["ic-menu-item"],i={hash:{"on-select":"sortByPosition"},hashTypes:{"on-select":"STRING"},hashContexts:{"on-select":s},inverse:x.noop,fn:x.program(8,c,e),contexts:[],types:[],data:e},t=a?a.call(s,i):y.call(s,"ic-menu-item",i),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n\n              "),a=n["ic-menu-item"]||s&&s["ic-menu-item"],i={hash:{"on-select":"sortByDiscriminationIndex"},hashTypes:{"on-select":"STRING"},hashContexts:{"on-select":s},inverse:x.noop,fn:x.program(10,l,e),contexts:[],types:[],data:e},t=a?a.call(s,i):y.call(s,"ic-menu-item",i),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n            "),r}function c(s,e){var t,a,i,r="";return e.buffer.push("\n                "),a=n.t||s&&s.t,i={hash:{scope:"quizzes.templates.quiz.statistics.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:s},contexts:[s,s],types:["STRING","STRING"],data:e},t=a?a.call(s,"sort_by_position","By Position",i):y.call(s,"t","sort_by_position","By Position",i),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n              "),r}function l(s,e){var t,a,i,r="";return e.buffer.push("\n                "),a=n.t||s&&s.t,i={hash:{scope:"quizzes.templates.quiz.statistics.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:s},contexts:[s,s],types:["STRING","STRING"],data:e},t=a?a.call(s,"sort_by_discrimination_index","By Discrimination Index",i):y.call(s,"t","sort_by_discrimination_index","By Discrimination Index",i),(t||0===t)&&e.buffer.push(t),e.buffer.push("\n              "),r}function f(s,e){var t,a,i="";return e.buffer.push("\n        "),e.buffer.push(d((t=n.polyRender||s&&s.polyRender,a={hash:{prefix:"quiz/statistics/questions/"},hashTypes:{prefix:"STRING"},hashContexts:{prefix:s},contexts:[s,s],types:["ID","ID"],data:e},t?t.call(s,"item.renderableType","item",a):y.call(s,"polyRender","item.renderableType","item",a)))),e.buffer.push("\n      "),i}this.compilerInfo=[4,">= 1.0.0"],n=this.merge(n,s.Handlebars.helpers),i=i||{};var b,m="",y=n.helperMissing,d=this.escapeExpression,x=this,T="function",I=n.blockHelperMissing;return i.buffer.push('<div id="quiz-statistics">\n  '),b=n["if"].call(t,"hasError",{hash:{},hashTypes:{},hashContexts:{},inverse:x.program(3,h,i),fn:x.program(1,r,i),contexts:[t],types:["ID"],data:i}),(b||0===b)&&i.buffer.push(b),i.buffer.push("\n</div>"),m})});