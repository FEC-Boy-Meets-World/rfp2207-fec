import React from "react";
import { useState } from "react";

let Sort = ({ sortMethod, swapSort }) => {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div id="RR_sort">
      <div className="RR_drop-down">
        <p>
          Currently Sorted By{" "}
          <span className="RR_drop-down-btn">{sortMethod}</span>
          &or;
        </p>
        <div className="RR_drop-down-content">
          <div
            className="RR_drop-choice"
            onClick={(e) => swapSort(e.target.innerHTML)}
          >
            relevant
          </div>
          <div
            className="RR_drop-choice"
            onClick={(e) => swapSort(e.target.innerHTML)}
          >
            helpful
          </div>
          <div
            className="RR_drop-choice"
            onClick={(e) => swapSort(e.target.innerHTML)}
          >
            newest
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sort;
