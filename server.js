var fs          = require('fs')
var path        = require('path')
// var swig        = require('swig');
var views       = require('koa-views');
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

app.use(views(__dirname + '/views', {
  map: {
    html: 'mustache'
  },
  cache: false
}));

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



app.use(function *() {
   console.log(this.request.body);
   var view = {
      title: "Joe",
      calc: function () {
        return 2 + 4;
      },
      partials:{more:'more'}
    };

    yield this.render("index", view, function(err, html){
      if (err) throw err;
      console.log(html);
    });
});

app.listen(3000);
console.log('$ open http://127.0.0.1:3000');
