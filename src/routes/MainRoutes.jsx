import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
/* layout */
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeLanding from "../pages/HomeLanding";
import About from "../pages/About";
import SingleCocktail from "../pages/SingleCocktail";
import SinglePageError from "../pages/SinglePageError";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/about" element={<About />} />
          <Route path="/cocktail/:id" element={<SingleCocktail />} />
        </Route>
        <Route path="*" element={<SinglePageError />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRoutes;
