// GET Index Favorites Route

app.get('/api/favorites/:id', (req, res) => {
  db.Favorite.find({req.body.id}, (error, userFavorites) => {
    if (error) return response.status(500).json({message: 'Something went wrong here. Try again'});
    response.status(200).json(allUsers);
  });
});

// POST  (Create) Add Favorite REFERENCING User

app.post('/api/favorites/:id', (req, res) => {
  db.Favorite.create({req.body}, (err, newFavorite) => {
    if (err) {
        return console.log(err)
     }
  })
})

// Delete Favorite

app.delete('/api/favorites/:id', (req, res) => {
  db.Favorite.remove({req.body}, (err, deletedFavorite) => {
    if (err) {
      console.log("unable to remove favorite")
    }
  })
})
