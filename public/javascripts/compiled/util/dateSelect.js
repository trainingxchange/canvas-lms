(function() {
  define(['i18n!instructure', 'jquery', 'underscore', 'str/htmlEscape'], function(I18n, $, _, h) {
    var builders, dateSelect;

    builders = {
      year: function(options, htmlOptions) {
        var $result, i, step;

        step = options.startYear < options.endYear ? 1 : -1;
        $result = $('<select />', htmlOptions);
        if (options.includeBlank) {
          $result.append('<option />');
        }
        i = options.startYear;
        while (i * step <= options.endYear * step) {
          i += step;
          $result.append($('<option value="' + i + '">' + i + '</option>'));
        }
        return $result;
      },
      month: function(options, htmlOptions, dateSettings) {
        var $result, i, months, _i;

        months = dateSettings.month_names;
        $result = $('<select />', htmlOptions);
        if (options.includeBlank) {
          $result.append('<option />');
        }
        for (i = _i = 1; _i <= 12; i = ++_i) {
          $result.append($('<option value="' + i + '">' + h(months[i]) + '</option>'));
        }
        return $result;
      },
      day: function(options, htmlOptions) {
        var $result, i, _i;

        $result = $('<select />', htmlOptions);
        if (options.includeBlank) {
          $result.append('<option />');
        }
        for (i = _i = 1; _i <= 31; i = ++_i) {
          $result.append($('<option value="' + i + '">' + i + '</option>'));
        }
        return $result;
      }
    };
    return dateSelect = function(name, options, htmlOptions) {
      var $result, dateSettings, i, opt, position, tName, type, validOptions, year, _i, _j, _len, _ref, _ref1;

      if (htmlOptions == null) {
        htmlOptions = _.clone(options);
      }
      validOptions = ['type', 'startYear', 'endYear', 'includeBlank', 'order'];
      for (_i = 0, _len = validOptions.length; _i < _len; _i++) {
        opt = validOptions[_i];
        delete htmlOptions[opt];
      }
      if ((_ref = htmlOptions['class']) == null) {
        htmlOptions['class'] = '';
      }
      htmlOptions['class'] += ' date-select';
      year = (new Date()).getFullYear();
      position = {
        year: 1,
        month: 2,
        day: 3
      };
      dateSettings = I18n.lookup('#date');
      if (options.type === 'birthdate') {
        _.defaults(options, {
          startYear: year - 1,
          endYear: year - 125,
          includeBlank: true
        });
      }
      _.defaults(options, {
        startYear: year - 5,
        endYear: year + 5,
        order: dateSettings.order || ['year', 'month', 'day']
      });
      $result = $('<span>');
      for (i = _j = 0, _ref1 = options.order.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        type = options.order[i];
        tName = name.replace(/(\]?)$/, "(" + position[type] + "i)$1");
        $result.append(builders[type](options, _.extend({
          name: tName
        }, htmlOptions), dateSettings));
        delete htmlOptions.id;
      }
      return $result;
    };
  });

}).call(this);
