(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'jquery', 'i18n!user_date_range_search', 'jst/accounts/admin_tools/userDateRangeSearchForm', 'compiled/views/ValidatedMixin', 'jquery.ajaxJSON', 'jquery.instructure_date_and_time'], function(Backbone, $, I18n, template, ValidatedMixin) {
    var UserDateRangeSearchFormView, _ref;

    return UserDateRangeSearchFormView = (function(_super) {
      __extends(UserDateRangeSearchFormView, _super);

      function UserDateRangeSearchFormView() {
        this.selectUser = __bind(this.selectUser, this);
        this.fetchUsers = __bind(this.fetchUsers, this);        _ref = UserDateRangeSearchFormView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UserDateRangeSearchFormView.mixin(ValidatedMixin);

      UserDateRangeSearchFormView.child('inputFilterView', '[data-view=inputFilter]');

      UserDateRangeSearchFormView.child('usersView', '[data-view=users]');

      UserDateRangeSearchFormView.prototype.tagName = 'form';

      UserDateRangeSearchFormView.prototype.template = template;

      UserDateRangeSearchFormView.prototype.events = {
        'submit': 'submit'
      };

      UserDateRangeSearchFormView.prototype.els = {
        '.userIdField': '$userIdField',
        '.dateStartSearchField': '$dateStartSearchField',
        '.dateEndSearchField': '$dateEndSearchField',
        '.search-controls': '$searchControls'
      };

      UserDateRangeSearchFormView.optionProperty('formName');

      UserDateRangeSearchFormView.prototype.toJSON = function() {
        return this.options;
      };

      UserDateRangeSearchFormView.prototype.initialize = function(options) {
        this.model = new Backbone.Model;
        return UserDateRangeSearchFormView.__super__.initialize.call(this, options);
      };

      UserDateRangeSearchFormView.prototype.afterRender = function() {
        this.$dateStartSearchField.datetime_field();
        this.$dateEndSearchField.datetime_field();
        return this.$searchControls.hide();
      };

      UserDateRangeSearchFormView.prototype.attach = function() {
        this.inputFilterView.collection.on('setParam deleteParam', this.fetchUsers);
        return this.usersView.collection.on('selectedModelChange', this.selectUser);
      };

      UserDateRangeSearchFormView.prototype.fetchUsers = function() {
        var _ref1;

        this.selectUser(null);
        if ((_ref1 = this.lastRequest) != null) {
          _ref1.abort();
        }
        return this.lastRequest = this.inputFilterView.collection.fetch();
      };

      UserDateRangeSearchFormView.prototype.selectUser = function(e) {
        this.usersView.$el.find('tr').each(function() {
          return $(this).removeClass('selected');
        });
        if (e) {
          this.model.set(e.attributes);
          this.$userIdField.val(e.get('id'));
          return this.$searchControls.show();
        } else {
          this.$userIdField.val('');
          return this.$searchControls.hide();
        }
      };

      UserDateRangeSearchFormView.prototype.validityCheck = function() {
        var errors, json, valid;

        json = this.$el.toJSON();
        valid = true;
        errors = {};
        if (!json.user_id) {
          valid = false;
          errors['user_id'] = [
            {
              type: 'required',
              message: I18n.t('cant_be_blank', "Canvas User ID can't be blank")
            }
          ];
        }
        if (json.start_time && json.end_time && (json.start_time > json.end_time)) {
          valid = false;
          errors['end_time'] = [
            {
              type: 'invalid',
              message: I18n.t('cant_come_before_from', "'To Date' can't come before 'From Date'")
            }
          ];
        }
        this.showErrors(errors);
        return valid;
      };

      UserDateRangeSearchFormView.prototype.submit = function(event) {
        event.preventDefault();
        if (this.validityCheck()) {
          return this.updateCollection();
        }
      };

      UserDateRangeSearchFormView.prototype.updateCollection = function() {
        var json;

        json = this.$el.toJSON();
        delete json['search_term'];
        if (!json.start_time) {
          json.start_time = '';
        }
        if (!json.end_time) {
          json.end_time = '';
        }
        return this.collection.setParams(json);
      };

      return UserDateRangeSearchFormView;

    })(Backbone.View);
  });

}).call(this);
