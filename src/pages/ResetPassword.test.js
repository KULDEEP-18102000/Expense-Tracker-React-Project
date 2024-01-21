// import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for better assertions
import ResetPassword from './ResetPassword';





describe('MyComponent', () => {

    test('renders ResetPasswordEmail',  () => {
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

    test('renders ResetPassword without loading', () => {
      // Test case 2
      render(<ResetPassword />);
      
        // const linkElement = screen.getByText(/address/i);
        // expect(linkElement).toBeInTheDocument();

        // const buttonElement=screen.getByRole('button')
        // userEvent.click(buttonElement)

        const outputElement=screen.getByText('Reset')
        expect(outputElement).toBeInTheDocument()
    });

    test('renders ResetPassword with loading',async () => {
      // Test case 2
      // render(<ResetPassword />);
      
        // const linkElement = screen.getByText(/address/i);
        // expect(linkElement).toBeInTheDocument();

        // const buttonElement=screen.getByRole('button')
        // const buttonElement=screen.getByText('Load')
        // userEvent.click(buttonElement)

        // const outputElement=screen.getByText('Sending')
        // expect(outputElement).toBeInTheDocument()


        render(<ResetPassword />);

  // Click the "Load" button to trigger the loading state
  fireEvent.click(screen.getByText('Load'));

  // Wait for the "Sending" text to appear
  await waitFor(() => {
    expect(screen.getByText('...Sending Request')).toBeInTheDocument();
  });
    });
  });