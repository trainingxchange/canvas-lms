define(["ember","compiled/ember/shared/helpers/common"],function(s){s.TEMPLATES["quiz/statistics/questions/short_answer"]=s.Handlebars.template(function(e,t,i,a,r){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,s.Handlebars.helpers),r=r||{};var n,c,l="",o=i.helperMissing,h=this.escapeExpression;return r.buffer.push(h((n=i.partial||t&&t.partial,c={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r},n?n.call(t,"quiz/statistics/questions/multiple_choice/header",c):o.call(t,"partial","quiz/statistics/questions/multiple_choice/header",c)))),r.buffer.push('\n\n<div>\n  <section class="correct-answer-ratio-section">\n    '),r.buffer.push(h((n=i.render||t&&t.render,c={hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","ID"],data:r},n?n.call(t,"quiz/statistics/questions/multiple_choice/correct_pie","controller",c):o.call(t,"render","quiz/statistics/questions/multiple_choice/correct_pie","controller",c)))),r.buffer.push('\n  </section>\n\n  <section class="answer-distribution-section">\n    '),r.buffer.push(h((n=i.render||t&&t.render,c={hash:{},hashTypes:{},hashContexts:{},contexts:[t,t],types:["STRING","ID"],data:r},n?n.call(t,"quiz/statistics/questions/multiple_choice/answer_bars","controller",c):o.call(t,"render","quiz/statistics/questions/multiple_choice/answer_bars","controller",c)))),r.buffer.push("\n  </section>\n</div>\n\n"),r.buffer.push(h((n=i.partial||t&&t.partial,c={hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:r},n?n.call(t,"quiz/statistics/questions/multiple_choice/answers",c):o.call(t,"partial","quiz/statistics/questions/multiple_choice/answers",c)))),l})});