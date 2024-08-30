/**
 * @file HomePage.js
 * @description This component renders the home page, featuring a `MenuBar` component with a title and subtitle. It serves as an introductory page to guide users towards learning more about AI.
 *
 * @module HomePage
 * @requires React
 * @requires MenuBar from ../components/MenuBar
 *
 * @example
 * // Example usage:
 * import HomePage from './HomePage';
 *
 * function App() {
 *   return <HomePage />;
 * }
 *
 * @returns {JSX.Element} The rendered home page with a `MenuBar` displaying a title and subtitle.
 */

import React from "react";
import MenuBar from "../components/MenuBar";

const HomePage = () => {
  return (
    <div>
      <MenuBar
        title="UNIT OVERVIEW"
        subtitle="Get ready to learn more about AI today"
      />
    </div>
  );
};

export default HomePage;
