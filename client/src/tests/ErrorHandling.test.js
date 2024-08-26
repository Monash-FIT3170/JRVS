import { render, screen, waitFor } from "@testing-library/react";
import LearningPathPage from "../pages/LearningPathPage";
import { ApiProvider } from "../context/ApiProvider";
import mockFetch from "jest-fetch-mock"; // Pretend API (not super sure how it works)

mockFetch.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

test("error handling during data fetch", async () => {
  // Sim the error
  fetch.mockReject(() => Promise.reject("API bad"));

  render(
    <ApiProvider>
      <LearningPathPage />
    </ApiProvider>
  );

  await waitFor(() => {
    // Expect error message on fetch fail
    const errorMessage = screen.getByText(/Error/i);
    expect(errorMessage).toBeInTheDocument();
  });
});