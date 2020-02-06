
const db = require('../models');

// GET Index Favorites Route

const index = (req, res) => {

  const {eventName, eventId, distance, genre} = req.body;

  console.log("WOW-----------------------")

  db.Favorite.find({}, (error, userFavorites) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});

    res.send(userFavorites)


  });
};

// POST  (Create) Add Favorite REFERENCING User

const addFav = (req, res) => {

  const {eventName, eventId, distance, genre} = req.body;

  db.Favorite.create(req.body, (err, newFavorite) => {
    if (err) {
        return console.log(err)
     }

    currentUser = req.session.currentUser;
    db.User.findById(req.session.currentUser, (err,foundUser)=>{
      if (err) {
          return console.log(err)
       }

      foundUser.favorites.push(newFavorite._id);
      foundUser.save();
    })

    console.log(`saved new favorite: ${newFavorite}`)
    res.json({newFavorite});
  })
}

// Delete Favorite

const destroy = (req, res) => {

  const {eventName, eventId, distance, genre} = req.body;

  db.Favorite.remove(req.body, (err, deletedFavorite) => {
    if (err) {
      console.log("unable to remove favorite")
    }
  })
}


module.exports = {
    index,
    addFav,
    destroy,
};
