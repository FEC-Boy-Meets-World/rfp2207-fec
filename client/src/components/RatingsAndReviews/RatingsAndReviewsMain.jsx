import React from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import utilities from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";
import AddReviewBtn from "./SubComponents/AddReviewBtn.jsx";
import AddReviewForm from "./SubComponents/AddReviewForm.jsx";
import { useState, useEffect, useReducer } from "react";
import {
  getReviewsByCount,
  postNewReview,
  getReviewMetaData,
} from "../Utilities/Atelier.jsx";

let RatingsAndReviewsMain = (props) => {
  let initialState = {
    id: props.state.id,
    reviews: [],
    meta: {},
    reviewStats: {},
  };

  let defaultFilter = {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
  };

  let defaultFilterFalse = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  };

  const [state, setState] = useState(initialState);
  const [hasFiltered, setHasFiltered] = useState(false);
  const [sortBy, setSortBy] = useState("relevant");
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [canRenderByRating, setCanRenderByRating] = useState(defaultFilter);
  const [displayedReviews, setDisplayedReviews] = useState(3);
  const [loading, setLoading] = useState(false);

  let swapSort = (sort) => {
    //ive decided the api call for sort is working well enough
    setSortBy(sort);
  };

  let ratingsFilter = (e, starNum) => {
    e.target.closest("#RR_ratings-bd-count").classList.toggle("selected");
    // if all are false and have filtered
    let filterCopy = { ...canRenderByRating };
    filterCopy[starNum] = !filterCopy[starNum];
    if (
      hasFiltered &&
      !filterCopy[1] &&
      !filterCopy[2] &&
      !filterCopy[3] &&
      !filterCopy[4] &&
      !filterCopy[5]
    ) {
      setCanRenderByRating(defaultFilter);
      setHasFiltered(false);
      return;
    }

    //if not all are false and have not filtered
    if (!hasFiltered) {
      setHasFiltered(true);

      let filterCopy = { ...defaultFilterFalse };
      filterCopy[starNum] = !filterCopy[starNum];

      setCanRenderByRating(filterCopy);
    } else {
      //if not all are false and have filtered
      let filterCopy = { ...canRenderByRating };
      filterCopy[starNum] = !filterCopy[starNum];

      setCanRenderByRating(filterCopy);
    }
  };

  useEffect(() => {
    setState({ ...state, reviews: state.reviews });
  }, [canRenderByRating]);

  let toggleModal = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  let showMoreReviews = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDisplayedReviews((displayedReviews) => displayedReviews + 2);
    }, 750);
  };

  useEffect(() => {
    if (displayedReviews >= state.reviews.length) {
      setShowMoreBtn(false);
    }
  }, [displayedReviews]);

  let fetchData = (id) => {
    let tempReviews;
    getReviewsByCount(props.state.id, sortBy, displayedReviews, 100)
      //res.data.results = arr of reviews
      .then((res) => {
        tempReviews = res.data.results;
        //if less then defined amount of reviews come back
        if (tempReviews.length < displayedReviews) {
          //remove button to show more reviews
          setShowMoreBtn(false);
        }
      })
      .then(() => {
        // get meta data for current product
        return getReviewMetaData(props.state.id);
      })
      .then((res) => {
        let reviewStatsObj = utilities.getAvgReviewValue(res.data);

        setState({
          ...state,
          reviews: tempReviews,
          meta: res.data,
          reviewStats: reviewStatsObj,
        });
      })
      .catch((err) => console.log("failed to fetch", err));
  };

  //when props update, call fetchData
  useEffect(() => {
    fetchData(props.state.id);
    setShowMoreBtn(true);
  }, [props.state.id]);

  //when sort method changes, çre-render reviews
  useEffect(() => {
    fetchData(props.state.id);
  }, [sortBy]);

  return (
    <section id="section_rr">
      <h2>Ratings and Reviews</h2>
      <div id="RR_bd-sort-list-container">
        <RatingsBreakDown
          reviewStats={state.reviewStats}
          meta={state.meta}
          id={state.id}
          ratingsFilter={ratingsFilter}
        />
        <div id="RR_sort-list-container">
          <Sort sortMethod={sortBy} swapSort={swapSort} id={state.id} />
          <ReviewsList
            showMoreBtn={showMoreBtn}
            reviews={state.reviews}
            displayedReviews={displayedReviews}
            filter={canRenderByRating}
            id={state.id}
            showMoreReviews={showMoreReviews}
            toggleModal={toggleModal}
            loading={loading}
          />
          <div id="RR_review-btns-container">
            <div>
              {showMoreBtn ? (
                <button
                  className="RR_add-review-btn"
                  onClick={() => showMoreReviews()}
                >
                  MORE REVIEWS
                </button>
              ) : null}
            </div>
            <div>
              {showMoreBtn ? (
                <ClipLoader loading={loading} color="#7e9cb7" size="50px" />
              ) : null}
            </div>
            <div>
              {state.reviews.length ? (
                <AddReviewBtn toggleModal={toggleModal} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {showModal ? (
        <div>
          <div className="RR_modal-container" onClick={toggleModal}></div>
          <AddReviewForm
            id={props.state.id}
            meta={state.meta}
            toggleModal={toggleModal}
          />
        </div>
      ) : null}
    </section>
  );
};

export default RatingsAndReviewsMain;

/* KNOWN BUGS / TODO

  break down review item subcomponent into more componenents

  swap helper functions for those in global helper file

  ---> delete my helper function file
*/
