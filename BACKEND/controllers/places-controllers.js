const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../utils/location');
const Place = require('../models/place');

let DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire state building',
    description: 'cool place!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 w 34th street, New York, NY 10001',
    creator: 'u1',
  },
];

// Get Places by ID
const getPlacesById = async (req, res, next) => {
  // console.log('GET Request in Places');
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find place',
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError('Could not find a place for provided ID', 404);
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

// Get Places by User ID
const getPlaceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find user',
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find a place for provided user ID', 404)
    );
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new HttpError('invalid input passed', 422));
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-cdn.tripadvisor.com%2Fmedia%2Fphoto-s%2F16%2F03%2Fd1%2F67%2Fphoto1jpg.jpg&f=1',
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError('Creating place failed.', 500);
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError('invalid input passed', 422);
  }
  const { title, description } = req.body;

  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError('Something went wrong updating.', 500);
    return next(error);
  }
  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place. ',
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place. ',
      500
    );
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place. ',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'deleted place' });
};

exports.getPlacesById = getPlacesById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
