(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'jst/content_migrations/MigrationConverter', 'compiled/views/ValidatedFormView', 'i18n!content_migrations', 'vendor/jquery.ba-tinypubsub', 'jquery.disableWhileLoading'], function($, _, template, ValidatedFormView, I18n) {
    var MigrationConverterView, _ref;

    return MigrationConverterView = (function(_super) {
      __extends(MigrationConverterView, _super);

      function MigrationConverterView() {
        this.resetForm = __bind(this.resetForm, this);        _ref = MigrationConverterView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MigrationConverterView.optionProperty('selectOptions');

      MigrationConverterView.prototype.template = template;

      MigrationConverterView.prototype.initialize = function() {
        MigrationConverterView.__super__.initialize.apply(this, arguments);
        return $.subscribe('resetForm', this.resetForm);
      };

      MigrationConverterView.prototype.els = {
        '#converter': '$converter',
        '#chooseMigrationConverter': '$chooseMigrationConverter',
        '#submitMigration': '$submitBtn',
        '.form-container': '$formActions'
      };

      MigrationConverterView.prototype.events = _.extend({}, MigrationConverterView.prototype.events, {
        'change #chooseMigrationConverter': 'selectConverter',
        'click .cancelBtn': 'resetForm'
      });

      MigrationConverterView.prototype.toJSON = function(json) {
        json = MigrationConverterView.__super__.toJSON.apply(this, arguments);
        json.selectOptions = this.selectOptions || ENV.SELECT_OPTIONS;
        return json;
      };

      MigrationConverterView.prototype.renderConverter = function(converter) {
        var _this = this;

        if (converter) {
          return _.defer(function() {
            _this.$converter.html(converter.render().$el);
            return _this.trigger('converterRendered');
          });
        } else {
          this.resetForm();
          return this.trigger('converterReset');
        }
      };

      MigrationConverterView.prototype.selectConverter = function(event) {
        this.$formActions.show();
        this.model.resetModel();
        this.$chooseMigrationConverter.attr("aria-activedescendant", this.$chooseMigrationConverter.val());
        this.model.set('migration_type', this.$chooseMigrationConverter.val());
        return $.publish('contentImportChange', {
          value: this.$chooseMigrationConverter.val(),
          migrationConverter: this
        });
      };

      MigrationConverterView.prototype.submit = function(event) {
        var btnText, dfd,
          _this = this;

        btnText = this.$submitBtn.val();
        this.$submitBtn.val(I18n.t('uploading', 'Uploading...'));
        $(window).on('beforeunload', function() {
          return I18n.t('upload_warning', "Navigating away from this page will cancel the upload process.");
        });
        dfd = MigrationConverterView.__super__.submit.apply(this, arguments);
        return dfd != null ? dfd.done(function() {
          $(window).off('beforeunload');
          _this.$submitBtn.val(btnText);
          $.publish('migrationCreated', _this.model.attributes);
          _this.model.resetModel();
          return _this.resetForm();
        }) : void 0;
      };

      MigrationConverterView.prototype.resetForm = function() {
        this.$formActions.hide();
        this.$converter.empty();
        return this.$chooseMigrationConverter.val('none');
      };

      return MigrationConverterView;

    })(ValidatedFormView);
  });

}).call(this);
