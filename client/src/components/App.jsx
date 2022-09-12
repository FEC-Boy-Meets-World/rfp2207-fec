import React, { useState, useEffect, createContext, useReducer } from "react";

import Overview from "./Overview/Overview.jsx";
import RelatedItemsAndOutfits from "./RelatedItems/MainRIO.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviewsMain.jsx";
import QuestionsAndAnswers from "./QuestionsAndAnswers/QuestionsAndAnswers.jsx";
import ToggleSwitch from "./ToggleSwitch.jsx";

import Helper from "./Utilities/Helper.jsx";
import UserInteractions from "./Utilities/UserInteractions.jsx";
import axios from "axios";

const Atelier = require("./Utilities/Atelier.jsx");

export const ProductContext = createContext();

const reducer = (state, newState) => ({ ...state, ...newState });

const initialeState = {
  id: 65635,
  product_info: {},
  product_rating: {},
  product_style: [],
  product_average_rating: 0,
  product_parsed_data: {},
};

const App = (props) => {
  const [state, setState] = useReducer(reducer, initialeState);

  useEffect(() => {
    axios
      .all([
        Atelier.getProductInfo(state.id),
        Atelier.getProductStyle(state.id),
        Atelier.getReviewMetaData(state.id),
      ])
      .then((responses) => {
        let { ratings } = responses[2].data;
        let parsed = Helper.dataParser(responses);
        setState({
          product_info: responses[0].data,
          product_style: responses[1].data,
          product_rating: responses[2].data,
          product_average_rating: Helper.getAverageRating(ratings),
          product_parsed_data: parsed,
        });
      });
  }, [state.id]);

  const changeId = (newId) => {
    setState({ id: newId });
  };

  const [placeholder, setPlaceholder] = useState(
    "https://i.ibb.co/pfC9mbw/theLeia.png"
  );

  useEffect(() => {
    setPlaceholder(Helper.getRandomPic());
  }, [state.id]);

  // hook for toggling dark mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    if (!darkMode) {
      // if dark mode is not on, change to darkMode
      setDarkMode(true);
    } else {
      // turn dark mode off
      setDarkMode(false);
    }
  };

  return (
    <div id="app" className={darkMode ? "darkMode" : "lightMode"}>
      <ProductContext.Provider
        value={{ ...state, changeId, darkMode, placeholder }}
      >
        <UserInteractions>
          <ToggleSwitch
            label="Dark Mode"
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <Overview />
          <RelatedItemsAndOutfits />
          <QuestionsAndAnswers id={state.id} />
          <RatingsAndReviews state={state} />
        </UserInteractions>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
