define('jst/calendar/missingDueDateDialog', ["compiled/handlebars_helpers","i18n!calendar.missing_due_date_dialog"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['calendar/missingDueDateDialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "<b>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</b>";
  return buffer;
  }

  buffer += "<div>\n  <p>\n    ";
  stack1 = (helper = helpers.toSentence || (depth0 && depth0.toSentence),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, (depth0 && depth0.sections), options) : helperMissing.call(depth0, "toSentence", (depth0 && depth0.sections), options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n  <p>\n  ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("calendar.missing_due_date_dialog")
  },data:data},helper ? helper.call(depth0, "modal.chooseDueDate", "Do you want to go back and select a due date?", options) : helperMissing.call(depth0, "t", "modal.chooseDueDate", "Do you want to go back and select a due date?", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </p>\n\n  <div class=\"button-container form-actions\">\n    <button type=\"button\" class=\"btn\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("calendar.missing_due_date_dialog")
  },data:data},helper ? helper.call(depth0, "buttons.noDueDate", "No Due Date", options) : helperMissing.call(depth0, "t", "buttons.noDueDate", "No Due Date", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n    <button type=\"button\" class=\"btn btn-primary\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("calendar.missing_due_date_dialog")
  },data:data},helper ? helper.call(depth0, "buttons.goBack", "Go Back", options) : helperMissing.call(depth0, "t", "buttons.goBack", "Go Back", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n  </div>\n</div>\n";
  return buffer;
  });
  
      
  return templates['calendar/missingDueDateDialog'];
});
