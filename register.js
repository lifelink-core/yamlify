var fs   = require('fs');
var yaml = require('node-yaml');

var yamlRequire = function (m, f) {
  m.exports = yaml.readSync(f);
};

// Hack to prevent later changes of .yml, .yaml extensions handlers
['.yml', '.yaml'].forEach(function(ext){
  Object.defineProperty(require.extensions, ext, {
    get: function() {
      return yamlRequire;
    },
    set: function() {}
  });
});
