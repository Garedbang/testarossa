import React, { Fragment } from 'react';

export default ({ getData, link, error, title }) => (
  <Fragment>
    <h3 className="page-description">{error || title}</h3>
    {error && (
      <button
        className="default-button"
        type="button"
        onClick={() => getData(link)}
      >
        Try one more time
      </button>
    )}
  </Fragment>
);
