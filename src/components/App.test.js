import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

describe("Splash Page", () => {
  it("should render the correct title", () => {
    const { getByText } = render(<App />);
    const titleElement = getByText(/splash page/i);
    expect(titleElement).toBeInTheDocument();
  });
});
