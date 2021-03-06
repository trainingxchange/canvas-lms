(function() {
  define(['jquery', 'compiled/jquery/sticky'], function($) {
    return {
      afterRender: function() {
        if (this.stickyHeader) {
          this.stickyHeader.remove();
        }
        return this.stickyHeader = this.$('[data-sticky]').sticky();
      }
    };
  });

}).call(this);
