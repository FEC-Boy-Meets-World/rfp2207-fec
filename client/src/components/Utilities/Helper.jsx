
module.exports.dataParser = (raw) => {
  let { results } = raw[1].data;
  let curr = results.find((style) => style["default?"]);
  curr ? null : curr = results[0];
  let { ratings } = raw[2].data;

  let count = Object.values(ratings).reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
  let product = 0;
  for (const key in ratings) {
    product += key * ratings[key];
  }
  let percent = (product / count).toFixed(1);

  let parsed = {
    id: raw[0].data.id,
    name: raw[0].data.name,
    category: raw[0].data.category,
    features: raw[0].data.features,
    img: curr.photos[0].thumbnail_url,
    original_price: curr.original_price,
    sale_price: curr.sale_price,
    ratings: percent
  };

  return parsed;
}

module.exports.getAverageRating = (data) => {
  let count = Object.values(data).reduce((prev, curr) => parseInt(prev) + parseInt(curr), 0);
  let product = 0;
  for (const key in data) {
    product += key * data[key];
  }
  let percent = (product / count).toFixed(1);
  return percent;
}

const imgLinkArr = ['https://i.ibb.co/6gZKqxy/theMike.png', 'https://i.ibb.co/C54nJ87/the-Andres.png', 'https://i.ibb.co/pfC9mbw/theLeia.png', "https://i.ibb.co/qNN0wyh/the-Julian.png", "https://i.ibb.co/sPH60LF/theEric.png", "https://i.ibb.co/qkYvW3T/Julian-Chi.jpg"]


module.exports.getRandomPic = () => {
  let randomInt = Math.floor(Math.random() * imgLinkArr.length);
  return imgLinkArr[randomInt]
}