const db = require("./database");
const mongoose = require('mongoose');



const express = require("express");
const app = express();
app.use(express.json());


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://gurudeep_hn:9DAXcWh7K6XNGsqs@cluster0.lfw6g.mongodb.net/book-company?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bcollection = client.db("book-company").collection("books");
  console.log(bcollection);
  // perform actions on the collection object
  client.close();
});


app.get("/", (req, res) => {
    const getAllBooks = db.books;
    return res.json(getAllBooks);
});



// http://localhost:3000/books
app.get("/books", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});

/*
Route            /book-isbn
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Methods          GET
*/
// http://localhost:3000/book-isbn/1234Three
app.get("/book-isbn/:isbn", async (req, res) => {
    // console.log(req.params);
    const {isbn} = req.params;
    // console.log(isbn);
    const getSpecificBook = await BookModel.findOne({ISBN: isbn});
    // console.log(getSpecificBook);
    if(getSpecificBook===null) {
        return res.json({"error": `No Book found for the ISBN of ${isbn}`});
    }
    return res.json(getSpecificBook);
});

/*
Route            /book-category
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Methods          GET
*/
// http://localhost:3000/book-category/programming
app.get("/book-category/:category", async (req, res) => {
    // console.log(req.params);
    const {category} = req.params;
    // console.log(isbn);
    const getSpecificBooks = await BookModel.find({category:category});
    // console.log(getSpecificBook);
    // console.log(getSpecificBook.length);
    if(getSpecificBooks.length===0) {
        return res.json({"error": `No Books found for the category of ${category}`});
    }
    return res.json(getSpecificBooks);
});


/*
Route            /authors
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Methods          GET
*/
// http://localhost:3000/authors
app.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});

// http://localhost:3000/author-id/1
app.get("/author-id/:id", async (req, res) => {
    // console.log(req.params);
    const {id} = req.params;
    // console.log(id);
    const getSpecificAuthor = await AuthorModel.findOne({id: id});
    // console.log(getSpecificAuthor);
    if(getSpecificAuthor===null) {
        return res.json({"error": `No Author found for the id of ${id}`});
    }
    return res.json(getSpecificAuthor);
});

// http://localhost:3000/author-isbn/12One
app.get("/author-isbn/:isbn", async (req, res) => {
   // console.log(req.params);
   const {isbn} = req.params;
   // console.log(isbn);
   const getSpecificAuthors = await AuthorModel.find({books:isbn});
   // console.log(getSpecificAuthors);
   // console.log(getSpecificAuthors.length);
   if(getSpecificAuthors.length===0) {
       return res.json({"error": `No Authors found for the book of ${isbn}`});
   }
   return res.json(getSpecificAuthors);
});

// http://localhost:3000/publications
app.get("/publications", (req, res) => {
    const getAllPublications = db.publications;
    return res.json(getAllPublications);
});

// http://localhost:3000/publication-isbn/12345Two
app.get("/publication-isbn/:isbn", (req, res) => {
   
});

app.post("/book", async (req, res) => {
    // console.log(req.body);
    const addNewBook = await BookModel.create(req.body);
    return res.json( {bookAdded: addNewBook, message: "Book was added !!!"} );
});

app.listen(3000, () => {
    console.log("MY EXPRESS APP IS RUNNING......")
})