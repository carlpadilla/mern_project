import React from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';
import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'Cool spot',
    imageUrl:
      'https://www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2019-10/home_banner-min.jpg?itok=OVtUHvyB',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'Cool spot',
    imageUrl:
      'https://www.esbnyc.com/sites/default/files/styles/on_single_feature/public/2019-10/home_banner-min.jpg?itok=OVtUHvyB',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: 'u2',
  },
];

const UpdatePlaces = () => {
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!identifiedPlace) {
    return (
      <div className='center'>
        <h2>Could not find place!</h2>
      </div>
    );
  }

  return (
    <form className='place-form'>
      <Input
        id='title'
        element='input'
        type='text'
        label='Title'
        validators={[VALIDATOR_REQUIRE()]}
        errorText='Please enter a valid title'
        onInput={() => {}}
        value={identifiedPlace.title}
        valid={true}
      />
      <Input
        id='description'
        element='textarea'
        label='Description'
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText='Please enter a valid description. Min(5 characters)'
        onInput={() => {}}
        value={identifiedPlace.description}
        valid={true}
      />
      <Button type='submit' disbaled={true}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlaces;
