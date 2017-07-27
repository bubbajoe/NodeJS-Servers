var express = require('express');  
var browserify = require('browserify');  
var React = require('react');  
var jsx = require('node-jsx');  
var app = express();

jsx.install(); 

var Books = require('./views/index.jsx');  

app.use('/', function(req, res) {  
  var books = [{
    title: 'Professional Node.js',
    read: false
  }, {
    title: 'Node.js Patterns',
    read: false
  }];

  res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'app',
        dangerouslySetInnerHTML: {
          __html: React.renderToString(React.createElement(TodoBox, {
            data: data
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(data)
      }),
      React.DOM.script({
        src: '/bundle.js'
      })
    )
  ));
});

app.use('/bundle.js', function(req, res) {  
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

var server = app.listen(80, function() {  
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});