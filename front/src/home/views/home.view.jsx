// vendors
import React from "react";
import { Link } from 'react-router-dom';

// assets
//import logo from 'assets/logo.svg';

const Home = () => {
  return (
    <>
      <div data-testid='inicio'>inicio</div>
      <Link to="projects">{'Ir a  proyectos'}</Link>
    </>
  );
};

export default Home;
