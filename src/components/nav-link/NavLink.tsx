import React from "react";
import { NavLink as Nav } from "react-router-dom";

type Props = {
  route: string;
  title: string;
};

const NavLink: React.FC<Props> = ({ route, title }: Props) => {
  return (
    <Nav
      exact
      to={route}
      style={{
        color: "white",
        textDecoration: "none",
        margin: 8,
        fontSize: "14px",
      }}
      activeStyle={{
        color: "white",
        borderBottom: "1px solid white",
      }}
    >
      {title}
    </Nav>
  );
};

export default NavLink;
