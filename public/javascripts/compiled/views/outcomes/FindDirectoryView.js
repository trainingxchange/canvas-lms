(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!outcomes', 'jquery', 'underscore', 'compiled/views/outcomes/OutcomesDirectoryView', 'compiled/views/outcomes/AccountDirectoryView', 'compiled/views/outcomes/StateStandardsDirectoryView', 'compiled/models/OutcomeGroup', 'compiled/collections/OutcomeCollection', 'compiled/collections/OutcomeGroupCollection', 'jquery.disableWhileLoading'], function(I18n, $, _, OutcomesDirectoryView, AccountDirectoryView, StateStandardsDirectoryView, OutcomeGroup, OutcomeCollection, OutcomeGroupCollection) {
    var FindDirectoryView, _ref;

    return FindDirectoryView = (function(_super) {
      __extends(FindDirectoryView, _super);

      function FindDirectoryView() {
        _ref = FindDirectoryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      FindDirectoryView.prototype.initialize = function(opts) {
        var account, core, course, dfds, g, state,
          _this = this;

        this.readOnly = true;
        account = new OutcomeGroup({
          dontImport: true,
          id: -1,
          title: I18n.t('account_standards', 'Account Standards'),
          description: I18n.t('account_standards_description', "To the left you'll notice the standards your institution has created for you to use in your courses."),
          directoryClass: AccountDirectoryView
        });
        if (ENV.STATE_STANDARDS_URL) {
          state = new OutcomeGroup({
            dontImport: true,
            title: I18n.t('state_standards', 'State Standards'),
            description: I18n.t('state_standards_description', "To the left you'll see a folder for each state with their updated state standards. This allows for you to painlessly include state standards for grading within your course."),
            directoryClass: StateStandardsDirectoryView
          });
          state.url = ENV.STATE_STANDARDS_URL;
        }
        if (ENV.COMMON_CORE_GROUP_URL) {
          core = new OutcomeGroup({
            dontImport: true,
            title: I18n.t('common_core', 'Common Core Standards'),
            description: I18n.t('common_core_description', "To the left is the familiar outcomes folder structure for each grouping of the Common Core State Standards. This will allow you to effortlessly include any of the Common Core Standards for grading within your course.")
          });
          core.url = ENV.COMMON_CORE_GROUP_URL;
        }
        if (opts.courseGroup) {
          course = opts.courseGroup;
        }
        this.outcomes = new OutcomeCollection;
        this.groups = new OutcomeGroupCollection(_.compact([account, state, core, course]));
        dfds = (function() {
          var _i, _len, _ref1, _results;

          _ref1 = _.compact([state, core]);
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            g = _ref1[_i];
            g.on('change', this.revertTitle);
            _results.push(g.fetch());
          }
          return _results;
        }).call(this);
        return this.$el.disableWhileLoading($.when.apply($, dfds).done(function() {
          return setTimeout(function() {
            _this.reset();
            return _this.$el.find('[tabindex=0]:first').focus();
          });
        }));
      };

      FindDirectoryView.prototype.revertTitle = function(group) {
        return group.set({
          title: group.previous('title'),
          description: group.previous('description')
        }, {
          silent: true
        });
      };

      return FindDirectoryView;

    })(OutcomesDirectoryView);
  });

}).call(this);
