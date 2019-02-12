import React from 'react';
import Pagination from 'react-js-pagination';

export default ({ popularData, handlePageChange, pageCounter }) => (
  <div className="page-buttons">
    <Pagination
      activePage={popularData.currentPage}
      itemsCountPerPage={1}
      totalItemsCount={popularData.allPages}
      pageRangeDisplayed={pageCounter}
      onChange={handlePageChange}
      prevPageText=""
      firstPageText="First"
      lastPageText="Last"
      nextPageText=""
      itemClass="link"
      itemClassFirst="first"
      itemClassLast="last"
      itemClassNext="next"
      itemClassPrev="prev"
    />
  </div>
);
