import React from 'react';
import { useQuery, gql } from '@apollo/client';

// to define the GraphQL query to get countries' names and capitals
const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      capital
    }
  }
`;

function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  // this handles loading state
  if (loading) return <p>Loading...</p>;

  // this handles error state
  if (error) return <p>Error: {error.message}</p>;

  //this is to display list of countries
  return (
    <ul>
      {data.countries.map((country) => (
        <li key={country.name}>
          <strong>{country.name}</strong>: {country.capital}
        </li>
      ))}
    </ul>
  );
}

export default CountryList;
