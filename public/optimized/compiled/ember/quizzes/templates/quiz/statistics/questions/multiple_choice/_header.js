define(["ember","compiled/ember/shared/helpers/common"],function(s){s.TEMPLATES["quiz/statistics/questions/multiple_choice/_header"]=s.Handlebars.template(function(e,t,a,h,n){this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,s.Handlebars.helpers),n=n||{};var u,i="",p=this.escapeExpression;return n.buffer.push('<header>\n  <span class="question-attempts">'),u=a._triageMustache.call(t,"attemptsLabel",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:n}),(u||0===u)&&n.buffer.push(u),n.buffer.push('</span>\n  <aside class="pull-right">\n    <button '),n.buffer.push(p(a.action.call(t,"showDetails",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:n}))),n.buffer.push(' class="btn">\n      <i '),n.buffer.push(p(a["bind-attr"].call(t,{hash:{"class":"detailsVisible:icon-collapse:icon-expand"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:n}))),n.buffer.push('></i>\n    </button>\n  </aside>\n\n  <div class="question-text">\n    '),n.buffer.push(p(a._triageMustache.call(t,"questionText",{hash:{unescaped:"true"},hashTypes:{unescaped:"STRING"},hashContexts:{unescaped:t},contexts:[t],types:["ID"],data:n}))),n.buffer.push("\n  </div>\n</header>"),i})});