var through = require('through');
var yaml = require('js-yaml');

module.exports = function(file) {
  if (!/\.ya?ml$/.test(file)) return through();

  var data = '';
  function write(buf) {
    data += buf;
  }

  function end() {
    try{
      this.queue('module.exports = ' + JSON.stringify(yaml.load(data)) + ';');
      this.queue(null);
    }catch(err){
      this.emit('error', err)
    }
  }

  return through(write, end);
};
