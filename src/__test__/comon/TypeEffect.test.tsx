// TypeEffect.test.tsx

// Import necessary libraries
import TypeEffect from "@/components/common/animation/TypeEffect"; // Assuming TypeEffect is in the same directory
import "@testing-library/jest-dom";
import { render, waitFor } from "@testing-library/react";

describe("TypeEffect component", () => {
  it("renders first text correctly", async () => {
    const { getByText } = render(<TypeEffect />);
    await waitFor(() => getByText("I Am A Freelancer"), { timeout: 5000 });
    expect(getByText("I Am A Freelancer")).toBeInTheDocument();
  });
});
