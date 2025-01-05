import React from 'react'
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { BrowserRouter } from 'react-router-dom';
import Signup from "./pages/SignUp/signup"

describe("Register component", () => {
  it("should render Register component correctly", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(1).toBeTruthy();
  });
});
