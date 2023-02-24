import React, { useState } from "react";
import Pagination from "react-js-pagination";

const Paging = ({page, count, setPage}) => {

  return (
    <Pagination
    activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={count}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
    
  );
};

export default Paging;