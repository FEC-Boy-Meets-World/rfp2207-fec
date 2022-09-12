import React from "react";
import { useState } from "react";
import HelpfulnessAndReport from "./helpfulnessAndReport.jsx";
import utilities from "../utilities/utilities.js";
import RatingStars from "../../Utilities/RatingStars.jsx";

const toggleModal = (e, id) => {
  e.preventDefault();
  let reviewImgModal = document.getElementById(`RR_modal-container-${id}`);
  reviewImgModal.classList.toggle("RR_display-none");
};

const ReviewItem = (props) => {
  const [renderBody, setRenderBody] = useState({ render: false });
  return (
    <li className="RR_list-item">
      <div>
        <RatingStars rating={props.review.rating} />
        <div className="RR_name-date">
          {props.review.reviewer_name} |{" "}
          {utilities.getFormattedDate(props.review.date)}
        </div>
      </div>
      <h4 className="RR_review-summary">
        {props.review.summary.length <= 60
          ? props.review.summary
          : props.review.summary.slice(0, 59) + "..."}
      </h4>
      <p className="RR_review-body">
        {props.review.body.length > 250 && !renderBody.render
          ? props.review.body.slice(0, 250) + "..."
          : props.review.body}
      </p>
      <span
        onClick={() => setRenderBody({ render: true })}
        id="RR_review-show-more"
      >
        {props.review.body.length > 250 && !renderBody.render ? (
          <button>show more</button>
        ) : null}
      </span>
      <div className="RR_review-photo-container">
        {props.review.photos.length
          ? props.review.photos.map((photo) => {
              return (
                <div key={`${photo.id}`}>
                  <img
                    onClick={(e) => toggleModal(e, photo.id)}
                    className="RR_review-thumbnail"
                    alt="user submitted image"
                    src={`${photo.url}`}
                  />
                  <div
                    id={`RR_modal-container-${photo.id}`}
                    className="RR_display-none RR_modal-container"
                    onClick={(e) => toggleModal(e, photo.id)}
                  >
                    <img className="RR_modal-image" src={`${photo.url}`} />
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div>
        {props.review.response !== null ? (
          <div className="RR_response-from-seller">{`response from seller: ${props.review.response}`}</div>
        ) : null}
      </div>
      <div className="RR_helpfulness-recommend-container">
        <HelpfulnessAndReport review={props.review} />
        {props.review.recommend ? (
          <span>&#10003; I recommend this product</span>
        ) : null}
      </div>
    </li>
  );
};

export default ReviewItem;
