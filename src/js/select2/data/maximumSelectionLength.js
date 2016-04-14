define([

], function (){
  function MaximumSelectionLength (decorated, $e, options) {
    this.maximumSelectionLength = options.get('maximumSelectionLength');

    decorated.call(this, $e, options);
  }

  function isLimitReached(obj, data) {
    var count = data != null ? data.length : 0;
    return (obj.maximumSelectionLength > 0 &&
      count >= obj.maximumSelectionLength);
  }

  MaximumSelectionLength.prototype.query =
    function (decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        if (isLimitReached(self, currentData)) {
          self.trigger('results:message', {
            message: 'maximumSelected',
            args: {
              maximum: self.maximumSelectionLength
            }
          });
          return;
        }

        decorated.call(self, params, callback);
      });
  };

  MaximumSelectionLength.prototype.select =
    function(decorated, params, callback) {
      var self = this;

      this.current(function (currentData) {
        if (isLimitReached(self, currentData)) {
          return;
        }

        decorated.call(self, params, callback);
      });
  };

  return MaximumSelectionLength;
});
