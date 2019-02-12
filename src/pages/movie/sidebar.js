import React from 'react';

import Image from '../../components/image';

export default ({ api, movie }) => (
  <div className="sidebar">
    <div className="poster">
      <Image movie={movie} api={api} />
    </div>
  </div>
);
