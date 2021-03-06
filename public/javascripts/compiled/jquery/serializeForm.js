(function() {
  define(['jquery'], function($) {
    var elements, getValue, isSerializable, rCRLF, resultFor, rinput, rselectTextarea;

    rselectTextarea = /^(?:select|textarea)/i;
    rCRLF = /\r?\n/g;
    rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week|file)$/i;
    elements = function() {
      if (this.elements) {
        return $.makeArray(this.elements);
      } else {
        elements = $(this).find(':input');
        if (elements.length) {
          return elements;
        } else {
          return this;
        }
      }
    };
    isSerializable = function() {
      return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
    };
    resultFor = function(name, value) {
      if (typeof value === 'string') {
        value = value.replace(rCRLF, "\r\n");
      }
      return {
        name: name,
        value: value
      };
    };
    getValue = function() {
      var $input, val, value, _i, _len, _results;

      $input = $(this);
      value = this.type === 'file' ? $input.val() ? this : void 0 : $input.hasClass('datetime_field_enabled') ? $input.val() === "" ? null : $input.data('date') || null : $input.data('rich_text') ? $input.editorBox('get_code', false) : $input.val();
      if ($.isArray(value)) {
        _results = [];
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          val = value[_i];
          _results.push(resultFor(this.name, val));
        }
        return _results;
      } else {
        return resultFor(this.name, value);
      }
    };
    return $.fn.serializeForm = function() {
      return this.map(elements).filter(isSerializable).map(getValue).get();
    };
  });

}).call(this);
