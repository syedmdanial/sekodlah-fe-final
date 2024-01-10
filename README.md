#### Install and Setup

```sh
  npm install
  npm run dev
```

#### SPA

SPA stands for Single-Page Application, which is a web application that dynamically updates its content without requiring a full page reload. It achieves this by loading the initial HTML, CSS, and JavaScript resources and then dynamically fetching data and updating the DOM as users interact with the application.

React Router is a JavaScript library used in React applications to handle routing and navigation. It provides a declarative way to define the routes of an application and render different components based on the current URL. React Router allows developers to create a seamless, client-side navigation experience within a SPA by mapping URLs to specific components and managing the history and URL changes.

[React Router](https://reactrouter.com/en/main)
(https://www.npmjs.com/package/react-router-dom)

```sh
npm i react-router-dom@6.11.2
```

#### Page routes can be found in MainRoutes.jsx

#### Setup Pages

- pages are layouts
- create src/pages
- HomeLanding, Login, Register, About, SingleCocktail, SinglePageError

- example:

About.jsx

```js
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
};
export default About;
```

#### Navbar

- create components/Navbar.jsx

Navbar.jsx

```js
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

#### Create PrivateRoutes

```js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
/* components */
import Navbar from "../components/Navbar";

const PrivateRoutes = ({
  component: component,
  auth: { isLoggedIn },
  ...rest
}) => {
  const isLoggedIn = true; // mock user is logged in
  return isLoggedIn ? (
    <>
      <Navbar />
      <section className="page">
        {/* need to have <Outlet /> if got children nested routes */}
        <Outlet />
      </section>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
```

#### Setup routes with nested pages

MainRoutes.jsx

- example:

```js
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
/* layout */
import Login from "../pages/Login";
import HomeLanding from "../pages/HomeLanding";
import About from "../pages/About";
import SinglePageError from "../pages/SinglePageError";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/about" element={<About />} />
        </Route>
        {/* fallback if page/path/route not found */}
        <Route path="*" element={<SinglePageError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
```

- add other routes & pages accordingly

#### SASS (optional but strongly recommended)

```sh
  npm i sass
```

- css but more
- makes css more fun

https://sass-lang.com/
https://www.npmjs.com/package/sass

#### Styled Components

- CSS in JS
- Styled Components
- have logic and styles in component
- no name collisions
- apply javascript logic
- [Styled Components Docs](https://styled-components.com/)
- [Styled Components Course](https://www.udemy.com/course/styled-components-tutorial-and-project-course/?referralCode=9DABB172FCB2625B663F)

```js
import styled from "styled-components";

const El = styled.el`
  // styles go here (can be updated accordinly)
`;
```

- no name collisions, since unique class
- vscode-styled-components extension
- colors and bugs
- example:

```js
import styled from "styled-components";
const StyledBtn = styled.button`
  background: red;
  color: white;
  font-size: 2rem;
  padding: 1rem;
`;
```

#### Alternative Setup for syled components

- style entire react component

```js
const Wrapper = styled.el``;

const Component = () => {
  return (
    <Wrapper>
      <h1> Component</h1>
    </Wrapper>
  );
};
```

- only responsible for styling

#### Assets

- wrappers folder in assets
- example:
- Navbar.jsx

```js
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-center">
        <span className="logo">MixMaster</span>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <NavLink to="/newsletter" className="nav-link">
            Newsletter
          </NavLink>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background: var(--white);
  .nav-center {
    width: var(--view-width);
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2rem;
  }

  .logo {
    font-size: clamp(1.5rem, 3vw, 3rem);
    color: var(--primary-500);
    font-weight: 700;
    letter-spacing: 2px;
  }
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }
  .nav-link {
    color: var(--grey-900);
    padding: 0.5rem 0.5rem 0.5rem 0;
    transition: var(--transition);
    letter-spacing: 1px;
  }
  .nav-link:hover {
    color: var(--primary-500);
  }
  .active {
    color: var(--primary-500);
  }

  @media (min-width: 768px) {
    .nav-center {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    .nav-links {
      flex-direction: row;
      margin-top: 0;
    }
  }
`;

export default Navbar;
```

#### Error Page

- wrong url

SinglePageError.jsx

```js
iimport React from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/not-found.svg";

const SinglePageError = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div>
        <img src={img} he alt="not found" />
        <h3>Ohh!</h3>
        <p>We can't seem to find page you are looking for</p>
        <button className="btn btn-solid" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    </Wrapper>
  );
};

export default SinglePageError;

```

#### Error Page - CSS (optional)

assets/wrappers/ErrorPage.js

```js
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--grey-500);
  }
  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

export default Wrapper;
```

#### Fetch

- useEffect approach

```js
const fetchSomething = async () => {
  try {
    const response = await axios.get("/someUrl");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchSomething();
}, []);
```

- class component approach (componentDidMount())
-

```js
class Home extends React {
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    try {
      const response = await axios.get("/someUrl");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default Home;
```

#### APIs

#### TheCocktailDB

[API](https://www.thecocktaildb.com/)

- Get cocktail list
  www.thecocktaildb.com/api/json/v1/1/search.php?s=
- Search cocktail by name
  www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
- Lookup full cocktail details by id
  www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007

#### Login & Comments API

- install node, npm and mongoDB
- clone API repo here
  https://github.com/syedmdanial/sekodlah-be

```sh
  npm i
  node app.js
```

- login
  POST http://localhost:3000/login

```json
{
  "username": "dani",
  "password": "1234"
}
```

- register
  POST http://localhost:3000/register

```json
{
  "username": "dani",
  "password": "1234"
}
```

// note picId is the id for the drink

- get comments
  GET http://localhost:3000/comments/:picId

- add comment
  POST http://localhost:3000/comments

```json
{
  "username": "{username}",
  "picId": "{picId}",
  "comment": "{comment}"
}
```

#### More Components

- in src/components create, CocktailList, CocktailCard
- render CocktailList in HomeLanding.jsx
- pass drinks, iterate over and render in CocktailCard

HomeLanding.jsx

```js
class HomeLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      isLoading: false,
    };
  }

  // create get data function, and call function in didMount()

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
```

CocktailList.jsx

```jsx
import CocktailCard from "./CocktailCard";
import Wrapper from "../assets/wrappers/CocktailList";
const CocktailList = ({ drinks }) => {
  if (!drinks) {
    return (
      <h4 style={{ textAlign: "center" }}>No matching cocktails found...</h4>
    );
  }

  const formattedDrinks = drinks.map((item) => {
    const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
      info: strAlcoholic,
      glass: strGlass,
    };
  });
  return (
    <Wrapper>
      {formattedDrinks.map((item) => {
        return <CocktailCard key={item.id} {...item} />;
      })}
    </Wrapper>
  );
};

export default CocktailList;
```

```jsx
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/CocktailCard";
const CocktailCard = ({ image, name, id, info, glass }) => {
  return (
    <Wrapper>
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <div className="footer">
        <h4>{name}</h4>
        <h5>{glass}</h5>
        <p>{info}</p>

        <Link to={`/cocktail/${id}`} className="btn">
          details
        </Link>
      </div>
    </Wrapper>
  );
};

export default CocktailCard;
```

#### CocktailList and CocktailCard CSS (optional)

#### Single Cocktail

MainRoutes.jsx

```js
import SingleCocktail from "../pages/SingleCocktail";

<Route path="/" element={<PrivateRoutes />}>
  <Route path="/cocktail/:id" element={<SingleCocktail />} />
</Route>;
```

Cocktail.jsx

```js
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
```

#### Setup React Toastify

main.jsx

```js
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import MainRoutes from "./routes/MainRoutes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer autoClose={2000} />
    <MainRoutes />
  </>
);
```

#### Redux & Persist

#### Redux store with redux toolkit

- storing of state
- pass state across components as props

```sh
npm i redux react-redux @reduxjs/toolkit
```

https://redux.js.org/
https://www.npmjs.com/package/redux

#### Redux Persist

- enables the persistence of Redux store data across sessions
- rehydrate your Redux store state

  https://www.npmjs.com/package/redux-persist

```sh
npm i redux-persist
```

- create folder /store
- create folder /store/action for action
- create folder /store/reducer for reducers
- create store.jsx in /store
- create authReducer.jsx & index.jsx in /store/reducer
- create authAction.jsx in /store/action
- create migrations.jsx in /store

authAction.jsx

```javascript
export const setLoginSuccess = (res) => (dispatch) => {
  console.log(res);
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: res,
  });
};

export const logoutUser = () => ({
  type: "LOGOUT",
  payload: {},
});
```

authReducer.jsx

```javascript
const initialState = {
  // Your initial state here
  isLoggedIn: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle different action types here
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
```

index.jsx (root reducer file)

```javascript
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  // Add more reducers as needed
});

export default rootReducer;
```

migrations.jsx

```javascript
const migrations = {
  0: (state) => ({
    // Keep only auth state
    auth: state.auth,
  }),
  1: (state) => ({}), // Update whole store
};

export default migrations;
```

store.jsx

```javascript
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import migrations from "./migrations";

const persistConfig = {
  key: "SEKODLAH-STORE",
  storage,
  version: 0,
  migrate: createMigrate(migrations, { debug: false }),
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer, // Use the 'reducer' property here
  // Additional configuration options if needed
});

export const persistor = persistStore(store);
```

#### update main.jsx to contain redux

main.jsx

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store/store";
import MainRoutes from "./routes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";

import "./styles/index.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer autoClose={2000} />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MainRoutes />
      </PersistGate>
    </Provider>
  </>
);
```

#### accessing redux action

```javascript
import React, { useState } from "react";
import { connect } from "react-redux";
import { setLoginSuccess } from "../store/actions/authAction";

handleSubmit() {
  /**
    hit login API, upon success, update redux store
  */
  if (success) {
    this.props.setLoginSuccess(data);
  }
}

const Login = (props) => {
  return (
    <div className="w-screen h-[80vh] flex  justify-center items-center">
      <Form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Login</h3>
        {/* form code here */}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setLoginSuccess: (data) => dispatch(setLoginSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

```

#### accessing redux state

```javascript
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
/* components */
import Navbar from "../components/Navbar";

const PrivateRoutes = ({
  component: component,
  auth: { isLoggedIn },
  ...rest
}) => {
  return isLoggedIn ? (
    <>
      <Navbar />
      <section className="page">
        <Outlet />
      </section>
    </>
  ) : (
    <Navigate to="/login" />
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoutes);
```

#### Default Behavior

The "method" attribute in an HTML form specifies the HTTP method to be used when submitting the form data to the server. The two commonly used values for the "method" attribute are:

GET: This is the default method if the "method" attribute is not specified. When the form is submitted with the GET method, the form data is appended to the URL as a query string. The data becomes visible in the URL, which can be bookmarked and shared. GET requests are generally used for retrieving data from the server and should not have any side effects on the server.

POST: When the form is submitted with the POST method, the form data is included in the request payload rather than being appended to the URL. POST requests are typically used when submitting sensitive or large amounts of data to the server, as the data is not directly visible in the URL. POST requests can have side effects on the server, such as updating or inserting data.

- action attribute

  The "action" attribute in an HTML form specifies the URL or destination where the form data should be sent when the form is submitted. It defines the server-side script or endpoint that will receive and process the form data.

If the action attribute is not provided in the HTML form, the browser will send the form data to the current URL, which means it will submit the form to the same page that the form is on. This behavior is referred to as a "self-submitting" form.

#### React Router - Action

Route actions are the "writes" to route loader "reads". They provide a way for apps to perform data mutations with simple HTML and HTTP semantics while React Router abstracts away the complexity of asynchronous UI and revalidation. This gives you the simple mental model of HTML + HTTP (where the browser handles the asynchrony and revalidation) with the behavior and UX capabilities of modern SPAs.

#### Redirects

- in public folder create "\_redirects"

```
/* /index.html 200
```
