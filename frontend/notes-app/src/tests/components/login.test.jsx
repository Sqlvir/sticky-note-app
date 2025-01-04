import React from "react";
import { render, screen } from "@testing-library/react";
import { it, describe } from "vitest";
import Login from "../../pages/Login/login";
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";

const renderLoginPage = () => {
    render(
            <Router initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
    );
};

describe('Login component', () => {
    it("validate function should pass on correct input ", () => {
        /*render(<Login />);
        const inputNode = screen.getByPlaceholderText('Email');
        <Router>
                <Login />
        </Router>
        screen.debug();*/
        renderLoginPage();
        const emailInput = screen.getByPlaceholderText('Email:');
        const passwordInput = screen.getByPlaceholderText('Password:');

        fireEvent.change(emailInput, { target: { value: 'testuser@gmail.com' } });
        fireEvent.change(passwordInput, { target: { value: 'testuser@123' } });

        expect(emailInput.value).toBe('testuser@gmail.com');
        expect(passwordInput.value).toBe('testuser@123');

    });
});