define('jst/conversations/MessageForm', ["compiled/handlebars_helpers","i18n!conversations.message_form"], function (Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
  templates['conversations/MessageForm'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<form method=\"post\" action=\"/conversations/"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.conversation)),stack1 == null || stack1 === false ? stack1 : stack1.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/add_message\">\n";
  return buffer;
  }

function program3(depth0,data) {
  
  
  return "\n<form method=\"post\" action=\"/conversations\" class=\"new\">\n";
  }

function program5(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n          ";
  if (helper = helpers.audience) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.audience); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program7(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n          ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "headings.new_message", "New Message", options) : helperMissing.call(depth0, "t", "headings.new_message", "New Message", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        ";
  return buffer;
  }

function program9(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n        <a href=\"/conversations/";
  if (helper = helpers.id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "/add_recipients\" class=\"action_add_recipients\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "inbox_actions.add_people", "Add People", options) : helperMissing.call(depth0, "t", "inbox_actions.add_people", "Add People", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n      ";
  return buffer;
  }

function program11(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n    <tr class=\"recipient_info\">\n      <th><label>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "labels.to", "To:", options) : helperMissing.call(depth0, "t", "labels.to", "To:", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</th>\n      <td><input type=\"text\" name=\"recipients\" data-finder_url=\"/conversations/find_recipients\" class=\"recipients\"></td>\n    </tr>\n    ";
  return buffer;
  }

function program13(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n    <tr class=\"group_conversation_info\" style=\"display:none\">\n      <th></th>\n      <td>\n        <label for=\"group_conversation\">\n          "
    + escapeExpression((helper = helpers.checkbox || (depth0 && depth0.checkbox),options={hash:{
    'class': ("group_conversation")
  },data:data},helper ? helper.call(depth0, "group_conversation", options) : helperMissing.call(depth0, "checkbox", "group_conversation", options)))
    + "\n          ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "labels.group_conversation", "This is a group conversation. Participants will see everyone's replies", options) : helperMissing.call(depth0, "t", "labels.group_conversation", "This is a group conversation. Participants will see everyone's replies", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </label>\n      </td>\n    </tr>\n    ";
  return buffer;
  }

function program15(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n          <div class=\"media_comment\" style=\"display: none;\" title=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "titles.media_comment", "Recorded media comment", options) : helperMissing.call(depth0, "t", "titles.media_comment", "Recorded media comment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n            <img src=\"/images/messages/media-gray.png\">\n            ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "media_comment", "Media Comment", options) : helperMissing.call(depth0, "t", "media_comment", "Media Comment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            <a href=\"#\" class=\"remove_link icon-end black\" style=\"float: right;\" title=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "titles.remove_media_comment", "Remove media comment", options) : helperMissing.call(depth0, "t", "titles.remove_media_comment", "Remove media comment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n              <span class=\"screenreader-only\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "titles.remove_media_comment", "Remove media comment", options) : helperMissing.call(depth0, "t", "titles.remove_media_comment", "Remove media comment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>\n            </a>\n            <div class=\"clear\"></div>\n          </div>\n          <input type=\"hidden\" name=\"media_comment_id\">\n          <input type=\"hidden\" name=\"media_comment_type\">\n        ";
  return buffer;
  }

function program17(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n          <a class=\"action_media_comment icon-media\"\n             href=\"#\"\n             data-track-category=\"Compose Message\"\n             data-track-action=\"Edit\"\n             data-track-label=\"Audio Recording\"\n             title=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "titles.record_media_comment", "Record an audio or video comment", options) : helperMissing.call(depth0, "t", "titles.record_media_comment", "Record an audio or video comment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"> ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "links.media_comment", "Record", options) : helperMissing.call(depth0, "t", "links.media_comment", "Record", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n        ";
  return buffer;
  }

function program19(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <button type=\"button\"\n                    data-track-category=\"Compose Message\"\n                    data-track-action=\"Edit\"\n                    data-track-label=\"ReplyAll\"\n                    name=\"reply-type\"\n                    value=\"all\"\n                    class=\"btn\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "buttons.reply_all", "Reply all", options) : helperMissing.call(depth0, "t", "buttons.reply_all", "Reply all", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n            <button type=\"submit\"\n                    data-track-category=\"Compose Message\"\n                    data-track-action=\"Edit\"\n                    data-track-label=\"Send\"\n                    class=\"btn btn-primary\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "buttons.reply", "Reply", options) : helperMissing.call(depth0, "t", "buttons.reply", "Reply", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n          ";
  return buffer;
  }

function program21(depth0,data) {
  
  var buffer = "", stack1, helper, options;
  buffer += "\n            <button type=\"submit\"\n                    data-track-category=\"Compose Message\"\n                    data-track-action=\"Edit\"\n                    data-track-label=\"Send\"\n                    class=\"btn btn-primary\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "buttons.send_message", "Send", options) : helperMissing.call(depth0, "t", "buttons.send_message", "Send", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</button>\n          ";
  return buffer;
  }

  stack1 = helpers['if'].call(depth0, (depth0 && depth0.conversation), {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  <ul class=\"conversations\">\n    <li>\n      <span class=\"audience\">\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.conversation), {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n      </span>\n      ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.addRecipientsEnabled), {hash:{},inverse:self.noop,fn:self.program(9, program9, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </li>\n  </ul>\n  <table>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.conversation), {hash:{},inverse:self.noop,fn:self.program(11, program11, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <tr>\n      <th><label>";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "labels.message", "Message:", options) : helperMissing.call(depth0, "t", "labels.message", "Message:", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</label></th>\n      <td>\n        <textarea name=\"body\"\n                  data-track-category=\"Compose Message\"\n                  data-track-action=\"Edit\"\n                  data-track-label=\"Body\"\n                  class=\"conversation_body\">";
  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</textarea>\n      </td>\n    </tr>\n    ";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.conversation), {hash:{},inverse:self.noop,fn:self.program(13, program13, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    <tr class=\"user_note_info\" style=\"display:none\">\n      <th></th>\n      <td>\n        <label for=\"user_note\">\n          "
    + escapeExpression((helper = helpers.checkbox || (depth0 && depth0.checkbox),options={hash:{
    'data-track-category': ("Compose Message"),
    'data-track-action': ("Edit"),
    'data-track-label': ("Faculty Journal"),
    'class': ("user_note")
  },data:data},helper ? helper.call(depth0, "user_note", options) : helperMissing.call(depth0, "checkbox", "user_note", options)))
    + "\n          ";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "labels.add_to_faculty_journal", "Add as a Faculty Journal entry", options) : helperMissing.call(depth0, "t", "labels.add_to_faculty_journal", "Add as a Faculty Journal entry", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </label>\n      </td>\n    </tr>\n    <tr>\n      <th>&nbsp;</th>\n      <td>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mediaCommentsEnabled), {hash:{},inverse:self.noop,fn:self.program(15, program15, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <ul class=\"attachment_list\"></ul>\n        <a class=\"icon-paperclip action_add_attachment\"\n           href=\"#\"\n           data-track-category=\"Compose Message\"\n           data-track-action=\"Edit\"\n           data-track-label=\"Attach File\"\n           title=\"";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "titles.add_attachment", "Add an attachment", options) : helperMissing.call(depth0, "t", "titles.add_attachment", "Add an attachment", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = (helper = helpers.t || (depth0 && depth0.t),options={hash:{
    'scope': ("conversations.message_form")
  },data:data},helper ? helper.call(depth0, "links.add_attachment", "Attach", options) : helperMissing.call(depth0, "t", "links.add_attachment", "Attach", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</a>\n        ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.mediaCommentsEnabled), {hash:{},inverse:self.noop,fn:self.program(17, program17, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        <div style=\"float: right\">\n          <input type=\"hidden\" name=\"from_conversation_id\" value=\"";
  if (helper = helpers.from_conversation_id) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.from_conversation_id); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n          <input type=\"hidden\" name=\"mode\" value=\"async\">\n          <input type=\"hidden\" name=\"scope\" value=\"";
  if (helper = helpers.scope) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.scope); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n          <input type=\"hidden\" name=\"filter\" value=\"";
  if (helper = helpers.filter) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.filter); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n          ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.conversation)),stack1 == null || stack1 === false ? stack1 : stack1.beta), {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </div>\n      </td>\n    </tr>\n  </table>\n</form>\n";
  return buffer;
  });
  
      
  return templates['conversations/MessageForm'];
});
