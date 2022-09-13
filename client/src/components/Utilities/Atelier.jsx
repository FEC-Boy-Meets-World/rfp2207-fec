const axios = require("axios");

ATELIER_API = "https://app-hrsei-api.herokuapp.com/api/fec2/rfp";

//////////////////////////////////// RR BUCKET
module.exports.getReviewsByCount = (id, sortBy, displayedReviews, count) =>
  axios.get(`${ATELIER_API}/reviews`, {
    params: {
      product_id: `${id}`,
      sort: `${sortBy}`,
      count: `${displayedReviews + count}`,
    },
    headers: { Authorization: process.env.KEY },
  });

module.exports.postNewReview = (post) =>
  axios.post(`${ATELIER_API}/reviews`, post, {
    headers: { Authorization: process.env.KEY },
  });

module.exports.markReviewHelpful = (id) =>
  axios.put(
    `${ATELIER_API}/reviews/${id}/helpful`,
    { params: { review_id: id } },
    {
      headers: { Authorization: process.env.KEY },
    }
  );

module.exports.reportReview = (id) =>
  axios.put(
    `${ATELIER_API}/reviews/${id}/report`,
    { params: { review_id: id } },
    {
      headers: { Authorization: process.env.KEY },
    }
  );
////////////////////////////////////

module.exports.getRelatedProductIds = (id) =>
  axios.get(`${ATELIER_API}/products/${id}/related`, {
    headers: { Authorization: process.env.KEY },
  });

/////////////////////////////////////////

module.exports.getProductInfo = (id) =>
  axios.get(`${ATELIER_API}/products/${id}`, {
    headers: { Authorization: process.env.KEY },
  });

module.exports.getProductStyle = (id) =>
  axios.get(`${ATELIER_API}/products/${id}/styles`, {
    headers: { Authorization: process.env.KEY },
  });

module.exports.postItemtoCart = (sku) =>
  axios.post(
    `${ATELIER_API}/cart`,
    { sku_id: sku },
    { headers: { Authorization: process.env.KEY } }
  );

module.exports.getReviewMetaData = (id) =>
  axios.get(`${ATELIER_API}/reviews/meta?product_id=${id}`, {
    headers: { Authorization: process.env.KEY },
  });

module.exports.postUserClick = (element, widget) =>
  axios.post(
    `${ATELIER_API}/interactions`,
    { element: element, widget: widget, time: new Date() },
    { headers: { Authorization: process.env.KEY } }
  );

////////////////////////////////////////////////////////////////////////////////

module.exports.getQuestions = (id) =>
  axios.get(`${ATELIER_API}/qa/questions/?product_id=${id}&count=50`, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.getAnswers = (question_id) =>
  axios.get(`${ATELIER_API}/qa/questions/${question_id}/answers`, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.postQuestion = (product_id, modalData) =>
  axios.post(`${ATELIER_API}/qa/questions`, modalData, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.postAnswer = (product_id, question_id, modalData) =>
  axios.post(`${ATELIER_API}/qa/questions/${question_id}/answers`, modalData, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.markQuestionAsHelpful = (question_id, product_id) =>
  axios.put(
    `${ATELIER_API}/qa/questions/${question_id}/helpful`,
    { question_id: question_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.markAnswerAsHelpful = (answer_id) =>
  axios.put(
    `${ATELIER_API}/qa/answers/${answer_id}/helpful`,
    { answer_id: answer_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.getAnswer = (question_id) =>
  axios.get(`${ATELIER_API}/qa/questions/${question_id}/answers`, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.reportAnswer = (answer_id) =>
  axios.put(
    `${ATELIER_API}/qa/answers/${answer_id}/report`,
    { answer_id: answer_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.reportQuestion = (question_id) =>
  axios.put(
    `${ATELIER_API}/qa/questions/${question_id}/report`,
    { question_id: question_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.getAnswers = (question_id) =>
  axios.get(`${ATELIER_API}/qa/questions/${question_id}/answers`, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.postQuestion = (product_id, modalData) =>
  axios.post(`${ATELIER_API}/qa/questions`, modalData, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.postAnswer = (product_id, question_id, modalData) =>
  axios.post(`${ATELIER_API}/qa/questions/${question_id}/answers`, modalData, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.markQuestionAsHelpful = (question_id, product_id) =>
  axios.put(
    `${ATELIER_API}/qa/questions/${question_id}/helpful`,
    { question_id: question_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.markAnswerAsHelpful = (answer_id) =>
  axios.put(
    `${ATELIER_API}/qa/answers/${answer_id}/helpful`,
    { answer_id: answer_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.getAnswer = (question_id) =>
  axios.get(`${ATELIER_API}/qa/questions/${question_id}/answers`, {
    headers: { Authorization: process.env.KEY },
  });
module.exports.reportAnswer = (answer_id) =>
  axios.put(
    `${ATELIER_API}/qa/answers/${answer_id}/report`,
    { answer_id: answer_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.reportQuestion = (question_id) =>
  axios.put(
    `${ATELIER_API}/qa/questions/${question_id}/report`,
    { question_id: question_id },
    { headers: { Authorization: process.env.KEY } }
  );
module.exports.postToImgbb = (body) =>
  axios({
    method: "post",
    url: "https://api.imgbb.com/1/upload",
    data: body,
  });
