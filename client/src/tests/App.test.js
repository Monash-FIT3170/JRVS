/**
 * @file App.test.js
 * @description Contains tests for the App component to ensure proper rendering and functionality.
 *
 * @module App.test
 * @requires @testing-library/react
 * @requires ../App
 *
 * @test {App} - Renders the "learn react" link correctly
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
