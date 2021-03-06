(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore', 'jquery'], function(_arg, _, $) {
    var Model, QuickStartAssignment, _ref;

    Model = _arg.Model;
    return QuickStartAssignment = (function(_super) {
      __extends(QuickStartAssignment, _super);

      function QuickStartAssignment() {
        _ref = QuickStartAssignment.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      QuickStartAssignment.prototype.url = function() {
        return "/api/v1/courses/" + (this.get('course_id')) + "/assignments";
      };

      QuickStartAssignment.prototype.defaults = {
        name: 'No Title',
        due_at: null,
        points_possible: null,
        grading_type: 'points',
        submission_types: 'online_upload,online_text_entry',
        course_id: null
      };

      QuickStartAssignment.prototype.toJSON = function() {
        return {
          assignment: QuickStartAssignment.__super__.toJSON.apply(this, arguments)
        };
      };

      return QuickStartAssignment;

    })(Model);
  });

}).call(this);
