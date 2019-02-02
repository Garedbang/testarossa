
import React from 'react'
import Pagination from 'react-js-pagination';

export default ({ statePopular, handlePageChange,pageCounter }) => (
        <Pagination
                activePage={statePopular.currentPage}
                itemsCountPerPage={1}
                totalItemsCount={statePopular.allPages}
                pageRangeDisplayed={pageCounter}
                onChange={handlePageChange}
                prevPageText=''
                firstPageText='First'
                lastPageText='Last'
                nextPageText=''
                itemClass='link'
                itemClassFirst='first'
                itemClassLast='last'
                itemClassNext='next'
                itemClassPrev='prev'
              />
    )