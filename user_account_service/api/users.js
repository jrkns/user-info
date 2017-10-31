//  users.js
//
//  Defines the users api. Add to a server by calling:
//  require('./users')
'use strict';

require('es6-promise').polyfill();
require('isomorphic-fetch');

//  Only export - adds the API to the app with the given options.
module.exports = (app, options) => {

  app.get('/users', (req, res, next) => {
    options.repository.getUsers().then((users) => {
      res.status(200).send(users.map((user) => { return {
          id: user.id,
          username: user.username,
          phone_number: user.phone_number
        };
      }));
    })
    .catch(next);
  });

  app.get('/', (req, res, next) => {

    //  Get the username.
    var username = req.query.username;
    let img_src = 'Notfound';
    if (!username) {
      throw new Error("When searching for a user, the username must be specified, e.g: '/?username=alice'.");
    }

    //  Get the user from the repo.
    // const img_src = fetch().json().profile_image;    
    

    options.repository.getUserByUsername(username).then((user) => {

      if(!user) { 
        res.status(404).send('User not found.');
      } else {
        fetch('http://asset_service:3030/?username='+username)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              img_src = data[0].profile_image;
              res.status(200).send({
                username: user.username,
                phone_number: user.phone_number,
                profile_image: img_src
              });
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });  
      }
    })
    .catch(next);

  });
};
