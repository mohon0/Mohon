import Footer from "@/components/layout/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer component", () => {
  it("renders social media and freelancing platform links", () => {
    render(<Footer />);

    const socialLinks = screen.getAllByRole("link");
    const expectedPlatforms = [
      "Facebook",
      "Twitter",
      "Instagram",
      "LinkedIn",
      "freelancer",
      "upwork",
      "fiverr",
    ];

    expect(socialLinks.length).toBe(expectedPlatforms.length);

    socialLinks.forEach((link, index) => {
      expect(link.textContent).toBe(expectedPlatforms[index]);
    });
  });

  it("renders copyright information with current year", () => {
    render(<Footer />);
  });
});
