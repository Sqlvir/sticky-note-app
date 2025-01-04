import React from "react";
import { render, screen } from "@testing-library/react";
import { it, describe } from "vitest";
import Login from "../../pages/Login/login";


describe('Login component', () => {
    it('should test login component', () => {
        render(<Login Email="testuser@gmail.com" password="testuser@123" />);

        screen.debug();
    });
});