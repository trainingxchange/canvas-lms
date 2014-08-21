(function() {
  define(['react', 'timezone', 'underscore', 'jquery', 'jquery.instructure_date_and_time'], function(React, tz, _, $) {
    var FriendlyDatetime;

    return FriendlyDatetime = React.createClass({
      propTypes: {
        datetime: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.instanceOf(Date)])
      },
      render: function() {
        var datetime, fudged, timeTitle;

        datetime = this.props.datetime;
        if (datetime == null) {
          return;
        }
        if (!_.isDate(datetime)) {
          datetime = tz.parse(datetime);
        }
        fudged = $.fudgeDateForProfileTimezone(datetime);
        timeTitle = $.datetimeString(datetime);
        return this.transferPropsTo(React.DOM.time({
          title: $.datetimeString(datetime),
          dateTime: datetime.toISOString()
        }, $.friendlyDatetime(fudged)));
      }
    });
  });

}).call(this);
