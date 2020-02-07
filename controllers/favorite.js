
const db = require('../models');

// GET Index Favorites Route

const index = (req, res) => {

  console.log("WOW-----------------------")

  // db.Favorite.find({}, (error, userFavorites) => {
  //   if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});

    // NOTE undefined auto-defines with "var" (line below):
    // currentUser = req.session.currentUser;
    db.User.findById(req.session.currentUser, (err,foundUser)=>{
      if (err) {
          return console.log(err)
       }

       // original plan with pushing favoriteArr didn't work out b/c JS is asynchronous -- why lines after loop ran first.
       var favoriteArr = [];
       console.log("----------found favorites-----------", foundUser);
        db.Favorite.find(foundUser.favorites.eventId, (err, favoriteElements) => {
            console.log("FAVORITE ELEMENTS", favoriteElements)
              res.send(favoriteElements)


  });
});

}

// POST  (Create) Add Favorite REFERENCING User

const addFav = (req, res) => {
  // Line below was used for console logging each piece of info --totally cool -- just take out after testing done.
  const {eventName, eventId, distance, genre} = req.body;

  console.log(req.body)

  db.Favorite.create(req.body, (err, newFavorite) => {
    if (err) {
        return console.log(err)
     }

    // currentUser = req.session.currentUser;
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

       console.log('DELETE BODY', req.body.eventId)

       // console.log(foundUser.favorites.indexOf(req.body))
       db.Favorite.deleteOne({"eventId":req.body.eventId}, (err, deletedFavorite) => {
         if (err) {
           console.log("unable to remove favorite")
         }

       console.log(deletedFavorite, " was deleted from favorites")
       res.send(deletedFavorite)
     })
})
}



module.exports = {
    index,
    addFav,
    destroy,
};
