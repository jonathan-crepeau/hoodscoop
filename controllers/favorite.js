
const db = require('../models');

// GET Index Favorites Route

const index = (req, res) => {

  console.log("WOW-----------------------")

  db.Favorite.find({}, (error, userFavorites) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});

    currentUser = req.session.currentUser;
    db.User.findById(req.session.currentUser, (err,foundUser)=>{
      if (err) {
          return console.log(err)
       }


       var favoriteArr = [];
       console.log("----------found favorites-----------", foundUser);
  for (let i = 0; i <foundUser.favorites.length; i++){
        db.Favorite.findById(foundUser.favorites[i], (err, favoriteElements) => {
            console.log("FAVORITE ELEMENTS", [favoriteElements])
            favoriteArr.push(favoriteElements)
      })
  }
  console.log(favoriteArr)
  res.send([foundUser.favorite])

  });
});

}

// POST  (Create) Add Favorite REFERENCING User

const addFav = (req, res) => {

  const {eventName, eventId, distance, genre} = req.body;

  console.log(req.body)

  db.Favorite.create(req.body, (err, newFavorite) => {
    if (err) {
        return console.log(err)
     }

    currentUser = req.session.currentUser;
    db.User.findById(req.session.currentUser, (err,foundUser)=>{
      if (err) {
          return console.log(err)
       }

      foundUser.favorites.push(newFavorite);
      foundUser.save();
    })

    // console.log(`saved new favorite: ${newFavorite}`)
    // res.json({newFavorite});
  })
}

// Delete Favorite

const destroy = (req, res) => {

  const {eventName, eventId, distance, genre} = req.body;

    db.User.findById(req.session.currentUser, (err,foundUser)=>{
      if (err) {
          return console.log(err)
       }

       console.log(req.body)

       console.log(foundUser.favorites.indexOf(req.body))
       db.Favorite.deleteOne(foundUser.favorites.indexOf(req.body), (err, deletedFavorite) => {
         if (err) {
           console.log("unable to remove favorite")
         }

       console.log(foundUser.favorites.indexOf(req.body), " was deleted from favorites")
     })

  })
}


module.exports = {
    index,
    addFav,
    destroy,
};
