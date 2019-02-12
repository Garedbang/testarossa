import React from 'react';

export default ({ title, data }) => (
  <ul>
    <li>
      {title}
      {data.length - 1 > 0 && 's'}:{' '}
    </li>
    {data.length > 0 ? (
      data.map((country, index) => (
        <li key={country.name}>
          {country.name}
          {data.length - 1 > index && ', '}
        </li>
      ))
    ) : (
      <li>{title} not added</li>
    )}
  </ul>
);
