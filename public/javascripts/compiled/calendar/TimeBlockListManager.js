(function() {
  define(['jquery'], function($) {
    var TimeBlockListManager;

    return TimeBlockListManager = (function() {
      function TimeBlockListManager(blocks) {
        var end, locked, start, _i, _len, _ref;

        this.blocks = [];
        if (blocks) {
          for (_i = 0, _len = blocks.length; _i < _len; _i++) {
            _ref = blocks[_i], start = _ref[0], end = _ref[1], locked = _ref[2];
            this.add(start, end, locked);
          }
        }
      }

      TimeBlockListManager.prototype.add = function(start, end, locked) {
        return this.blocks.push({
          start: start,
          end: end,
          locked: locked
        });
      };

      TimeBlockListManager.prototype.consolidate = function() {
        var block, consolidatedBlocks, lastBlock, _i, _len, _ref;

        this.sort();
        consolidatedBlocks = [];
        consolidatedBlocks.last = function() {
          return this[this.length - 1];
        };
        _ref = this.blocks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          block = _ref[_i];
          if (!consolidatedBlocks.last()) {
            consolidatedBlocks.push(block);
            continue;
          }
          lastBlock = consolidatedBlocks.last();
          if (lastBlock.end.getTime() === block.start.getTime() && !lastBlock.locked && !block.locked) {
            lastBlock.end = block.end;
          } else {
            consolidatedBlocks.push(block);
          }
        }
        return this.blocks = consolidatedBlocks;
      };

      TimeBlockListManager.prototype.split = function(minutes) {
        var block, newStart, oldStart, splitBlockLength, _i, _len, _ref;

        this.consolidate();
        splitBlockLength = minutes * 60 * 1000;
        _ref = this.blocks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          block = _ref[_i];
          if (block.locked) {
            continue;
          }
          while (block.end - block.start > minutes * 60 * 1000) {
            oldStart = block.start;
            newStart = new Date(block.start.getTime() + splitBlockLength);
            block.start = new Date(block.start.getTime() + splitBlockLength);
            this.add(oldStart, newStart);
          }
        }
        return this.sort();
      };

      TimeBlockListManager.prototype.sort = function() {
        return this.blocks = this.blocks.sort(function(a, b) {
          if (a.end <= b.start) {
            return -1;
          } else {
            return 1;
          }
        });
      };

      TimeBlockListManager.prototype["delete"] = function(index) {
        if ((index != null) && this.blocks.length > index && !this.blocks[index].locked) {
          return this.blocks.splice(index, 1);
        }
      };

      TimeBlockListManager.prototype.reset = function() {
        return this.blocks = [];
      };

      return TimeBlockListManager;

    })();
  });

}).call(this);
