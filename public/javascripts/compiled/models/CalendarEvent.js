(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['Backbone'], function(_arg) {
    var CalendarEvent, Model, _ref;

    Model = _arg.Model;
    return CalendarEvent = (function(_super) {
      __extends(CalendarEvent, _super);

      function CalendarEvent() {
        _ref = CalendarEvent.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CalendarEvent.prototype.url = 'api/v1/calendar_events';

      CalendarEvent.prototype.defaults = {
        title: 'No Title',
        start_at: null,
        end_at: null,
        context_code: null
      };

      CalendarEvent.prototype.toJSON = function() {
        return {
          calendar_event: CalendarEvent.__super__.toJSON.apply(this, arguments)
        };
      };

      return CalendarEvent;

    })(Model);
  });

}).call(this);
