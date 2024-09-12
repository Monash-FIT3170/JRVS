import LearningPathPage from "../pages/LearningPathPage";
import { ApiProvider } from "../context/ApiProvider";
import { render, screen } from '@testing-library/react';

test("renders admin options if user is a teacher", async () => {
  render(
    <ApiProvider>
      <LearningPathPage />
    </ApiProvider>
  );

  // Load data and check for conditional elements
  const insertButton = await screen.findByText(/Insert/i);
  expect(insertButton).toBeInTheDocument();

  const appendButton = await screen.findByText(/Append/i);
  expect(appendButton).toBeInTheDocument();
});