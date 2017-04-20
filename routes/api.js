var express = require("express");
var apiRouter = express.Router();
var mongojs = require("mongojs");
var logic = require("../functions");
var db = mongojs("mongodb://libUser:qwerty1234@ds031551.mlab.com:31551/library", ["books", "categories", "users"]);

// Add Book
apiRouter.route("/add-book").post(function(request, response){
    var book = request.body;
    if(!book.title || !book.status){
        response.json({
            "error": "Enter Book title and availability status"
        })
    } else {
        db.books.save(book, function(err, book){
            if(err){
                response.send(err);
            }
            response.send(book._id);
        })
    }
});

// Delete Book
apiRouter.route("/delete-book/:id").delete(function(request, response){
    if(request.params.id){
        db.books.remove({_id: mongojs.ObjectId(request.params.id)} , function(error, book){
            if(error){
            // response.render("error.html");
            }
            response.send(request.params.id);
        })
    } else {
        response.json({
            "error": "This book does not exist"
        })
    }
    
});

// Update books
apiRouter.route("/update-book/:id").put(function(request, response){
    var book = request.body;
    var updateBook = {};

    if(book){
        updateBook.title = book.title,
        updateBook.category = book.category,
        updateBook.author = book.author,
        updateBook.synopsis = book.synopsis,
        updateBook.available = book.available

        db.books.update({_id: mongojs.ObjectId(request.params.id)}, 
                {$set: 
                    {title: book.title, category: book.category, 
                    author: book.author, synopsis: book.synopsis, 
                    available: book.available}
                }, {}, function(error, Book){
            if(error){
            // response.render("error.html");
        }
        response.send(request.params.id);
        })
    } else {
        response.json({
            "error": "This book does not exist"
        })
    }

});

// Add Category
apiRouter.route("/add-category").post(function(request, response){
    var category = request.body;
    if(!category.title){
        response.json({
            "error": "Enter Category title"
        })
    } else {
        db.categories.save(category, function(err, category){
            if(err){
                response.send(err);
            }
            response.send(category._id);
        })
    }
});

// Borrow book
apiRouter.route("/borrow-book/:id").put(function(request, response){
    var book = request.body;
    var borrowBook = 1;
    var now = new Date();
    now.setDate(now.getDate()+3);

    // borrowBook.returnDate = now;
    db.books.update({_id: mongojs.ObjectId(request.params.id)}, {$set: {borrow: borrowBook}}, {}, function(error, Book){
        if(error){
        // response.render("error.html");
        }
    });
    response.send(request.params.id);
});

// Borrow book
apiRouter.route("/return-book/:id").put(function(request, response){
    var book = request.body;
    var borrowBook = 0;
    var now = new Date();
    now.setDate(now.getDate()+3);

    // borrowBook.returnDate = now;
    db.books.update({_id: mongojs.ObjectId(request.params.id)}, {$set: {borrow: borrowBook}}, {}, function(error, Book){
        if(error){
        // response.render("error.html");
        }
    });
    response.send(request.params.id);
});




module.exports = apiRouter;
