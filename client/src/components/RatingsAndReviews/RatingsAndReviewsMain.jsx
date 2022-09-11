import React from "react";
import axios from "axios";
import utilities from "./utilities/utilities.js";
import Sort from "./SubComponents/Sort.jsx";
import RatingsBreakDown from "./SubComponents/RatingsBreakDown.jsx";
import ReviewsList from "./SubComponents/ReviewsList.jsx";
import AddReviewForm from "./SubComponents/AddReviewForm.jsx";
import { useState, useEffect, useReducer } from "react";
import {
  getReviewsByCount,
  postNewReview,
  getReviewMetaData,
} from "../Utilities/Atelier.jsx";

let RatingsAndReviewsMain = (props) => {
  let initialState = {
    id: props.id,
    reviews: [],
    displayedReviews: 3,
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

  let swapSort = (sort) => {
    //ive decided the api call for sort is working well enough
    setSortBy(sort);
  };

  let ratingsFilter = (e, starNum) => {
    console.log(e.target);
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

  //this could be moved to utilities later ~~~~~~~~~~~~~
  let showMoreReviews = () => {
    console.log("show more reviews");
    console.log("passing in this state:", state, sortBy);
    getReviewsByCount(props.id, sortBy, state.displayedReviews, 2)
      .then((res) => {
        if (res.data.count > res.data.results.length) {
          setShowMoreBtn(false);
        } else {
          console.log("the response", res);
          // setReviews(res.data.results);
          // setDisplayedReviews(displayedReviews + 2);
          setState({
            ...state,
            reviews: res.data.results,
            displayedReviews: state.displayedReviews + 2,
          });
          console.warn("post fetch state", state);
        }
      })
      .catch((err) => console.log(err));
  };

  let fetchData = (id) => {
    let tempReviews;
    getReviewsByCount(props.id, sortBy, state.displayedReviews, 0)
      //res.data.results = arr of reviews
      .then((res) => {
        tempReviews = res.data.results;
        //if less then defined amount of reviews come back
        if (tempReviews.length < state.displayedReviews) {
          //remove button to show more reviews
          setShowMoreBtn(false);
        }
      })
      .then(() => {
        // get meta data for current product
        return getReviewMetaData(props.id);
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
    fetchData(props.id);
    setShowMoreBtn(true);
  }, [props.id]);

  //when sort method changes, çre-render reviews
  useEffect(() => {
    fetchData(props.id);
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
            filter={canRenderByRating}
            id={state.id}
            showMoreReviews={showMoreReviews}
            toggleModal={toggleModal}
          />
        </div>
      </div>
      {showModal ? (
        <div>
          <div className="RR_modal-container" onClick={toggleModal}></div>
          <AddReviewForm
            id={props.id}
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

  infinite scroll, something is wrong with re - render upon reaching the bottom of the list of reviews... ?

  ---> delete my helper function file
*/
