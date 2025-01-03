import React from 'react'
import { render, screen } from "@testing-library/react"
import Signup from "./pages/SignUp/signup"

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(<Signup />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });
});
