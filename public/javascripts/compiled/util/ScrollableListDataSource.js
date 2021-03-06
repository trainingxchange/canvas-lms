(function() {
  var __slice = [].slice;

  define(['jquery', 'jquery.ajaxJSON'], function($) {
    return (function() {
      function _Class(list, options) {
        var _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;

        this.list = list;
        this.pageOffset = (_ref = options.pageOffset) != null ? _ref : 1;
        this.perPage = (_ref1 = options.perPage) != null ? _ref1 : 25;
        this.pageKey = (_ref2 = options.pageKey) != null ? _ref2 : 'page';
        this.perPageKey = (_ref3 = options.perPageKey) != null ? _ref3 : 'per_page';
        this.itemIdsKey = (_ref4 = options.itemIdsKey) != null ? _ref4 : 'item_ids';
        this.itemsKey = (_ref5 = options.itemsKey) != null ? _ref5 : 'items';
        this.sortKey = (_ref6 = options.sortKey) != null ? _ref6 : 'id';
        this.sortDir = (_ref7 = options.sortDir) != null ? _ref7 : 'asc';
        this.params = (_ref8 = options.params) != null ? _ref8 : {};
        this.baseUrl = options.baseUrl;
        this.model = options.model;
      }

      _Class.prototype.load = function(options, cb) {
        this.initialized = true;
        if (options.sortKey != null) {
          this.sortKey = options.sortKey;
        }
        if (options.params != null) {
          this.params = options.params;
        }
        this.itemIds = null;
        this.items = [];
        this.pages = [];
        this.resetRequests();
        return this.fetchPage(0, cb);
      };

      _Class.prototype.addItem = function(item) {
        this._addItem(this.modelize(item));
        return this.recompute();
      };

      _Class.prototype.updateItems = function(items) {
        var doTransitions, item, _i, _len;

        items = this.modelize(items);
        doTransitions = items.length <= 1;
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (!item.get('visible') && !item.get('defer_visibility_check')) {
            this._removeItem(item, doTransitions);
          } else if (this.itemMap[item.id] != null) {
            this._updateItem(item, doTransitions);
          } else {
            this._addItem(item, doTransitions);
          }
        }
        return this.recompute(!doTransitions);
      };

      _Class.prototype.removeItem = function(item) {
        this._removeItem(this.modelize(item));
        return this.recompute();
      };

      _Class.prototype.modelize = function(data) {
        var item, modelize, _i, _len, _results,
          _this = this;

        modelize = function(item) {
          item = new _this.model(item);
          item.list = _this.list;
          return item;
        };
        if (data.length != null) {
          _results = [];
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            item = data[_i];
            _results.push(modelize(item));
          }
          return _results;
        } else {
          return modelize(data);
        }
      };

      _Class.prototype.positionOrReload = function(item, currPos) {
        var pos, _ref;

        pos = this.positionFor(item, currPos);
        if ((pos != null) && !this.deferredPositionChecks) {
          return pos;
        } else {
          if ((_ref = this.deferredPositionChecks) == null) {
            this.deferredPositionChecks = [];
          }
          this.deferredPositionChecks.push(item.id);
          return null;
        }
      };

      _Class.prototype.positionFor = function(item, currPos) {
        var goesBefore, i, unmoved, _i, _ref, _ref1, _ref2,
          _this = this;

        goesBefore = (this.sortDir === 'asc' ? function(a, b) {
          return a.get(_this.sortKey) < b.get(_this.sortKey);
        } : function(a, b) {
          return a.get(_this.sortKey) > b.get(_this.sortKey);
        });
        for (i = _i = 0, _ref = this.items.length - 1; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          if (this.items[i]) {
            unmoved = currPos === i && item.id === this.items[i].id && item.get(this.sortKey) === this.items[i].get(this.sortKey);
            if (unmoved || goesBefore(item, this.items[i])) {
              if (i > 1 && !this.items[i - 1]) {
                return null;
              }
              return i;
            }
          }
        }
        if (this.items.length === ((_ref1 = this.itemIds) != null ? _ref1.length : void 0) || ((_ref2 = this.itemIds) != null ? _ref2.length : void 0) === 0) {
          return this.itemIds.length;
        }
      };

      _Class.prototype.refreshList = function() {
        var offset, page, _i, _ref, _results;

        _results = [];
        for (page = _i = 0, _ref = this.pages.length; 0 <= _ref ? _i < _ref : _i > _ref; page = 0 <= _ref ? ++_i : --_i) {
          if (!(this.pages[page] === 'loaded')) {
            continue;
          }
          offset = page * this.perPage;
          _results.push(this.list.replaceItems(offset, this.items.slice(offset, Math.min(offset + this.perPage, this.itemIds.length)), this.itemIds.length));
        }
        return _results;
      };

      _Class.prototype.fetchRange = function(start, end) {
        var endPage, page, startPage, _i;

        if (end == null) {
          end = start;
        }
        if (!this.itemIds) {
          return [];
        }
        startPage = Math.floor(start / this.perPage);
        endPage = Math.floor(end / this.perPage);
        endPage = Math.min(endPage, Math.floor(this.itemIds.length / this.perPage));
        for (page = _i = startPage; startPage <= endPage ? _i <= endPage : _i >= endPage; page = startPage <= endPage ? ++_i : --_i) {
          if (!this.pages[page]) {
            this.fetchPage(page);
          }
        }
        return this.requests;
      };

      _Class.prototype.fetchPage = function(page, cb) {
        var params, _ref,
          _this = this;

        params = $.extend({}, this.params);
        params[this.perPageKey] = this.perPage;
        params[this.pageKey] = page + this.pageOffset;
        this.pages[page] = 'loading';
        if ((_ref = this.requests[page]) != null) {
          _ref.abort();
        }
        return this.requests[page] = $.ajaxJSON(this.baseUrl, 'GET', params, function(data) {
          var itemIds, items;

          delete _this.requests[page];
          items = _this.modelize(data[_this.itemsKey]);
          itemIds = data[_this.itemIdsKey];
          _this.fetchedPage(page, itemIds, items);
          return typeof cb === "function" ? cb(itemIds.length) : void 0;
        });
      };

      _Class.prototype.fetchedPage = function(page, itemIds, items) {
        var numToReplace, offset, _base, _ref, _ref1, _ref2;

        offset = page * this.perPage;
        numToReplace = items.length;
        if (itemIds.length < (page + 1) * this.perPage) {
          numToReplace = ((_ref = []) != null ? _ref : this.itemIds).length - offset;
        }
        this.setItemIds(itemIds, page);
        if ((_ref1 = (_base = this.items)[offset]) == null) {
          _base[offset] = null;
        }
        (_ref2 = this.items).splice.apply(_ref2, [offset, numToReplace].concat(__slice.call(items)));
        this.pages[page] = 'loaded';
        return this.list.replaceItems(offset, items, this.itemIds.length);
      };

      _Class.prototype.resetRequests = function() {
        var request, _i, _len, _ref;

        if (this.requests) {
          _ref = this.requests;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            request = _ref[_i];
            if (request != null) {
              request.abort();
            }
          }
        }
        return this.requests = [];
      };

      _Class.prototype.setItemIds = function(itemIds, requestingPage) {
        var initialFetch;

        initialFetch = this.itemIds == null;
        if (!initialFetch && this.itemIds.toString() === itemIds.toString()) {
          return;
        }
        this.itemIds = itemIds;
        this.resetItemMap();
        if (!initialFetch) {
          return this.refetchPages(requestingPage);
        }
      };

      _Class.prototype.resetItemMap = function() {
        var i, _i, _ref, _results;

        this.itemMap = {};
        _results = [];
        for (i = _i = 0, _ref = this.itemIds.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(this.itemMap[this.itemIds[i]] = i);
        }
        return _results;
      };

      _Class.prototype.recompute = function(refresh) {
        var page, _i, _ref,
          _this = this;

        if (refresh == null) {
          refresh = false;
        }
        if (this.deferredPositionChecks) {
          return this.fetchPage(0, function() {
            var id, _i, _len, _ref;

            _ref = _this.deferredPositionChecks;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              id = _ref[_i];
              _this.fetchRange(_this.itemMap[id]);
            }
            delete _this.deferredPositionChecks;
            if (refresh) {
              return _this.refreshList();
            }
          });
        } else {
          for (page = _i = 0, _ref = this.pages.length; 0 <= _ref ? _i < _ref : _i > _ref; page = 0 <= _ref ? ++_i : --_i) {
            if (this.pages[page] === 'loaded') {
              this.checkPage(page);
            }
          }
          if (refresh) {
            return this.refreshList();
          }
        }
      };

      _Class.prototype.refetchPages = function(except) {
        var page, _i, _ref, _ref1, _results;

        _results = [];
        for (page = _i = 0, _ref = this.pages.length; 0 <= _ref ? _i < _ref : _i > _ref; page = 0 <= _ref ? ++_i : --_i) {
          if (this.pages[page] === 'loaded' && page !== except) {
            if (page * this.perPage < this.itemIds.length) {
              _results.push(this.fetchPage(page));
            } else {
              if ((_ref1 = this.requests[page]) != null) {
                _ref1.abort();
              }
              _results.push(delete this.pages[page]);
            }
          }
        }
        return _results;
      };

      _Class.prototype.checkPage = function(page) {
        var i, offset, _i, _ref;

        offset = page * this.perPage;
        for (i = _i = offset, _ref = Math.min(offset + this.perPage, this.itemIds.length); offset <= _ref ? _i < _ref : _i > _ref; i = offset <= _ref ? ++_i : --_i) {
          if (!this.items[i]) {
            return this.fetchPage(page);
          }
        }
      };

      _Class.prototype._addItem = function(item, updateUi, overridePos) {
        var pos;

        if (updateUi == null) {
          updateUi = true;
        }
        if (overridePos == null) {
          overridePos = null;
        }
        pos = overridePos != null ? overridePos : this.positionOrReload(item);
        if (pos == null) {
          return;
        }
        this.itemIds.splice(pos, 0, item.id);
        this.items.splice(pos, 0, item);
        if (updateUi) {
          this.list.addedItem(item, pos);
        }
        return this.resetItemMap();
      };

      _Class.prototype._updateItem = function(item, updateUi, overridePos) {
        var currPos, newPos;

        if (updateUi == null) {
          updateUi = true;
        }
        if (overridePos == null) {
          overridePos = null;
        }
        currPos = this.itemMap[item.id];
        newPos = overridePos != null ? overridePos : this.positionOrReload(item, currPos);
        if (this.items[currPos]) {
          item = this.items[currPos].set(item.toJSON());
        }
        if (newPos == null) {
          return;
        }
        if (newPos !== currPos) {
          this._moveItem(item, currPos, newPos);
        }
        if (updateUi) {
          this.list.updatedItem(item, currPos, newPos);
        }
        return this.resetItemMap();
      };

      _Class.prototype._moveItem = function(item, currPos, newPos) {
        if (newPos > currPos) {
          newPos--;
        }
        this._removeItem(item, false, currPos);
        return this._addItem(item, false, newPos);
      };

      _Class.prototype._removeItem = function(item, updateUi, pos) {
        if (updateUi == null) {
          updateUi = true;
        }
        if (pos == null) {
          pos = null;
        }
        if (pos == null) {
          pos = this.itemMap[item.id];
        }
        if (pos == null) {
          return;
        }
        this.itemIds.splice(pos, 1);
        if (this.items.length >= pos) {
          this.items.splice(pos, 1);
        }
        if (updateUi) {
          this.list.removedItem(item, pos);
        }
        return this.resetItemMap();
      };

      return _Class;

    })();
  });

}).call(this);
