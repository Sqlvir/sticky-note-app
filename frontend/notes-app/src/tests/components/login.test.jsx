import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../pages/Login/login';
import axiosInstance from '../../utils/axiosInstance';

// Mock the axios instance
vi.mock('../../utils/axiosInstance');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup(); // Ensure DOM is cleaned after each test
  });

  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

//Below codes testing login component renders correctly


  it('renders login form correctly', () => {
    renderLogin();
    expect(screen.getByPlaceholderText('Email'));
    expect(screen.getByPlaceholderText('Password'));
    expect(screen.getByRole('button', { name: /signin/i }));
  });

  it('displays error for invalid email', async () => {
    renderLogin();
    screen.debug();
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByRole('button', { name: /signin/i });

    const invalidEmails = [
        'test@',
        'test@.com',
        '@domain.com',
        'test@domain.',
        'test.com',
        'test@domain'
    ];

    invalidEmails.forEach(email => {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.click(submitButton);
        expect(screen.getByText('Please enter a valid email address.'));
    });

  });

  it('displays error for empty password', () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /signin/i });

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    screen.debug();

    expect(screen.getByTestId('password-input'));
  });

  it('successfully logs in user and navigates', async () => {
    const mockResponse = {
      data: {
        accessToken: 'fake-token-123',
      },
    };

    axiosInstance.post.mockResolvedValueOnce(mockResponse);
    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /signin/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/login', {
        email: 'user@example.com',
        password: 'password123',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/stickynote');
      expect(localStorage.getItem('token')).toBe('fake-token-123');
    });
  });

  it('handles login error from server', async () => {
    const mockError = {
      response: {
        data: {
          message: 'Invalid credentials',
        },
      },
    };

    axiosInstance.post.mockRejectedValueOnce(mockError);
    renderLogin();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /signin/i });

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials'));
    });
  });

  it('navigates to signup page when clicking create account link', () => {
    renderLogin();
    const signupLink = screen.getByText('Create Account');
    expect(signupLink.getAttribute('href')).toBe('/signup');
  });
});
