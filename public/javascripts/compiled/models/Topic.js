(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  define(['i18n!discussions', 'jquery', 'underscore', 'Backbone', 'compiled/util/BackoffPoller', 'compiled/arr/walk', 'compiled/arr/erase', 'jquery.ajaxJSON'], function(I18n, $, _arg, Backbone, BackoffPoller, walk, erase) {
    var MaterializedDiscussionTopic, UNKNOWN_AUTHOR, each, _ref;

    each = _arg.each;
    UNKNOWN_AUTHOR = {
      avatar_image_url: null,
      display_name: I18n.t('uknown_author', 'Unknown Author'),
      id: null
    };
    return MaterializedDiscussionTopic = (function(_super) {
      __extends(MaterializedDiscussionTopic, _super);

      function MaterializedDiscussionTopic() {
        this.parseNewEntry = __bind(this.parseNewEntry, this);
        this.parseEntry = __bind(this.parseEntry, this);        _ref = MaterializedDiscussionTopic.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      MaterializedDiscussionTopic.prototype.defaults = {
        view: [],
        entries: [],
        new_entries: [],
        unread_entries: [],
        forced_entries: []
      };

      MaterializedDiscussionTopic.prototype.url = function() {
        return "" + (this.get('root_url')) + "?include_new_entries=1";
      };

      MaterializedDiscussionTopic.prototype.fetch = function(options) {
        var loader,
          _this = this;

        if (options == null) {
          options = {};
        }
        loader = new BackoffPoller(this.url(), function(data, xhr) {
          if (xhr.status === 503) {
            return 'continue';
          }
          if (xhr.status !== 200) {
            return 'abort';
          }
          _this.set(_this.parse(data, 200, xhr));
          if (typeof options.success === "function") {
            options.success(_this, data);
          }
          return 'stop';
        }, {
          handleErrors: true,
          initialDelay: false,
          baseInterval: 2000,
          maxAttempts: 12,
          backoffFactor: 1.6
        });
        return loader.start();
      };

      MaterializedDiscussionTopic.prototype.markAllAsRead = function() {
        $.ajaxJSON(ENV.DISCUSSION.MARK_ALL_READ_URL, 'PUT', {
          forced_read_state: false
        });
        return this.setAllReadState('read');
      };

      MaterializedDiscussionTopic.prototype.markAllAsUnread = function() {
        $.ajaxJSON(ENV.DISCUSSION.MARK_ALL_UNREAD_URL, 'DELETE', {
          forced_read_state: false
        });
        return this.setAllReadState('unread');
      };

      MaterializedDiscussionTopic.prototype.setAllReadState = function(newReadState) {
        return each(this.flattened, function(entry) {
          return entry.read_state = newReadState;
        });
      };

      MaterializedDiscussionTopic.prototype.parse = function(data, status, xhr) {
        this.data = data;
        this.data.entries = [];
        this.flattened = {};
        this.lastRoot = null;
        this.participants = {};
        this.flattenParticipants();
        walk(this.data.view, 'replies', this.parseEntry);
        each(this.data.new_entries, this.parseNewEntry);
        delete this.lastRoot;
        return this.data;
      };

      MaterializedDiscussionTopic.prototype.flattenParticipants = function() {
        var participant, _i, _len, _ref1, _results;

        _ref1 = this.data.participants;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          participant = _ref1[_i];
          _results.push(this.participants[participant.id] = participant);
        }
        return _results;
      };

      MaterializedDiscussionTopic.prototype.setEntryAuthor = function(entry) {
        if (entry.user_id != null) {
          return entry.author = this.participants[entry.user_id];
        } else {
          return entry.author = UNKNOWN_AUTHOR;
        }
      };

      MaterializedDiscussionTopic.prototype.parseEntry = function(entry) {
        var parent, _ref1, _ref2;

        this.flattened[entry.id] = entry;
        parent = this.flattened[entry.parent_id];
        entry.parent = parent;
        if (_ref1 = entry.id, __indexOf.call(this.data.unread_entries, _ref1) >= 0) {
          entry.read_state = 'unread';
        }
        if (_ref2 = entry.id, __indexOf.call(this.data.forced_entries, _ref2) >= 0) {
          entry.forced_read_state = true;
        }
        this.setEntryAuthor(entry);
        if (entry.editor_id != null) {
          entry.editor = this.participants[entry.editor_id];
        }
        if (entry.parent_id != null) {
          entry.root_entry = this.lastRoot;
          entry.root_entry_id = this.lastRoot.id;
        } else {
          this.lastRoot = entry;
          this.data.entries.push(entry);
        }
        return entry;
      };

      MaterializedDiscussionTopic.prototype.parseNewEntry = function(entry) {
        var parent, _ref1;

        this.flattened[entry.id] = entry;
        parent = this.flattened[entry.parent_id];
        this.setEntryAuthor(entry);
        if (parent != null) {
          ((_ref1 = parent.replies) != null ? _ref1 : parent.replies = []).push(entry);
          entry.parent = parent;
          while (parent.parent) {
            parent = parent.parent;
          }
          entry.root_entry = parent;
          return entry.root_entry_id = parent.id;
        } else {
          return this.data.entries.push(entry);
        }
      };

      MaterializedDiscussionTopic.prototype.maybeRemove = function(entry) {
        var _ref1;

        if (entry.deleted && !entry.replies) {
          if (((_ref1 = entry.parent) != null ? _ref1.replies : void 0) != null) {
            erase(entry.parent.replies, entry);
          }
          return delete this.flattened[entry.id];
        }
      };

      return MaterializedDiscussionTopic;

    })(Backbone.Model);
  });

}).call(this);
