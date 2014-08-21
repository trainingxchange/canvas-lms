define(["ember","compiled/ember/shared/helpers/common"],function(e){e.TEMPLATES["quiz/moderate"]=e.Handlebars.template(function(s,t,a,h,n){function u(e,s){var t,h="";return s.buffer.push('\n      <a class="change-extensions-for icon-edit" href="#" '),s.buffer.push(R(a.action.call(e,"studentExtension","checkedStudents",{hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:s}))),s.buffer.push(">\n        "),t=a._triageMustache.call(e,"changeExtensionFor",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n      </a>\n    "),h}function r(e,s){var t,h,n,u="";return s.buffer.push("\n      <tr class='moderate-submission-row'>\n        <td class=\"check\">"),s.buffer.push(R((h=a.input||e&&e.input,n={hash:{type:"checkbox",checked:"isChecked"},hashTypes:{type:"STRING",checked:"ID"},hashContexts:{type:e,checked:e},contexts:[],types:[],data:s},h?h.call(e,n):G.call(e,"input",n)))),s.buffer.push('</td>\n        <td class="name">\n          '),t=a["if"].call(e,"hasActiveSubmission",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(6,c,s),fn:g.program(4,p,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),t=a["if"].call(e,"extraTimeAllowed",{hash:{},hashTypes:{},hashContexts:{},inverse:g.noop,fn:g.program(8,o,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </td>\n        <td>\n          "),t=a["if"].call(e,"attempts",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(12,l,s),fn:g.program(10,f,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </td>\n        <td>\n          "),t=a["if"].call(e,"isActive",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(19,y,s),fn:g.program(14,i,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </td>\n\n        <td>\n          "),t=a["if"].call(e,"friendlyEndsAt",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(23,T,s),fn:g.program(21,x,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n        </td>\n        <td>"),t=a._triageMustache.call(e,"remainingStatusLabel",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),t=a._triageMustache.call(e,"remainingAttempts",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</td>\n        <td>"),t=a._triageMustache.call(e,"user.friendlyScore",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push('</td>\n        <td class="unlocked">\n          '),t=a["if"].call(e,"quizSubmission.manuallyUnlocked",{hash:{},hashTypes:{},hashContexts:{},inverse:g.noop,fn:g.program(25,m,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push('\n        </td>\n        <td class="edit">\n          <a class="icon-edit" href="#" '),s.buffer.push(R(a.action.call(e,"studentExtension","user",{hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:s}))),s.buffer.push('>\n            <span class="screenreader-only">'),h=a.t||e&&e.t,n={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:e},contexts:[e,e],types:["STRING","STRING"],data:s},t=h?h.call(e,"edit","Edit",n):G.call(e,"t","edit","Edit",n),(t||0===t)&&s.buffer.push(t),s.buffer.push("</span>\n          </a>\n        </td>\n      </tr>\n    "),u}function p(e,s){var t,h="";return s.buffer.push("\n            <a "),s.buffer.push(R(a["bind-attr"].call(e,{hash:{href:"historyLink"},hashTypes:{href:"STRING"},hashContexts:{href:e},contexts:[],types:[],data:s}))),s.buffer.push(">\n              "),t=a._triageMustache.call(e,"user.sortableName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n            </a>\n          "),h}function c(e,s){var t,h="";return s.buffer.push("\n            "),t=a._triageMustache.call(e,"user.sortableName",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),h}function o(e,s){var t,h="";return s.buffer.push('\n            <div class="extra-time">'),t=a._triageMustache.call(e,"extraTimeOnAttempt",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("</div>\n          "),h}function f(e,s){var t,h="";return s.buffer.push("\n            "),t=a._triageMustache.call(e,"attempts",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),h}function l(e,s){var t,h,n,u="";return s.buffer.push("\n            <span aria-hidden=\"true\">\n              --\n            </span>\n            <span class='screenreader-only'>\n              "),h=a.t||e&&e.t,n={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:e},contexts:[e,e],types:["STRING","STRING"],data:s},t=h?h.call(e,"no_attempts","No Attempts",n):G.call(e,"t","no_attempts","No Attempts",n),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n            </span>\n          "),u}function i(e,s){var t,h="";return s.buffer.push("\n            "),t=a["if"].call(e,"extendable",{hash:{},hashTypes:{},hashContexts:{},inverse:g.program(17,b,s),fn:g.program(15,d,s),contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),h}function d(e,s){var t,h="";return s.buffer.push('\n              <a class="icon-clock" href="#" '),s.buffer.push(R(a.action.call(e,"extendTime","user",{hash:{},hashTypes:{},hashContexts:{},contexts:[e,e],types:["STRING","ID"],data:s}))),s.buffer.push(">\n                "),t=a._triageMustache.call(e,"runningTime",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n              </a>\n            "),h}function b(e,s){var t,h="";return s.buffer.push('\n              <i class="icon-clock"></i>\n              '),t=a._triageMustache.call(e,"runningTime",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n            "),h}function y(e,s){var t,h="";return s.buffer.push("\n            "),t=a._triageMustache.call(e,"friendlyTime",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),h}function x(e,s){var t,h="";return s.buffer.push("\n            "),t=a._triageMustache.call(e,"friendlyEndsAt",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:s}),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n          "),h}function T(e,s){var t,h,n,u="";return s.buffer.push("\n            <span aria-hidden=\"true\">\n              --\n            </span>\n            <span class='screenreader-only'>\n              "),h=a.t||e&&e.t,n={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:e},contexts:[e,e],types:["STRING","STRING"],data:s},t=h?h.call(e,"no_ends_at","No Modified End At Date",n):G.call(e,"t","no_ends_at","No Modified End At Date",n),(t||0===t)&&s.buffer.push(t),s.buffer.push("\n            </span>\n          "),u}function m(e,s){var t,h,n,u="";return s.buffer.push('\n          <span class="unlocked" title="'),h=a.t||e&&e.t,n={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:e},contexts:[e,e],types:["STRING","STRING"],data:s},t=h?h.call(e,"manually_unlocked","Manually Unlocked",n):G.call(e,"t","manually_unlocked","Manually Unlocked",n),(t||0===t)&&s.buffer.push(t),s.buffer.push('">\n            <i class="icon-unlock standalone-icon">\n              <span class="screenreader-only">'),h=a.t||e&&e.t,n={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:e},contexts:[e,e],types:["STRING","STRING"],data:s},t=h?h.call(e,"manually_unlocked","Manually Unlocked",n):G.call(e,"t","manually_unlocked","Manually Unlocked",n),(t||0===t)&&s.buffer.push(t),s.buffer.push("</span>\n            </i>\n          </span>\n          "),u}this.compilerInfo=[4,">= 1.0.0"],a=this.merge(a,e.Handlebars.helpers),n=n||{};var I,S,N,C="",R=this.escapeExpression,G=a.helperMissing,g=this;return n.buffer.push('<div class="quiz-moderate allow-inputs">\n  <div class="clearfix">\n    <strong class="have-taken">'),I=a._triageMustache.call(t,"studentsHaveTakenQuiz",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["ID"],data:n}),(I||0===I)&&n.buffer.push(I),n.buffer.push("</strong>\n    "),I=a["if"].call(t,"checkedStudents.length",{hash:{},hashTypes:{},hashContexts:{},inverse:g.noop,fn:g.program(1,u,n),contexts:[t],types:["ID"],data:n}),(I||0===I)&&n.buffer.push(I),n.buffer.push('\n  </div>\n  <table class="table table-striped quiz-table" id="moderate-table">\n    <thead>\n    <tr>\n      <th class="check">'),n.buffer.push(R((S=a.input||t&&t.input,N={hash:{type:"checkbox",checked:"allChecked"},hashTypes:{type:"STRING",checked:"ID"},hashContexts:{type:t,checked:t},contexts:[],types:[],data:n},S?S.call(t,N):G.call(t,"input",N)))),n.buffer.push('</th>\n      <th class="name">\n        '),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"student","Student",N):G.call(t,"t","student","Student",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n      </th>\n      <th>\n        "),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"attempt","Attempt",N):G.call(t,"t","attempt","Attempt",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n      </th>\n      <th>\n        "),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"time","Time",N):G.call(t,"t","time","Time",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n      </th>\n      <th>\n        "),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"ends_at","End Date",N):G.call(t,"t","ends_at","End Date",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n      </th>\n      <th>\n        "),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"attempts_left","Attempts Left",N):G.call(t,"t","attempts_left","Attempts Left",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n      </th>\n      <th>\n        "),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"score","Score",N):G.call(t,"t","score","Score",N),(I||0===I)&&n.buffer.push(I),n.buffer.push('\n      </th>\n      <th class="unlocked">&nbsp;</th>\n      <th class="edit">\n        <a '),n.buffer.push(R(a["bind-attr"].call(t,{hash:{"class":"reloading::icon-refresh"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:n}))),n.buffer.push(" "),n.buffer.push(R(a.action.call(t,"refreshData",{hash:{},hashTypes:{},hashContexts:{},contexts:[t],types:["STRING"],data:n}))),n.buffer.push(" href>\n          <img "),n.buffer.push(R(a["bind-attr"].call(t,{hash:{"class":":icon-refreshing reloading::inactive"},hashTypes:{"class":"STRING"},hashContexts:{"class":t},contexts:[],types:[],data:n}))),n.buffer.push("\n               src='/images/ajax-reload-animated.gif' />\n          <span class=\"screenreader-only\">"),S=a.t||t&&t.t,N={hash:{scope:"quizzes.templates.quiz.moderate.hbs"},hashTypes:{scope:"STRING"},hashContexts:{scope:t},contexts:[t,t],types:["STRING","STRING"],data:n},I=S?S.call(t,"refresh","Refresh",N):G.call(t,"t","refresh","Refresh",N),(I||0===I)&&n.buffer.push(I),n.buffer.push("</span>\n        </a>\n      </th>\n    </tr>\n    </thead>\n\n    <tbody>\n    "),I=a.each.call(t,"user","in","controller",{hash:{itemController:"quiz.submission_row"},hashTypes:{itemController:"STRING"},hashContexts:{itemController:t},inverse:g.noop,fn:g.program(3,r,n),contexts:[t,t,t],types:["ID","ID","ID"],data:n}),(I||0===I)&&n.buffer.push(I),n.buffer.push("\n    </tbody>\n\n  </table>\n</div>\n"),C})});