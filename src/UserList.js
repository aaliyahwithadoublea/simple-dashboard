import React from 'react';
import { useQuery, gql } from '@apollo/client';

// to define the GraphQL query to get names and details
const GET_USERS = gql`
  {
    users {
      data {
        id
        name
        email
        phone
        company {
          name
        }
      }
    }
  }
`;


function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  // this handles loading state
  if (loading) return <p>Loading...</p>;

  // this handles error state
  if (error) return <p>Error: {error.message}</p>;

  //this is to display list of cnames with details
  return (
    <ul>
      {data.users.data.map(user => (
        <li key={user.id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Company: {user.company.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
