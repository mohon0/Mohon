import Cta from "@/components/page/home/Cta";
import { render } from "@testing-library/react";

describe("Cta Component", () => {
  it("renders without crashing", () => {
    render(<Cta />);
  });
});
