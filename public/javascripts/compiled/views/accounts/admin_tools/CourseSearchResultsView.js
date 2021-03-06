(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'Backbone', 'jquery', 'jst/accounts/admin_tools/CourseSearchResults'], function(_, Backbone, $, template, I18n) {
    var CourseSearchResultsView, _ref;

    return CourseSearchResultsView = (function(_super) {
      __extends(CourseSearchResultsView, _super);

      function CourseSearchResultsView() {
        this.enableResults = __bind(this.enableResults, this);
        this.disableResults = __bind(this.disableResults, this);        _ref = CourseSearchResultsView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CourseSearchResultsView.prototype.template = template;

      CourseSearchResultsView.prototype.events = {
        'click #restoreCourseBtn': 'restore'
      };

      CourseSearchResultsView.prototype.els = {
        '#restoreCourseBtn': '$restoreCourseBtn'
      };

      CourseSearchResultsView.prototype.initialize = function(options) {
        CourseSearchResultsView.__super__.initialize.apply(this, arguments);
        return this.applyBindings();
      };

      CourseSearchResultsView.prototype.disableResults = function() {
        return this.$el.find('button').prop('disabled', true);
      };

      CourseSearchResultsView.prototype.enableResults = function() {
        if (this.model.get('workflow_state') === 'deleted') {
          return this.$el.find('button').prop('disabled', false);
        }
      };

      CourseSearchResultsView.prototype.applyBindings = function() {
        var _this = this;

        this.model.on('doneSearching', this.enableResults);
        this.model.on('change', this.render);
        return this.model.on('searching', function() {
          _this.model.set('restored', false);
          return _this.disableResults();
        });
      };

      CourseSearchResultsView.prototype.restore = function(event) {
        var dfd;

        event.preventDefault();
        dfd = this.model.restore();
        return this.$el.disableWhileLoading(dfd);
      };

      CourseSearchResultsView.prototype.toJSON = function(json) {
        json = CourseSearchResultsView.__super__.toJSON.apply(this, arguments);
        json.showRestore = this.model.get('id') && this.model.get('workflow_state') === 'deleted';
        json.showNotFound = !this.model.get('id') && this.model.get('status');
        json.showSuccessfullRestore = this.model.get('id') && this.model.get('workflow_state') !== 'deleted' && this.model.get('restored');
        json.showNonDeletedCourse = this.model.get('id') && this.model.get('workflow_state') !== 'deleted' && !this.model.get('restored');
        if (this.model.get('enrollments')) {
          json.enrollmentCount = this.model.get('enrollments').length;
        }
        return json;
      };

      return CourseSearchResultsView;

    })(Backbone.View);
  });

}).call(this);
