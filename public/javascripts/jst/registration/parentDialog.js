define('jst/registration/parentDialog', ["compiled/handlebars_helpers","i18n!registration.parent_dialog"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['registration/parentDialog'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n    <div class=\"control-group\">\n      <div class=\"controls\">\n        <label class=\"checkbox\">\n          <input type=\"checkbox\" name=\"user[terms_of_use]\" value=\"1\">\n          ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog"),
    'w0': ("<a href=\"%{terms_url}\" target=\"_blank\">$1</a>"),
    'w1': ("<a href=\"%{privacy_url}\" target=\"_blank\">$1</a>")
  },data:data},helper ? helper.call(depth0, "agree_to_terms_and_pp", "You agree to the *terms of use* and acknowledge the **privacy policy**.", options) : helperMissing.call(depth0, "t", "agree_to_terms_and_pp", "You agree to the *terms of use* and acknowledge the **privacy policy**.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </label>\n      </div>\n    </div>\n    ";
  return buffer;
  }

  buffer += "<div class=\"registration-dialog\">\n  <form class=\"form-horizontal bootstrap-form\" method=\"post\" action=\"/users\">\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"parent_name\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog")
  },data:data},helper ? helper.call(depth0, "labels.name", "Your Name", options) : helperMissing.call(depth0, "t", "labels.name", "Your Name", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <div class=\"controls\">\n        <input type=\"text\" id=\"parent_name\" name=\"user[name]\">\n      </div>\n    </div>\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"parent_email\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog")
  },data:data},helper ? helper.call(depth0, "labels.email", "Your Email", options) : helperMissing.call(depth0, "t", "labels.email", "Your Email", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <div class=\"controls\">\n        <input type=\"text\" id=\"parent_email\" name=\"pseudonym[unique_id]\">\n      </div>\n    </div>\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"parent_child_username\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog")
  },data:data},helper ? helper.call(depth0, "labels.username", "Child's Username", options) : helperMissing.call(depth0, "t", "labels.username", "Child's Username", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <div class=\"controls\">\n        <input type=\"text\" id=\"parent_child_username\" name=\"observee[unique_id]\">\n      </div>\n    </div>\n    <div class=\"control-group\">\n      <label class=\"control-label\" for=\"parent_child_password\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog")
  },data:data},helper ? helper.call(depth0, "labels.password", "Child's Password", options) : helperMissing.call(depth0, "t", "labels.password", "Child's Password", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n      <div class=\"controls\">\n        <input type=\"password\" id=\"parent_child_password\" name=\"observee[password]\">\n      </div>\n    </div>\n    ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.terms_required), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <div class=\"control-group\">\n      <div class=\"controls\">\n        <input type=\"hidden\" name=\"user[initial_enrollment_type]\" value=\"observer\">\n        <button class=\"btn btn-primary\" type=\"submit\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("registration.parent_dialog")
  },data:data},helper ? helper.call(depth0, "buttons.start_participating", "Start Participating", options) : helperMissing.call(depth0, "t", "buttons.start_participating", "Start Participating", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n      </div>\n    </div>\n  </form>\n</div>\n";
  return buffer;
  });
  
      
  return templates['registration/parentDialog'];
});
