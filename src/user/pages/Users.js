import React from 'react';

import UsersList from '../components/UsersList';

function Users() {
  const USERS = [
    {
      id: 'u1',
      name: 'Carl Padilla',
      image:
        'https://image.shutterstock.com/image-vector/question-mark-on-head-vector-600w-1089659894.jpg',
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
