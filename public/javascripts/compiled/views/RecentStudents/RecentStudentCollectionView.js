(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['jquery', 'underscore', 'compiled/views/PaginatedView', 'compiled/views/RecentStudents/RecentStudentView'], function($, _, PaginatedView, RecentStudentView) {
    var RecentStudentCollectionView, _ref;

    return RecentStudentCollectionView = (function(_super) {
      __extends(RecentStudentCollectionView, _super);

      function RecentStudentCollectionView() {
        this.renderUser = __bind(this.renderUser, this);
        this.render = __bind(this.render, this);        _ref = RecentStudentCollectionView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      RecentStudentCollectionView.prototype.initialize = function(options) {
        this.collection.on('add', this.renderUser);
        this.collection.on('reset', this.render);
        this.paginationScrollContainer = this.$el;
        return RecentStudentCollectionView.__super__.initialize.apply(this, arguments);
      };

      RecentStudentCollectionView.prototype.render = function() {
        var ret,
          _this = this;

        ret = RecentStudentCollectionView.__super__.render.apply(this, arguments);
        this.collection.each(function(user) {
          return _this.renderUser(user);
        });
        return ret;
      };

      RecentStudentCollectionView.prototype.renderUser = function(user) {
        user.set('course_id', this.collection.course_id, {
          silent: true
        });
        return this.$el.append((new RecentStudentView({
          model: user
        })).render().el);
      };

      return RecentStudentCollectionView;

    })(PaginatedView);
  });

}).call(this);
