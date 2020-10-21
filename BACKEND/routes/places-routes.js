const express = require('express');

const HttpError = require('../models/http-error')

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state building',
    description: 'cool place!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: '20 w 34th street, New York, NY 10001',
    creator: 'u1'
  }
]

router.get('/:pid', (req, res, next) => {
  // console.log('GET Request in Places');
  const placeId = req.params.pid
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId
  })

  if(!place){
    throw new HttpError('Could not find a place for provided ID', 404)
  }
  res.json({ place });
});




router.get('/user/:uid', (req, res, next)=>{
  const userId = req.params.uid;
  const place = DUMMY_PLACES.find(p =>{
    return p.creator === userId
  })

  if(!place){
    
    return next(new HttpError('Could not find a place for provided user ID', 404))
  }
  res.json({place});

})

module.exports = router;
