import React from "react";
import { useState, useContext } from "react";
import RatingStars from "../../Utilities/RatingStars.jsx";
import ReviewFormRadio from "./ReviewFormRadio.jsx";
import { ProductContext } from "../../App.jsx";
import { postNewReview, postToImgbb } from "../../Utilities/Atelier.jsx";
import axios from "axios";

const AddReviewForm = ({ id, meta, toggleModal }) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewCharacteristics, setReviewCharacteristics] = useState({});
  const [recommend, setRecommend] = useState(null);
  const [userImgsThumb, setUserImgsThumb] = useState([]);
  const [userImgs, setUserImgs] = useState([]);
  const [summary, setSummary] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  //CONTEXT HOOK
  const { product_info } = useContext(ProductContext);

  let characteristics = Object.keys(meta.characteristics);
  var charIDs = Object.values(meta.characteristics).map((char) => char.id);

  const handleClick = (e) => {
    let userScore = e.target.getAttribute("attr");
    setUserRating(Number(userScore));
  };

  const handleChange = (e) => {
    switch (e.target.id) {
      case "summary":
        setSummary(e.target.value);
        break;
      case "body":
        setReviewBody(e.target.value);
        break;
      case "userName":
        setUserName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "characteristics":
        let copy = reviewCharacteristics;
        reviewCharacteristics[e.target.dataset.charid] = Number(
          e.target.dataset.charval
        );
        setReviewCharacteristics(copy);
        break;
    }
  };

  const handleRecommend = (e) => {
    e.target.value === "yes" ? setRecommend(true) : setRecommend(false);
  };

  const handleImgUpload = (e) => {
    //hanlde the thumbnail state and image file state
    let tempURLs = [];
    let tempImgs = [];

    Object.values(e.target.files).map((file) => {
      let imgURL = URL.createObjectURL(file);
      tempImgs.push(file);
      tempURLs.push(imgURL);
    });

    if (userImgsThumb.length + tempURLs.length > 5) {
      alert("Sorry, there is a maximum of 5 images allowed per review");
      setUserImgsThumb(userImgsThumb);
      setUserImgs(userImgs);
      return;
    } else if (userImgsThumb.length + tempURLs.length === 5) {
      setUserImgsThumb([...userImgsThumb, ...tempURLs]);
      setUserImgs([...userImgs, ...tempImgs]);
    } else {
      setUserImgsThumb([...userImgsThumb, ...tempURLs]);
      setUserImgs([...userImgs, ...tempImgs]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userReview = {
      product_id: id,
      rating: userRating,
      summary: summary,
      body: reviewBody,
      recommend: recommend,
      name: userName,
      email: email,
      photos: [],
      characteristics: reviewCharacteristics,
    };

    if (!userReview.rating) {
      alert("Rating is required");
      return;
    }
    if (!userReview.body || userReview.body.length < 50) {
      alert("Review body must be at least 50 characters");
      return;
    }
    if (userReview.recommend === null) {
      alert("Recommendation field is required");
      return;
    }
    if (!userReview.name) {
      alert("A username is required");
      return;
    }
    if (!userReview.email) {
      alert("An email is required");
      return;
    }
    if (
      Object.keys(userReview.characteristics).length === undefined ||
      Object.keys(userReview.characteristics).length < characteristics.length
    ) {
      alert("Each characteristic field must have a response");
      return;
    }

    if (userImgs.length !== undefined && userImgs.length > 0) {
      let promises = [];

      for (let [key, img] of Object.entries(userImgs)) {
        let body = new FormData();
        body.set("key", process.env.IMGBB_KEY);
        body.append("image", img);
        //send images to imgbb hostingg service (for url)
        let promise = postToImgbb(body);
        promises.push(promise);
      }

      Promise.all(promises)
        .then((res) => {
          //take urls and apply to userReview obj
          userReview.photos = res.map((imgReply) => imgReply.data.data.url);

          postNewReview(userReview);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      toggleModal();
    } else {
      postNewReview(userReview)
        .then((res) => console.log(res))
        .catch((err) => {
          alert("There was an error adding the review :(");
          console.log(err);
          return;
        });
      toggleModal();
    }
  };

  let userRatingTerms = {
    1: "Poor",
    2: "Fair",
    3: "Average",
    4: "Good",
    5: "Great",
  };

  return (
    <form className="RR_modal-form">
      <div id="RR_modal-form-header">
        <h2 id="RR_review-form-title">Write Your Review</h2>
        <h4 id="RR_review-form-subtitle">For the {`${product_info.name}`}</h4>
      </div>
      <div className="RR_form-component RR_form-star">
        <span className="RR_required">Overall rating? </span>
        <div onClick={(e) => handleClick(e)}>
          <RatingStars rating={userRating} />
        </div>
        <span>
          {userRating ? <span>{userRatingTerms[userRating]}</span> : null}
        </span>
      </div>
      <div className="RR_form-component RR_form-recommend-container">
        <span className="RR_required">Do you recommend this product?</span>
        <div
          className="RR_recommend-radio-btn-container"
          onChange={(e) => handleRecommend(e)}
        >
          <input
            type="radio"
            id="yes"
            name="recommend"
            value="yes"
            required
          ></input>
          <label htmlFor="yes">Yes</label>
          <input
            type="radio"
            id="no"
            name="recommend"
            value="no"
            required
          ></input>
          <label htmlFor="no">No</label>
        </div>
      </div>
      <div className="RR_form-component">
        <span className="RR_required">Rating details: </span>
        {characteristics.map((char, i) => {
          return (
            <div
              key={`${char}`}
              className="RR_form-charictaristics"
              style={{ background: `${i % 2 === 0 ? "lightgray" : "white"}` }}
            >
              <ReviewFormRadio
                chars={characteristics}
                charId={charIDs[i]}
                char={char}
                index={i}
                handleChange={handleChange}
                required
              />
            </div>
          );
        })}
      </div>
      <div className="RR_user-review-summary-container RR_form-component">
        <span>Review Summary: </span>
        <input
          className="RR_user-review-summary"
          type="text"
          placeholder="Example: Best purchase ever"
          id="summary"
          value={summary}
          onChange={(e) => handleChange(e)}
          maxLength="60"
        ></input>
      </div>
      <div className="RR_user-review-body-container RR_form-component">
        <span className="RR_required">Review body: </span>
        <textarea
          className="RR_user-review-body"
          type="text"
          rows="30"
          cols="55"
          id="body"
          value={reviewBody}
          placeholder="Why did you like the product or not?"
          onChange={(e) => handleChange(e)}
          required
        ></textarea>
        <div>
          {50 - reviewBody.length >= 0 ? (
            <span>
              Minimum required characters left: {50 - reviewBody.length}
            </span>
          ) : (
            <span>Minimum reached</span>
          )}
        </div>
      </div>
      <div>
        <div className="RR_user-thumbnails-container">
          {userImgs.length && userImgs.length >= 5 ? null : (
            <input
              type="file"
              id="files"
              multiple="multiple"
              accept="image/*"
              onChange={(e) => handleImgUpload(e)}
            ></input>
          )}
        </div>
        <div>
          {userImgsThumb.length
            ? userImgsThumb.map((img, i) => {
                return <img className="RR_form-thumbnail" src={img} key={i} />;
              })
            : null}
        </div>
      </div>
      <div className="RR_form-component RR_form-username">
        <span className="RR_required">Username: </span>
        <input
          type="text"
          placeholder="Example: jackson11!"
          maxLength="60"
          value={userName}
          id="userName"
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <small>
          For privacy reasons, do not use your full name or email address.
        </small>
      </div>
      <div className="RR_form-component RR_form-email">
        <span className="RR_required">Email: </span>
        <input
          type="email"
          placeholder="Example: jackson11@email.com"
          maxLength="60"
          value={email}
          id="email"
          onChange={(e) => handleChange(e)}
          required
        ></input>
        <small>For authentication reasons only, you will not be emailed.</small>
      </div>
      <button
        className="RR_form-submit-btn"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </button>
    </form>
  );
};

export default AddReviewForm;
