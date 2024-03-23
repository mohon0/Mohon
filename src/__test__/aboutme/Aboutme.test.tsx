import AboutMeCard from "@/components/page/about/AboutMeCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-image" />,
}));

describe("AboutMeCard", () => {
  test("renders personal information correctly", () => {
    render(<AboutMeCard />);

    expect(screen.getByText("Name: Md. Mohon")).toBeInTheDocument();
    expect(
      screen.getByText("Graphics Designer & IT Teacher"),
    ).toBeInTheDocument();
    // Add similar assertions for other details like birthdate, contact info, etc.
  });

  test("renders description text", () => {
    render(<AboutMeCard />);

    const description = screen.getByText(/Hello, my name is Mohon/i);
    expect(description).toBeInTheDocument();
    // You can further test for specific parts of the description if needed
  });

  test("renders a mock image", () => {
    render(<AboutMeCard />);

    const mockImage = screen.getByTestId("mock-image");
    expect(mockImage).toBeInTheDocument();
  });
});
