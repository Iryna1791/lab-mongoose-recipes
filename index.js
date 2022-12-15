const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({ 
      title: 'Ukrainian Red Borscht Soup',
      level: 'Easy Peasy',
      ingredients: [
        '1 (16 ounce) package pork sausage',
        '3 medium beets peeled and shredded',
        '3 carrots peeled and shredded',
        '3 medium baking potatoes, peeled and cubed',
        '½ medium head cabbage, cored and shredded',
        '1 cup diced tomatoes, drained',
        '1 tablespoon vegetable oil',
        '1 medium onion, chopped',
        '1 (6 ounce) can tomato paste',
        '8 ¾ cups water, divided, or as needed',
        '3 cloves garlic, minced',
        '1 teaspoon white sugar, or to taste',
        'salt and pepper to taste',
        '½ cup sour cream, for topping',
        '1 tablespoon chopped fresh parsley for garnish'],
        cuisine: 'Ukrainian',
        dishType: 'lunch and dinner',
      image: 'https://www.istockphoto.com/es/foto/borscht-sopa-de-remolacha-gm1257100046-368294275',
      duration: 60,
      creator: 'Iryna Danchuk'
      })
})

  .then (Recipe => console.log('Recipe successfully created', Recipe.title))

  .then (() => {
    return Recipe.insertMany(data)
  })

  .then((result) => {result.find(recipe => console.log(`Title ${recipe.title}`))
  })

  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: '100'}, {new: true})
  })

  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(()=> console.log('Recipe successfully deleted'))
  })

  .then(() => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
  })
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
