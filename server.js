var fs          = require('fs')
var path        = require('path')
var swig        = require('swig');
var app         = require('koa')();
var serve       = require('koa-static');
var bodyParser  = require('koa-bodyparser');
var staticCache = require('koa-static-cache');
// var React = require('react');
// var ReactDom = require('react-dom/server');
// var Router = require('react-router').Router
// var Route = require('react-router').Route
// var Link = require('react-router').Link


app.use(serve('public'));
app.use(bodyParser());
app.use(staticCache(path.join(__dirname, 'public'), {maxAge: 365 * 24 * 60 * 60 }));

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

app.use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// var props = {
//       items: [
//         'Item 0',
//         'Item 1',
//         'Item </script>',
//         'Item <!--inject!-->',
//       ]
//     }


app.use(function *() {
   // Router.run(routes, this.request.path, function(Handler) {
   //    var html = React.renderToString(React.createElement(Handler));
   //    this.body = swig.renderFile('views/index.html', { html: 'h' });
   // });
   // var html = ReactDom.renderToString(App(props));
   // console.log(App.default);
   // 
   // this.body = yield readFileThunk(__dirname + '/views/index.html');
   console.log(this.request.body);
   this.body = swig.renderFile('views/index.html', { html: "html" });
});

app.listen(3000);
console.log('$ open http://127.0.0.1:3000');

// var readFileThunk = function(src) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
//       if(err) return reject(err);
//       resolve(data);
//     });
//   });
// }
