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
    // Check for elements specific to the teacher/admin interface
    const insertButton = screen.getByText(/Insert/i);
    const appendButton = screen.getByText(/Append/i);

    expect(insertButton).toBeInTheDocument();
    expect(appendButton).toBeInTheDocument();
  });
});