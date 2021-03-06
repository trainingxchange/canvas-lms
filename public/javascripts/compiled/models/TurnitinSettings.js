(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty;

  define([], function() {
    var TurnitinSettings;

    return TurnitinSettings = (function() {
      function TurnitinSettings(options) {
        if (options == null) {
          options = {};
        }
        this.present = __bind(this.present, this);
        this.excludesSmallMatches = __bind(this.excludesSmallMatches, this);
        this.toJSON = __bind(this.toJSON, this);
        this.percent = __bind(this.percent, this);
        this.words = __bind(this.words, this);
        this.sPaperCheck = options.s_paper_check || false;
        this.originalityReportVisibility = options.originality_report_visibility || false;
        this.internetCheck = options.internet_check || false;
        this.excludeBiblio = options.exclude_biblio || false;
        this.excludeQuoted = options.exclude_quoted || false;
        this.journalCheck = options.journal_check || false;
        this.excludeSmallMatchesType = options.exclude_small_matches_type;
        this.excludeSmallMatchesValue = options.exclude_small_matches_value || 0;
      }

      TurnitinSettings.prototype.words = function() {
        if (this.excludeSmallMatchesType === 'percent') {
          return "";
        } else {
          return this.excludeSmallMatchesValue;
        }
      };

      TurnitinSettings.prototype.percent = function() {
        if (this.excludeSmallMatchesType === 'words') {
          return "";
        } else {
          return this.excludeSmallMatchesValue;
        }
      };

      TurnitinSettings.prototype.toJSON = function() {
        return {
          s_paper_check: this.sPaperCheck,
          originality_report_visibility: this.originalityReportVisibility,
          internet_check: this.internetCheck,
          exclude_biblio: this.excludeBiblio,
          exclude_quoted: this.excludeQuoted,
          journal_check: this.journalCheck,
          exclude_small_matches_type: this.excludeSmallMatchesType,
          exclude_small_matches_value: this.excludeSmallMatchesValue
        };
      };

      TurnitinSettings.prototype.excludesSmallMatches = function() {
        return !(this.excludeSmallMatchesType == null);
      };

      TurnitinSettings.prototype.present = function() {
        var json, key, value;

        json = {};
        for (key in this) {
          if (!__hasProp.call(this, key)) continue;
          value = this[key];
          json[key] = value;
        }
        json.excludesSmallMatches = this.excludesSmallMatches();
        json.words = this.words();
        json.percent = this.percent();
        return json;
      };

      return TurnitinSettings;

    })();
  });

}).call(this);
