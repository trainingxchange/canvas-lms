define('jst/gradebook_uploads_form', ["compiled/handlebars_helpers","i18n!gradebook_uploads_form"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['gradebook_uploads_form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<form action=\"";
  if (helper = helpers.action) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.action); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\" enctype=\"multipart/form-data\" id=\"upload_modal\" method=\"post\" title=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "titles.upload_form", "Choose a CSV file to upload", options) : helperMissing.call(depth0, "t", "titles.upload_form", "Choose a CSV file to upload", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n  <input type=\"hidden\" name='authenticity_token' value=\"";
  if (helper = helpers.authenticityToken) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.authenticityToken); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n  <style>\n    tr.table-callout-notes td div {\n      padding: 6px;\n      border-radius: 10px;\n    }\n    tr.table-callout-notes-spacer td, tr.table-callout-notes td{\n      padding: 0 10px;\n      border: none;\n      background-color: transparent !important;\n      text-align: center;\n      vertical-align: bottom;\n    }\n    .table-callout-notes-spacer span {\n      width: 0;\n      border-style: solid;\n      /*should be same as ui-state-highlight gradient bottom*/\n      border-color: #eedc94 transparent;\n      border-width: 8px 8px 0px;\n      margin: -1px auto 0;\n      display: block;\n    }\n  </style>\n  <p aria-hidden=\"true\">\n    <a class=\"icon-question element_toggler\"\n       aria-controls=\"gradebook-upload-help\"\n       data-hide-while-target-shown=\"true\"\n       href=\"#\">\n        ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "what_should_csv_look_like", "What should the CSV file look like?", options) : helperMissing.call(depth0, "t", "what_should_csv_look_like", "What should the CSV file look like?", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n  </p>\n  <div id=\"gradebook-upload-help\" class=\"well\" style=\"display:none\">\n    <h3>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "example_csv_file", "Example CSV file", options) : helperMissing.call(depth0, "t", "example_csv_file", "Example CSV file", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h3>\n    <table class=\"table table-striped\" >\n      <thead style=\"background: none\">\n        <tr class=\"table-callout-notes\">\n          <td colspan=\"4\"><div class=\"ui-state-highlight\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form"),
    'w0': ("<em>$1</em>")
  },data:data},helper ? helper.call(depth0, "explanation_of_required_columns", "You Must have *all* of these columns, you only *need* one per row.", options) : helperMissing.call(depth0, "t", "explanation_of_required_columns", "You Must have *all* of these columns, you only *need* one per row.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></td>\n          <td><div class=\"ui-state-highlight\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "optional_ignored", "Optional, ignored.", options) : helperMissing.call(depth0, "t", "optional_ignored", "Optional, ignored.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></td>\n          <td colspan=\"2\"><div class=\"ui-state-highlight\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "leaving_id_will_match_better_can_add_new_assignment", "Leaving the ID intact (the \"(581)\" part in this case) will help match better. You can also add new assignments that will be created on the fly.", options) : helperMissing.call(depth0, "t", "leaving_id_will_match_better_can_add_new_assignment", "Leaving the ID intact (the \"(581)\" part in this case) will help match better. You can also add new assignments that will be created on the fly.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></td>\n          <td colspan=\"2\"><div class=\"ui-state-highlight\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "optional_ignored", "Optional, ignored.", options) : helperMissing.call(depth0, "t", "optional_ignored", "Optional, ignored.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></td>\n        </tr>\n        <tr class=\"table-callout-notes-spacer\">\n          <td colspan=\"4\"><span /></td>\n          <td><span /></td>\n          <td colspan=\"2\"><span /></td>\n          <td colspan=\"2\"><span /></td>\n        </tr>\n        <tr>\n          <th>Student</th>\n          <th>ID</th>\n          <th>SIS User ID</th>\n          <th>SIS Login ID</th>\n          <th>Section</th>\n          <th>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "existing_assignment_example", "Existing Assignment (581)", options) : helperMissing.call(depth0, "t", "existing_assignment_example", "Existing Assignment (581)", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <th>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "new_assignment_example", "A New Assignment", options) : helperMissing.call(depth0, "t", "new_assignment_example", "A New Assignment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n          <th>Current Score</th>\n          <th>Final Score</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td colspan=\"2\">Points Possible</td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td>50</td>\n          <td>10</td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td>Smith, John</td>\n          <td>12345</td>\n          <td>2122</td>\n          <td>12321</td>\n          <td>night</td>\n          <td>46</td>\n          <td>8</td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td>King, Ben</td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td>34</td>\n          <td>60</td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td></td>\n          <td>12347</td>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td>38</td>\n          <td>3</td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td></td>\n          <td></td>\n          <td>123</td>\n          <td></td>\n          <td></td>\n          <td>40</td>\n          <td></td>\n          <td></td>\n          <td></td>\n        </tr>\n        <tr>\n          <td></td>\n          <td></td>\n          <td></td>\n          <td>3232</td>\n          <td></td>\n          <td>44</td>\n          <td>7</td>\n          <td></td>\n          <td></td>\n        </tr>\n      </tbody>\n    </table>\n    <p>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form"),
    'w0': ("<a href=\"%{download_gradebook_csv_url}\">$1</a>")
  },data:data},helper ? helper.call(depth0, "instructions.csv_download_and_upload", "If in doubt, you can always *download a CSV*, change the grades you want and re-upload the same file.", options) : helperMissing.call(depth0, "t", "instructions.csv_download_and_upload", "If in doubt, you can always *download a CSV*, change the grades you want and re-upload the same file.", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n  </div>\n\n  <div class=\"screenreader-only\" id=\"screenreader-csv-explainer\">\n      ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "screenreader_csv_explainer", "What should be in my CSV File? The following columns should be in your upload: \"Student\", \"ID\", and \"Existing Assignment (#)\". The Student column should have the name of each student, formatted as Last Name, First Name. For example, \"Smith, John\". Existing assignment columns should say the assignment name followed by the assignment ID in parentheses. For example, \"Chapter One Worksheet (201)\". If you use SIS, include the following columns: \"SIS User ID\" and \"SIS Login ID\". If you wish to create a new assignment, include a column titled with the name of the assignment. For example, \"Derivatives Worksheet\". The following columns are optional: \"Section\", \"Current Score\", \"Final Score\".", options) : helperMissing.call(depth0, "t", "screenreader_csv_explainer", "What should be in my CSV File? The following columns should be in your upload: \"Student\", \"ID\", and \"Existing Assignment (#)\". The Student column should have the name of each student, formatted as Last Name, First Name. For example, \"Smith, John\". Existing assignment columns should say the assignment name followed by the assignment ID in parentheses. For example, \"Chapter One Worksheet (201)\". If you use SIS, include the following columns: \"SIS User ID\" and \"SIS Login ID\". If you wish to create a new assignment, include a column titled with the name of the assignment. For example, \"Derivatives Worksheet\". The following columns are optional: \"Section\", \"Current Score\", \"Final Score\".", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </div>\n\n  <p style=\"font-size: 1.2em;\">\n    <label for=\"gradebook_upload_uploaded_data\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "labels.upload", "Choose a CSV file to upload:", options) : helperMissing.call(depth0, "t", "labels.upload", "Choose a CSV file to upload:", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label>\n    <input id=\"gradebook_upload_uploaded_data\" name=\"gradebook_upload[uploaded_data]\" type=\"file\" />\n  </p>\n\n  <button class=\"btn btn-primary\" type=\"submit\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("gradebook_uploads_form")
  },data:data},helper ? helper.call(depth0, "buttons.upload_data", "Upload Data", options) : helperMissing.call(depth0, "t", "buttons.upload_data", "Upload Data", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n</form>\n";
  return buffer;
  });
  
      
  return templates['gradebook_uploads_form'];
});
