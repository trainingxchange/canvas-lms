(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['i18n!outcomes', 'jquery', 'underscore', 'compiled/views/PaginatedView', 'compiled/models/OutcomeGroup', 'compiled/collections/OutcomeCollection', 'compiled/collections/OutcomeGroupCollection', 'compiled/views/outcomes/OutcomeGroupIconView', 'compiled/views/outcomes/OutcomeIconView', 'jquery.disableWhileLoading', 'jqueryui/droppable', 'compiled/jquery.rails_flash_notifications'], function(I18n, $, _, PaginatedView, OutcomeGroup, OutcomeCollection, OutcomeGroupCollection, OutcomeGroupIconView, OutcomeIconView) {
    var OutcomesDirectoryView, _ref;

    return OutcomesDirectoryView = (function(_super) {
      __extends(OutcomesDirectoryView, _super);

      function OutcomesDirectoryView() {
        this.render = __bind(this.render, this);
        this.reset = __bind(this.reset, this);
        this.triggerSelect = __bind(this.triggerSelect, this);
        this.selectFirstOutcome = __bind(this.selectFirstOutcome, this);
        this.focusFirstOutcome = __bind(this.focusFirstOutcome, this);
        this.moveModelHere = __bind(this.moveModelHere, this);        _ref = OutcomesDirectoryView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      OutcomesDirectoryView.prototype.tagName = 'ul';

      OutcomesDirectoryView.prototype.className = 'outcome-level';

      OutcomesDirectoryView.prototype.initialize = function(opts) {
        var dfd;

        this.readOnly = opts.readOnly;
        this.parent = opts.parent;
        if (this.outcomeGroup = opts.outcomeGroup) {
          if (!this.groups) {
            this.groups = new OutcomeGroupCollection;
            this.groups.url = this.outcomeGroup.get('subgroups_url');
          }
          this.groups.on('add reset', this.reset, this);
          this.groups.on('remove', this.removeGroup, this);
          this.groups.on('fetched:last', this.fetchOutcomes, this);
          if (!this.outcomes) {
            this.outcomes = new OutcomeCollection;
            this.outcomes.url = this.outcomeGroup.get('outcomes_url');
          }
          this.outcomes.on('add remove reset', this.reset, this);
        }
        this.collection = this.groups;
        this.paginationScrollContainer = this.$el;
        OutcomesDirectoryView.__super__.initialize.call(this, opts);
        this.loadDfd = $.Deferred();
        if (this.outcomeGroup) {
          this.$el.disableWhileLoading(dfd = this.groups.fetch());
          dfd.done(this.focusFirstOutcome);
        }
        if (opts.selectFirstItem) {
          return this.loadDfd.done(this.selectFirstOutcome);
        }
      };

      OutcomesDirectoryView.prototype.initDroppable = function() {
        var _this = this;

        return this.$el.droppable({
          scope: 'outcomes',
          hoverClass: 'outcome-level-hover',
          drop: function(e, ui) {
            var model;

            if (ui.draggable.parent().get(0) === e.target) {
              return;
            }
            model = ui.draggable.data('view').model;
            return _this.moveModelHere(model);
          }
        });
      };

      OutcomesDirectoryView.prototype.promise = function() {
        return this.loadDfd.promise();
      };

      OutcomesDirectoryView.prototype.moveModelHere = function(model) {
        var dfd;

        model.collection.remove(model);
        if (model instanceof OutcomeGroup) {
          this.groups.add(model);
          dfd = this.moveGroup(model, this.outcomeGroup.toJSON());
        } else {
          this.outcomes.add(model);
          dfd = this.changeLink(model, this.outcomeGroup.toJSON());
        }
        return dfd.done(function() {
          return model.trigger('select');
        });
      };

      OutcomesDirectoryView.prototype.changeLink = function(outcome, newGroup) {
        var disablingDfd, onFail, unlinkUrl;

        disablingDfd = new $.Deferred();
        this.$el.disableWhileLoading(disablingDfd);
        onFail = function(m, r) {
          disablingDfd.reject();
          return $.flashError(I18n.t('flash.error', "An error occurred. Please refresh the page and try again."));
        };
        outcome.setUrlTo('delete');
        unlinkUrl = outcome.url;
        outcome.outcomeGroup = newGroup;
        outcome.setUrlTo('add');
        $.ajaxJSON(outcome.url, 'POST', {
          outcome_id: outcome.get('id')
        }).done(function(modelData) {
          outcome.set(outcome.parse(modelData));
          return $.ajaxJSON(unlinkUrl, 'DELETE').done(function() {
            $.flashMessage(I18n.t('flash.updateSuccess', 'Update successful'));
            return disablingDfd.resolve();
          }).fail(onFail);
        }).fail(onFail);
        return disablingDfd;
      };

      OutcomesDirectoryView.prototype.moveGroup = function(group, newGroup) {
        var disablingDfd, onFail;

        disablingDfd = new $.Deferred();
        onFail = function(m, r) {
          disablingDfd.reject();
          return $.flashError(I18n.t('flash.error', "An error occurred. Please refresh the page and try again."));
        };
        group.setUrlTo('edit');
        $.ajaxJSON(group.url, 'PUT', {
          parent_outcome_group_id: newGroup.id
        }).done(function(modelData) {
          group.set(group.parse(modelData));
          $.flashMessage(I18n.t('flash.updateSuccess', 'Update successful'));
          return disablingDfd.resolve();
        }).fail(onFail);
        this.$el.disableWhileLoading(disablingDfd);
        return disablingDfd;
      };

      OutcomesDirectoryView.prototype.focusFirstOutcome = function() {
        var $li;

        $li = this.$el.find('[tabindex=0]');
        if ($li.length > 0) {
          return $li.focus();
        } else {
          return this.$el.prev().find('[tabindex=0]').focus();
        }
      };

      OutcomesDirectoryView.prototype.selectFirstOutcome = function() {
        return $('ul.outcome-level li:first').click();
      };

      OutcomesDirectoryView.prototype.paginationLoaderTemplate = function() {
        return "<li><a href='#' class='loading-more'>        " + (I18n.t("loading_more_results", "Loading more results")) + "</a></li>";
      };

      OutcomesDirectoryView.prototype.showPaginationLoader = function() {
        var _ref1;

        return this.$el.append((_ref1 = this.$paginationLoader) != null ? _ref1 : this.$paginationLoader = $(this.paginationLoaderTemplate()));
      };

      OutcomesDirectoryView.prototype.fetchOutcomes = function() {
        var _this = this;

        this.collection = this.outcomes;
        this.bindPaginationEvents();
        this.outcomes.fetch({
          success: function() {
            return _this.loadDfd.resolve(_this);
          }
        });
        return this.showPaginationLoader();
      };

      OutcomesDirectoryView.prototype.triggerSelect = function(sv) {
        this.clearSelection();
        this.selectedModel = sv.model;
        sv.select();
        return this.trigger('select', this, sv.model);
      };

      OutcomesDirectoryView.prototype.views = function() {
        var v, _i, _len, _ref1;

        if (this._views && !_.isEmpty(this._views)) {
          return this._views;
        }
        this._views = this._viewsFor(this.groups.models, OutcomeGroupIconView).concat(this._viewsFor(this.outcomes.models, OutcomeIconView));
        _ref1 = this._views;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          v = _ref1[_i];
          v.on('select', this.triggerSelect);
          if (v.model === this.selectedModel) {
            v.select();
          }
        }
        return this._views;
      };

      OutcomesDirectoryView.prototype.reset = function() {
        this._clearViews();
        return this.render();
      };

      OutcomesDirectoryView.prototype.removeGroup = function(group) {
        var _ref1;

        this.reset();
        if (group === ((_ref1 = _.last(this.sidebar.directories)) != null ? _ref1.outcomeGroup : void 0)) {
          return this.trigger('select', this, null);
        }
      };

      OutcomesDirectoryView.prototype.remove = function() {
        this._clearViews();
        this.selectedModel = null;
        return OutcomesDirectoryView.__super__.remove.apply(this, arguments);
      };

      OutcomesDirectoryView.prototype.clearSelection = function(e) {
        if (e != null) {
          e.preventDefault();
        }
        this.prevSelectedModel = this.selectedModel;
        this.selectedModel = null;
        return _.each(this.views(), function(v) {
          return v.unSelect();
        });
      };

      OutcomesDirectoryView.prototype.clearOutcomeSelection = function() {
        if (this.selectedModel instanceof Outcome) {
          return this.clearSelection();
        }
      };

      OutcomesDirectoryView.prototype.render = function() {
        var _this = this;

        this.$el.empty();
        _.each(this.views(), function(v) {
          return _this.$el.append(v.render().el);
        });
        if (!this.readOnly) {
          this.initDroppable();
        }
        this.$('li:first').attr('tabindex', 0);
        this.$el.data('view', this);
        return this;
      };

      OutcomesDirectoryView.prototype._viewsFor = function(models, viewClass) {
        var _this = this;

        return _.map(models, function(model) {
          return new viewClass({
            model: model,
            readOnly: _this.readOnly,
            dir: _this
          });
        });
      };

      OutcomesDirectoryView.prototype._clearViews = function() {
        _.each(this._views, function(v) {
          return v.remove();
        });
        return this._views = null;
      };

      return OutcomesDirectoryView;

    })(PaginatedView);
  });

}).call(this);
