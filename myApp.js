require('dotenv').config();
let mongoose = require('mongoose');

// #1 connect to a MongooDB database
process.env.MONGO_URI='mongodb+srv://axelseancp:YviXFwbmcJfCDu6O@cluster0.reuweky.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// #2 create a model
// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema);

// #3 create and save a record of model
const createAndSavePerson = (done) => {
  const orang = new Person({
    name: "Axel",
    age: 20,
    favoriteFoods: ["Pizza", "Fried Rice", "Lasagna"]
  });

  orang.save((err,data) => {
    if(err){
      console.error(err);
    }else{
      done(null,data);
    }
  })
};

//#4 create many records with model.create
const arrayOfPeople = [
  {
    name: "Meltryllis",
    age: 19,
    favoriteFoods: ["candy", "cake"]
  },
  {
    name: "Okita Souji",
    age: 25
  },
  {
    name: "SilverWolf",
    age: 18,
    favoriteFoods: ["snacks"]
  }
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err) return console.error(err);
    done(null, people);
  });
};

// #5 use model.find() to search your database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err,data) => {
    if(err) return console.error(err);
    done(null, data);
  })
};

// #6 use model.findOne() to return a single matching document from your database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  })
};

// #7 use model.findById() to search your database by _id
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  });
};

// #8 perform classic update by running find, edit, then save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err,data) => {
    if(err) return console.error(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err,data) => {
      if(err) return console.error(err);
      done(null,data);
    })
  });
};

// #9 perform new updates on a document using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err,data) => {
    if(err) return console.error(err);
    done(null , data);
  });
};

// #10 delete one document using model.findByIdAndRemove() / findOneAndRemove()
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  });
};

// #11 delete many documents with model.remove()
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err,data) => {
    if(err) return console.error(err);
    done(null,data);
  })
};

// #12 chain search query helpers to narrow search results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err,data) => {
          if(err) return console.error(err);
          done(null,data)
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
