import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateForm from './CreateForm';

describe('Form', () => {
  beforeEach(() => {
    render(<CreateForm onAdd={() => {}} />);
  });

  test('renders form', () => {
    expect(screen.getByTestId('createForm')).toBeInTheDocument();
  });

  test('renders disabled submit button', () => {
    const btn = screen.getByDisplayValue(/submit/i);
    expect(btn).toBeInTheDocument();
    expect(btn).toBeDisabled();
  });

  test('renders empty name field', () => {
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
  });

  test('change name field set submit active', () => {
    const nameInput = screen.getByLabelText(/name/i);
    const btn = screen.getByDisplayValue(/submit/i);

    fireEvent.change(nameInput, { target: { value: 'Nick' } });

    expect(btn).not.toBeDisabled();
  });

  test('check form fields before submit', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const btn = screen.getByDisplayValue(/submit/i);

    fireEvent.change(nameInput, { target: { value: 'Nick' } });

    fireEvent.submit(btn);

    const errorMessages = await screen.findAllByText(/required field/i);
    expect(errorMessages).toBeDefined();
  });

  // test('show success message after submit', async () => {
  //   const form = screen.getByTestId('createForm');

  //   const successMessage = await screen.findByTestId('successMessage');
  // });
});
