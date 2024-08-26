import { render, screen } from "@testing-library/react";
import LearningPathPage from "../pages/LearningPathPage";
import { ApiProvider } from "../context/ApiProvider";

test("displays loading spinner while fetching data", () => {
  render(
    <ApiProvider>
      <LearningPathPage />
    </ApiProvider>
  );

  // Check if the spinner is rendered
  const spinner = screen.getByClass("spinner");
  expect(spinner).toBeInTheDocument();
});