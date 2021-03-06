(function() {
  define(['i18nObj'], function(I18n) {
    return {
      weekMode: 'variable',
      allDayDefault: false,
      ignoreTimezone: true,
      lazyFetching: false,
      monthNames: I18n.lookup('date.month_names').slice(1, 13),
      monthNamesShort: I18n.lookup('date.abbr_month_names').slice(1, 13),
      dayNames: I18n.lookup('date.day_names'),
      dayNamesShort: I18n.lookup('date.abbr_day_names')
    };
  });

}).call(this);
