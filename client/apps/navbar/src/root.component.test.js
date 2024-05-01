import { render } from "@testing-library/react";
import NavBar from "./navbar.component";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<NavBar name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
