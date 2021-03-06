(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(['jquery', 'i18n!calendar', 'compiled/calendar/TimeBlockListManager', 'compiled/calendar/TimeBlockRow', 'jquery.instructure_date_and_time', 'jquery.instructure_forms', 'vendor/date'], function($, I18n, TimeBlockListManager, TimeBlockRow) {
    var TimeBlockList;

    return TimeBlockList = (function() {
      function TimeBlockList(element, splitterSelector, blocks) {
        this.handleSplitClick = __bind(this.handleSplitClick, this);
        this.addRow = __bind(this.addRow, this);
        var _this = this;

        this.element = $(element);
        this.splitterDiv = $(splitterSelector);
        this.blocksManager = new TimeBlockListManager(blocks);
        this.splitterDiv.find('.split-link').click(this.handleSplitClick);
        this.element.delegate('input', 'change', function(event) {
          if ($(event.currentTarget).closest('tr').is(':last-child')) {
            return _this.addRow();
          }
        });
        this.render();
      }

      TimeBlockList.prototype.render = function() {
        var block, _i, _len, _ref;

        this.rows = [];
        this.element.empty();
        _ref = this.blocksManager.blocks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          block = _ref[_i];
          this.addRow(block);
        }
        return this.addRow();
      };

      TimeBlockList.prototype.rowRemoved = function(rowToRemove) {
        var aNonLockedRowExists, row;

        this.rows = (function() {
          var _i, _len, _ref, _results;

          _ref = this.rows;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            row = _ref[_i];
            if (!(row !== rowToRemove)) {
              continue;
            }
            if (!row.locked) {
              aNonLockedRowExists = true;
            }
            _results.push(row);
          }
          return _results;
        }).call(this);
        if (!aNonLockedRowExists) {
          return this.addRow();
        }
      };

      TimeBlockList.prototype.addRow = function(data) {
        var row;

        row = new TimeBlockRow(this, data);
        this.element.append(row.$row);
        this.rows.push(row);
        return row;
      };

      TimeBlockList.prototype.handleSplitClick = function(event) {
        var duration;

        event.preventDefault();
        duration = this.splitterDiv.find('[name=duration]').val();
        return this.split(duration);
      };

      TimeBlockList.prototype.split = function(minutes) {
        if (minutes && this.validate()) {
          this.blocksManager.split(minutes);
          return this.render();
        }
      };

      TimeBlockList.prototype.validate = function() {
        var row, valid, _i, _len, _ref, _ref1;

        valid = true;
        this.blocksManager.reset();
        _ref = this.rows;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          if (row.validate()) {
            if (!row.blank()) {
              (_ref1 = this.blocksManager).add.apply(_ref1, row.getData());
            }
          } else {
            valid = false;
          }
        }
        if (!valid) {
          alert(I18n.t('time_block_errors', 'There are errors in your time block selections.'));
        }
        return valid;
      };

      TimeBlockList.prototype.blocks = function() {
        var range, _i, _len, _ref, _results;

        _ref = this.blocksManager.blocks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          range = _ref[_i];
          if (!range.locked) {
            _results.push([range.start, range.end]);
          }
        }
        return _results;
      };

      return TimeBlockList;

    })();
  });

}).call(this);
