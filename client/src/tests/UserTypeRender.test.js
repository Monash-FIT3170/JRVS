import { render, screen, waitFor } from "@testing-library/react";
import LearningPathPage from "../pages/LearningPathPage";
import { ApiProvider } from "../context/ApiProvider";

test("renders admin options if user is a teacher", async () => {
  render(
    <ApiProvider>
      <LearningPathPage />
    </ApiProvider>
  );

  // Wait for the data to load
  await waitFor(() => {
    // Check for conditional elements
    const insertButton = screen.getByText(/Insert/i);

    expect(insertButton).toBeInTheDocument();
  });

  await waitFor(() => {
    // Check for conditional elements pt 2
    const appendButton = screen.getByText(/Append/i);
    expect(appendButton).toBeInTheDocument();
    });
}