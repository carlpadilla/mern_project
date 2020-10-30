const { v4: uuidv4 } = require('uuid')
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')

let DUMMY_PLACES = [
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
  

// Get Places by ID
const getPlacesById = (req, res, next) => {
    // console.log('GET Request in Places');
    const placeId = req.params.pid
    const places = DUMMY_PLACES.filter(p => {
      return p.id === placeId
    })
  
    if(!places || places.length === 0){
      throw new HttpError('Could not find a places for provided ID', 404)
    }
    res.json({ places });
  }


// Get Places by User ID
const getPlaceByUserId = (req, res, next)=>{
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p =>{
      return p.creator === userId
    })
  
    if(!place){
      
      return next(new HttpError('Could not find a place for provided user ID', 404))
    }
    res.json({place});
  
  }

  const createPlace = (req, res,next) =>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      throw new HttpError('invalid input passed', 422)
    }

      const {title, description, coordinates, address,creator} = req.body

      const createdPlace = {
          id: uuidv4(),
          title,
          description,
          location: coordinates,
          address,
          creator
      }

      DUMMY_PLACES.push(createdPlace)

      res.status(201).json({place: createdPlace})

  }

const updatePlace = (req, res, next) => {
  const {title, description} = req.body

  const placeId = req.params.pid

  const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
  updatedPlace.title = title
  updatedPlace.description = description
  
  DUMMY_PLACES[placeIndex] = updatedPlace

  res.status(200).json({place: updatedPlace})

 }

const deletePlace = (req, res, next) => { 
  const placeId = req.params.pid

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId)

  res.status(200).json({message: 'deleted place'})
}


exports.getPlacesById = getPlacesById
exports.getPlaceByUserId = getPlaceByUserId
exports.createPlace = createPlace
exports.updatePlace = updatePlace
exports.deletePlace = deletePlace