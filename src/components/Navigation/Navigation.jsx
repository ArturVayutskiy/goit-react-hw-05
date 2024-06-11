import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => {
          return clsx(css.link, isActive && css.isActive);
        }}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => {
          return clsx(css.link, isActive && css.isActive);
        }}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
