import React, { Component } from "react";
import axios from "axios";
import { API_BASE_URL } from "../helpers/apiHandlers";
/* common */
import Loading from "../components/shared/Loading";
/* components */
import CocktailList from "../components/CocktailList";

class HomeLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getDrinkList();
  }

  getDrinkList() {
    try {
      this.setState({ isLoading: true }, async () => {
        const response = await axios.get(
          `${API_BASE_URL}/json/v1/1/search.php?s=`
        );
        // console.log(response.data.drinks);
        this.setState({
          drinks: response.data.drinks,
          isLoading: false,
        });
      });
    } catch (err) {
      console.log(err);
      this.setState({
        drinks: [],
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, drinks } = this.state;
    return (
      <div className="Home">
        {isLoading && (
          <div className="text-center">
            <Loading />
          </div>
        )}
        {!isLoading && drinks.length > 0 && (
          <CocktailList drinks={this.state.drinks} />
        )}
      </div>
    );
  }
}

export default HomeLanding;
