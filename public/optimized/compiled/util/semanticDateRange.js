(function(){define(["i18n!dates","jquery","timezone","jquery.instructure_date_and_time"],function(t,n,e){var a;return a=function(a,i){var r,m;return a?(m=e.parse(a),r=e.parse(i),+m!==+r?n.sameDate(m,r)?'<span class="date-range">\n  <time datetime=\''+m.toISOString()+"'>\n    "+n.dateString(m)+", "+n.timeString(m)+"\n  </time> -\n  <time datetime='"+r.toISOString()+"'>\n    "+n.timeString(r)+"\n  </time>\n</span>":'<span class="date-range">\n  <time datetime=\''+m.toISOString()+"'>\n    "+n.datetimeString(m)+"\n  </time> -\n  <time datetime='"+r.toISOString()+"'>\n    "+n.datetimeString(r)+"\n  </time>\n</span>":'<span class="date-range">\n  <time datetime=\''+m.toISOString()+"'>\n    "+n.datetimeString(m)+"\n  </time>\n</span>"):'<span class="date-range date-range-no-date">\n  '+t.t("no_date","No Date")+"\n</span>"}})}).call(this);