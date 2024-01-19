import { render, screen } from '@testing-library/react';

import ResetPassword from './ResetPassword';





describe('MyComponent', () => {

    test('renders ResetPasswordEmail', () => {
        render(<ResetPassword />);
      
        const linkElement = screen.getByText(/Email/i);
        expect(linkElement).toBeInTheDocument();
      });
  
    test('renders ResetPasswordaddress', () => {
      // Test case 2
      render(<ResetPassword />);
      
        const linkElement = screen.getByText(/address/i);
        expect(linkElement).toBeInTheDocument();
    });
  });