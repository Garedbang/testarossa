import React, { Fragment } from 'react';

import TextTruncate from 'react-text-truncate';

export default ({ recLineCounter, text, className }) => (
  <Fragment>
    {text && (
      <div className={className}>
        <TextTruncate line={recLineCounter} truncateText="…" text={text} />
      </div>
    )}
  </Fragment>
);
