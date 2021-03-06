(function() {
  define(['compiled/models/Progress', 'underscore'], function(Progress, _) {
    var progressable;

    return progressable = {
      initialize: function() {
        this.progressModel = new Progress;
        return this.attachProgressable();
      },
      saveWithProgressDeferred: function() {
        this.save();
        return this.progressModel.pollDfd;
      },
      attachProgressable: function() {
        var _this = this;

        this.on('change:progress_url', function(model, url) {
          return _this.progressModel.set({
            url: url,
            workflow_state: 'queued'
          });
        });
        return this.progressModel.on('complete', function() {
          return _this.fetch({
            success: function() {
              return _this.trigger('progressResolved');
            }
          });
        });
      }
    };
  });

}).call(this);
