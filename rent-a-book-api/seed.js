const { Genre } = require("./models/genre");
const { Book } = require("./models/book");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Romance",
    books: [
      { title: "Fifty Shades of Grey", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Beautiful Disaster ", numberInStock: 10, dailyRentalRate: 2 },
      { title: "Reflected in You", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "Fiction",
    books: [
      { title: "The Hunger Games", numberInStock: 5, dailyRentalRate: 2 },
      { title: "Harry Potter and the Order of the Phoenix", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Chronicles of Narnia", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "History",
    books: [
      { title: "Holy Bible", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Republic", numberInStock: 10, dailyRentalRate: 2 },
      { title: "The Communist Manifesto", numberInStock: 15, dailyRentalRate: 2 }
    ]
  },
  {
    name: "Feminist",
    books: [
      { title: "A Room of One's Own", numberInStock: 5, dailyRentalRate: 2 },
      { title: "The Beauty Myth", numberInStock: 10, dailyRentalRate: 2 },
      { title: "A Doll's House", numberInStock: 15, dailyRentalRate: 2 }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Book.deleteMany({});
  await Genre.deleteMany({});

  for (let genre of data) {
    const { _id: genreId } = await new Genre({ name: genre.name }).save();
    const books = genre.books.map(book => ({
      ...book,
      genre: { _id: genreId, name: genre.name }
    }));
    await Book.insertMany(books);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
