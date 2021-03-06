(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone', 'underscore'], function(Backbone, _) {
    var UniqueDropdownCollection, _ref;

    return UniqueDropdownCollection = (function(_super) {
      __extends(UniqueDropdownCollection, _super);

      function UniqueDropdownCollection() {
        this.removeModel = __bind(this.removeModel, this);
        this.updateAvailableValues = __bind(this.updateAvailableValues, this);
        this.calculateTakenValues = __bind(this.calculateTakenValues, this);        _ref = UniqueDropdownCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      UniqueDropdownCollection.prototype.initialize = function(records, options) {
        if (options == null) {
          options = {};
        }
        this.takenValues || (this.takenValues = new Backbone.Collection([]));
        this.availableValues || (this.availableValues = new Backbone.Collection([]));
        this.possibleValues = options.possibleValues, this.propertyName = options.propertyName;
        this.availableValues.comparator = 'value';
        this.calculateTakenValues(records);
        this.on("reset", this.calculateTakenValues);
        this.on("change:" + this.propertyName, this.updateAvailableValues);
        return this.on("remove", this.removeModel);
      };

      UniqueDropdownCollection.prototype.calculateTakenValues = function(records) {
        var model, takenValue, takenValues, value, _i, _j, _len, _len1, _ref1, _results,
          _this = this;

        if (records instanceof Backbone.Collection) {
          takenValues = records.map(function(m) {
            return m.get(_this.propertyName);
          });
        } else {
          takenValues = (function() {
            var _i, _len, _results;

            _results = [];
            for (_i = 0, _len = records.length; _i < _len; _i++) {
              model = records[_i];
              _results.push(model.get(this.propertyName));
            }
            return _results;
          }).call(this);
        }
        this.takenValues.reset(null, {
          silent: true
        });
        this.availableValues.reset(null, {
          silent: true
        });
        for (_i = 0, _len = takenValues.length; _i < _len; _i++) {
          takenValue = takenValues[_i];
          this.takenValues.add(new Backbone.Model({
            id: takenValue,
            value: takenValue
          }));
        }
        _ref1 = _.difference(this.possibleValues, takenValues);
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          value = _ref1[_j];
          _results.push(this.availableValues.add(new Backbone.Model({
            id: value,
            value: value
          })));
        }
        return _results;
      };

      UniqueDropdownCollection.prototype.updateAvailableValues = function(model) {
        var currentValue, previousValue, previouslyAvailableValue, previouslyTakenValue;

        previousValue = model.previousAttributes()[this.propertyName];
        currentValue = model.get(this.propertyName);
        previouslyAvailableValue = this.availableValues.get(currentValue);
        previouslyTakenValue = this.takenValues.get(previousValue);
        this.availableValues.remove(previouslyAvailableValue);
        this.takenValues.remove(previouslyTakenValue);
        this.takenValues.add(previouslyAvailableValue);
        return this.availableValues.add(previouslyTakenValue);
      };

      UniqueDropdownCollection.prototype.removeModel = function(model) {
        var previouslyTakenValue, value;

        value = model.get(this.propertyName);
        previouslyTakenValue = this.takenValues.get(value);
        this.takenValues.remove(previouslyTakenValue);
        return this.availableValues.add(previouslyTakenValue);
      };

      UniqueDropdownCollection.prototype.findNextAvailable = function() {
        return this.availableValues.at(0);
      };

      UniqueDropdownCollection.prototype.add = function(models, options) {
        var previouslyAvailableValue;

        if (!_.isArray(models) && (typeof models === 'object') && !(models instanceof Backbone.Model)) {
          previouslyAvailableValue = this.findNextAvailable();
          this.availableValues.remove(previouslyAvailableValue);
          this.takenValues.add(previouslyAvailableValue);
          models[this.propertyName] = previouslyAvailableValue.get('value');
        }
        return UniqueDropdownCollection.__super__.add.apply(this, arguments);
      };

      return UniqueDropdownCollection;

    })(Backbone.Collection);
  });

}).call(this);
