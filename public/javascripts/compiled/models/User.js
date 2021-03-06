(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!user', 'underscore', 'Backbone'], function(I18n, _, Backbone) {
    var User, _ref;

    return User = (function(_super) {
      __extends(User, _super);

      function User() {
        _ref = User.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      User.prototype.modelType = 'user';

      User.prototype.resourceName = 'users';

      User.prototype.errorMap = {
        name: {
          blank: I18n.t("errors.required", "Required"),
          too_long: I18n.t("errors.too_long", "Can't exceed %{max} characters", {
            max: 255
          })
        },
        self_enrollment_code: {
          blank: I18n.t("errors.required", "Required"),
          invalid: I18n.t("errors.invalid_code", "Invalid code"),
          already_enrolled: I18n.t("errors.already_enrolled", "You are already enrolled in this course"),
          full: I18n.t("errors.course_full", "This course is full")
        },
        terms_of_use: {
          accepted: I18n.t("errors.terms", "You must agree to the terms")
        }
      };

      User.prototype.enrollments = function(attrs, first) {
        return _.where(this.get('enrollments'), attrs, first);
      };

      User.prototype.hasEnrollmentType = function(type) {
        return !!this.enrollments({
          type: type
        }, true);
      };

      User.prototype.hasEnrollmentRole = function(role) {
        return !!this.enrollments({
          role: role
        }, true);
      };

      User.prototype.findEnrollmentByRole = function(role) {
        return this.enrollments({
          role: role
        }, true);
      };

      User.prototype.allEnrollmentsByType = function(type) {
        return this.enrollments({
          type: type
        });
      };

      User.prototype.allEnrollmentsByRole = function(role) {
        return this.enrollments({
          role: role
        });
      };

      User.prototype.pending = function(role) {
        return _.any(this.get('enrollments'), function(e) {
          var _ref1;

          return e.role === role && ((_ref1 = e.enrollment_state) === 'creation_pending' || _ref1 === 'invited');
        });
      };

      User.prototype.sectionEditableEnrollments = function() {
        return _.select(this.get('enrollments'), function(e) {
          return !_.include(['DesignerEnrollment', 'ObserverEnrollment'], e.type);
        });
      };

      return User;

    })(Backbone.Model);
  });

}).call(this);
