import React from "react";
import { useState, useEffect, useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import ReviewItem from "./ReviewItem.jsx";
import AddReviewBtn from "./AddReviewBtn.jsx";

let ReviewsList = ({
  showMoreBtn,
  reviews,
  displayedReviews,
  filter,
  id,
  showMoreReviews,
  toggleModal,
  loading,
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
  //     currentObserver.observe(currentElement);
  //   }
  //   //cleanup
  //   return () => {
  //     if (currentElement) {
  //       currentObserver.unobserve(currentElement);
  //     }
  //   };
  // }, [element]);

  //// REMEMBER TO SET ref={setElement} on div ln87~

  // const observer = useRef(
  //   new IntersectionObserver((entries) => {
  //     const entry = entries[entries.length - 1];
  //     if (entry.isIntersecting) {
  //       showMoreReviews();
  //     }
  //   }, observerOptions)
  // );

  ////////////////  SCROLL EVENT-LISTENER  /////////////////

  const handleScroll = (e) => {
    let element = e.target;

    if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
      showMoreReviews();
    }
  };

  useEffect(() => {
    let listEl = document.querySelector("#RR_reviews-list");
    listEl.addEventListener("scroll", handleScroll);
  }, []);

  //////////////////////////////////////////////////

  useEffect(() => {
    setReviewsList(reviews);
  }, [reviews, filter]);

  return (
    <div id="RR_reviews-list">
      <h3>Reviews</h3>
      {reviews.length ? null : <AddReviewBtn toggleModal={toggleModal} />}
      <div>
        {reviewsList.slice(0, displayedReviews).map((review, i) => {
          if (filter[review.rating]) {
            return (
              <div key={i} /*ref={setElement}*/>
                <ReviewItem key={i} review={review} />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default ReviewsList;
