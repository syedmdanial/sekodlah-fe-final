import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authAction";
import Wrapper from "../assets/wrappers/Navbar";

const Navbar = (props) => {
  return (
    <Wrapper>
      <div className="nav-center">
        <NavLink to="/" className="logo nav-link">
          SEKODLAH
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="nav-link">
            About
          </NavLink>
          <span
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => props.logoutUser()}
          >
            Logout
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  const {} = state;
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
