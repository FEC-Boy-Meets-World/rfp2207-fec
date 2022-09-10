import React from "react";
import { useState, useEffect, useRef } from "react";
import ReviewItem from "./ReviewItem.jsx";
import AddReviewBtn from "./AddReviewBtn.jsx";

let ReviewsList = ({
  showMoreBtn,
  reviews,
  filter,
  id,
  showMoreReviews,
  toggleModal,
}) => {
  const [reviewsList, setReviewsList] = useState(reviews);

  //////////////  INTERSECTION OBSERVER  //////////////////
  // const observerOptions = {
  //   root: null,
  //   threshold: 0.2,
  // };

  // const [element, setElement] = useState(null);

  // useEffect(() => {
  //   const currentElement = element;
  //   const currentObserver = observer.current;
  //   if (currentElement) {
  //     console.log(currentElement);
  //     currentObserver.observe(currentElement);
  //   }
  //   //cleanup
  //   return () => {
  //     if (currentElement) {
  //       currentObserver.unobserve(currentElement);
  //     }
  //   };
  // }, [element]);

  ////////////REMEMBER TO SET ref={setElement} on div ln87~

  // const observer = useRef(
  //   new IntersectionObserver((entries) => {
  //     const entry = entries[entries.length - 1];
  //     if (entry.isIntersecting) {
  //       // showMoreReviews();
  //       console.log("entry intersect", entry.target);
  //     }
  //   }, observerOptions)
  // );

  ////////////////  SCROLL EVENT-LISTENER  /////////////////

  // const handleScroll = (e) => {
  //   let distFromTop = e.target.scrollTop;
  //   let screenHeight = window.innerHeight;

  //   //buttons on bottom are part of chosen element(hence 30 px)
  //   if (screenHeight + distFromTop - 30 >= e.target.scrollHeight) {
  //     console.log("BOTTOM");
  //     showMoreReviews();
  //   }
  // };

  // useEffect(() => {
  //   let listEl = document.querySelector("#RR_reviews-list");

  //   listEl.addEventListener("scroll", handleScroll);
  // }, []);

  //////////////////////////////////////////////////

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews, filter]);

  return (
    <div id="RR_reviews-list">
      <h3>Reviews</h3>
      {reviews.length ? null : <AddReviewBtn toggleModal={toggleModal} />}
      <div>
        {reviewsList.map((review, i) => {
          if (filter[review.rating]) {
            return (
              <div /*ref={setElement}*/>
                <ReviewItem key={i} review={review} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <div id="RR_review-btns-container">
        {showMoreBtn ? (
          <button className="RR_review-btn" onClick={() => showMoreReviews()}>
            MORE REVIEWS
          </button>
        ) : null}
        {reviews.length ? <AddReviewBtn toggleModal={toggleModal} /> : null}
      </div>
    </div>
  );
};

export default ReviewsList;
