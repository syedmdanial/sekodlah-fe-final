import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../helpers/apiHandlers";
import Wrapper from "../assets/wrappers/CocktailPage";
/* common */
import Loading from "../components/shared/Loading";
/* components */
import AddComments from "../components/AddComments";
import CommentList from "../components/CommentsList";

const SingleCocktail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [singleDrink, setSingleDrink] = useState({});
  const [refreshComment, setRefreshComment] = useState(false);

  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const parts = pathname.split("/");
  const picId = parts[parts.length - 1];

  useEffect(() => {
    getSingleCocktailDetails();
    return () => {};
  }, []);

  const getSingleCocktailDetails = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/json/v1/1/lookup.php?i=${picId}`
      );

      // console.log(res.data.drinks[0]);
      setSingleDrink(res.data.drinks[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setSingleDrink({});
      setIsLoading(false);
    }
  };

  const handleRefreshComment = () => {
    if (refreshComment) setRefreshComment(false);

    if (!refreshComment) setRefreshComment(true);
  };

  const {
    strDrink: name,
    strDrinkThumb: image,
    strAlcoholic: info,
    strCategory: category,
    strGlass: glass,
    strInstructions: instructions,
  } = singleDrink;

  const validIngredients = Object.keys(singleDrink)
    .filter(
      (key) => key.startsWith("strIngredient") && singleDrink[key] !== null
    )
    .map((key) => singleDrink[key]);

  return (
    <div className="SingleCocktail">
      {isLoading && (
        <div className="text-center">
          <Loading />
        </div>
      )}
      {!isLoading && Object.keys(singleDrink).length > 0 && (
        <Wrapper>
          <header>
            <button onClick={() => navigate(-1)} className="btn">
              back home
            </button>
            <h3>{name}</h3>
          </header>
          <div className="drink">
            <img src={image} alt={name} className="img" />
            <div className="drink-info">
              <p>
                <span className="drink-data">name :</span>
                {name}
              </p>
              <p>
                <span className="drink-data">category :</span>
                {category}
              </p>
              <p>
                <span className="drink-data">info :</span>
                {info}
              </p>
              <p>
                <span className="drink-data">glass :</span>
                {glass}
              </p>
              <p>
                <span className="drink-data">ingredients :</span>
                {validIngredients.map((item, index) => {
                  return (
                    <span className="ing" key={item}>
                      {item}
                      {index < validIngredients.length - 1 ? "," : ""}
                    </span>
                  );
                })}
              </p>
              <p>
                <span className="drink-data">instructions :</span>
                {instructions}
              </p>
            </div>
          </div>
          <div className="comments mt-5">
            <div className="top-bottom-box">
              <div className="row">
                <div className="col-6">
                  <AddComments
                    id={picId}
                    refreshComment={refreshComment}
                    handleRefreshComment={handleRefreshComment}
                  />
                </div>
                <div className="col-6">
                  <CommentList
                    id={picId}
                    refreshComment={refreshComment}
                    handleRefreshComment={handleRefreshComment}
                  />
                </div>
              </div>
            </div>
          </div>
        </Wrapper>
      )}
    </div>
  );
};

export default SingleCocktail;
