(function() {
  define(function() {
    var cleanStyleNode, doc, registerTemplateCss, render, templatesWithStyles, _styleNode;

    doc = window.document;
    templatesWithStyles = {};
    registerTemplateCss = function(templateId, css) {
      templatesWithStyles[templateId] = css;
      return render();
    };
    registerTemplateCss.clear = function() {
      templatesWithStyles = {};
      return render();
    };
    render = function() {
      var combined, css, strings, styleNode, templateId;

      strings = [];
      for (templateId in templatesWithStyles) {
        css = templatesWithStyles[templateId];
        strings.push("/* From: " + templateId + " */");
        strings.push(css);
      }
      combined = strings.join('\n');
      styleNode = cleanStyleNode();
      if ('cssText' in styleNode) {
        return styleNode.cssText = combined;
      } else {
        return styleNode.appendChild(doc.createTextNode(combined));
      }
    };
    _styleNode = null;
    cleanStyleNode = function() {
      var child, head;

      if (_styleNode) {
        while (child = _styleNode.firstChild) {
          _styleNode.removeChild(child);
        }
        return _styleNode;
      }
      if (doc.createStyleSheet) {
        return _styleNode = doc.createStyleSheet();
      } else {
        head = doc.head || doc.getElementsByTagName('head')[0];
        _styleNode = doc.createElement('style');
        return head.appendChild(_styleNode);
      }
    };
    return registerTemplateCss;
  });

}).call(this);
