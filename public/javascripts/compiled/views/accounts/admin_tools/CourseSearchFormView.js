(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'jst/accounts/admin_tools/CourseSearchForm', 'i18n!course_search', 'jquery.instructure_forms'], function(Backbone, $, template, I18n) {
    var CourseSearchFormView, _ref;

    return CourseSearchFormView = (function(_super) {
      __extends(CourseSearchFormView, _super);

      function CourseSearchFormView() {
        this.enableSearchForm = __bind(this.enableSearchForm, this);
        this.disableSearchForm = __bind(this.disableSearchForm, this);        _ref = CourseSearchFormView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CourseSearchFormView.prototype.tagName = 'form';

      CourseSearchFormView.prototype.template = template;

      CourseSearchFormView.prototype.events = {
        'submit': 'search'
      };

      CourseSearchFormView.prototype.els = {
        '#courseSearchField': '$courseSearchField'
      };

      CourseSearchFormView.prototype.afterRender = function() {
        this.model.on('restoring', this.disableSearchForm);
        return this.model.on('doneRestoring', this.enableSearchForm);
      };

      CourseSearchFormView.prototype.search = function(event) {
        var dfd, query;

        event.preventDefault();
        query = $.trim(this.$courseSearchField.val());
        if (query === '') {
          return this.$courseSearchField.errorBox(I18n.t('cant_be_blank', "Can't be blank"));
        } else {
          dfd = this.model.search($.trim(query));
          return this.$el.disableWhileLoading(dfd);
        }
      };

      CourseSearchFormView.prototype.disableSearchForm = function() {
        return this.$el.find(':input').prop('disabled', true);
      };

      CourseSearchFormView.prototype.enableSearchForm = function() {
        return this.$el.find(':input').prop('disabled', false);
      };

      CourseSearchFormView.prototype.toJSON = function(json) {
        json = CourseSearchFormView.__super__.toJSON.apply(this, arguments);
        json.formDisabled = this.disabled;
        return json;
      };

      return CourseSearchFormView;

    })(Backbone.View);
  });

}).call(this);
