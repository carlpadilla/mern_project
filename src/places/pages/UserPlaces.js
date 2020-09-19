import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

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
      lon: -73.9878531,
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
      lon: -73.9878531,
    },
    creator: 'u2',
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPLaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPLaces} />;
};

export default UserPlaces;
