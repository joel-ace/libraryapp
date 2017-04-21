var express = require("express");
var categoryRouter = express.Router();
var mongojs = require("mongojs");
var db = mongojs("mongodb://libUser:qwerty1234@ds031551.mlab.com:31551/library", ["categories", "books"]);


categoryRouter.route("/").get(function(request, response){
    db.categories.find(function(error, categories){
        if(error){
        // response.render("error.html");
        }
        response.render("category.ejs", {categories: categories});
    })
});

categoryRouter.route("/:id").get(function(request, response){
    db.books.find({category: request.params.id}, function(error, categories){
        var bookCategory = request.params.id;
        if(error){
        // response.render("error.html");
        }
        response.render("books.ejs", {books: categories, pgTitle: bookCategory + " Books"});
    })
});


module.exports = categoryRouter;
