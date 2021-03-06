(function() {
  define(function() {
    var hsvToRgb;

    return hsvToRgb = function(h, s, v) {
      var b, f, g, hi, p, q, r, rgb, t;

      s = s / 100;
      v = v / 100;
      hi = Math.floor((h / 60) % 6);
      f = (h / 60) - hi;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      rgb = [];
      switch (hi) {
        case 0:
          rgb = [v, t, p];
          break;
        case 1:
          rgb = [q, v, p];
          break;
        case 2:
          rgb = [p, v, t];
          break;
        case 3:
          rgb = [p, q, v];
          break;
        case 4:
          rgb = [t, p, v];
          break;
        case 5:
          rgb = [v, p, q];
      }
      r = Math.min(255, Math.round(rgb[0] * 256));
      g = Math.min(255, Math.round(rgb[1] * 256));
      b = Math.min(255, Math.round(rgb[2] * 256));
      return [r, g, b];
    };
  });

}).call(this);
