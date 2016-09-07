var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: './output',            // required, the root of the server file tree
  port: 4000,               // optional, defaults to a random port
  cors: '*',                 // optional, defaults to undefined
  followSymlink: true,      // optional, defaults to a 404 error
  templates: {
    index: 'README.html',      // optional, defaults to 'index.html'
    notFound: '404.html'    // optional, defaults to undefined
  }
});

server.start(function () {
  console.log('Server listening to http://127.0.0.1:', server.port);
});
