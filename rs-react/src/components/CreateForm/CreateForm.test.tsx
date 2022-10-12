import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CreateForm from './CreateForm';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  beforeEach(() => {
    render(<CreateForm onAdd={() => {}} />);
  });

  test('renders form', () => {
    expect(screen.getByRole('form', { name: /user form/i })).toBeInTheDocument();
  });

  test('renders disabled submit button', () => {
    const btn = screen.getByRole('button', { name: /submit/i });
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

  // test('check upload file', () => {
  //   const testImg = './assets/test-img.png';
  // const file = new File([testImg], 'test-img.png', { type: 'image/png' });
  // const input = screen.getByLabelText(/Choose file/i);

  //userEvent.upload(input, file);

  // expect(input.files[0]).toBe(file)
  // expect(input.files.item(0)).toBe(file)
  // expect(input.files).toHaveLength(1)
  // });

  test('check form fields before submit', async () => {
    const nameInput = screen.getByLabelText(/name/i);
    const btn = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'Nick' } });

    fireEvent.submit(btn);

    const errorMessages = await screen.findAllByText(/required field/i);
    expect(errorMessages).toBeDefined();
  });

  test('show success message after submit', async () => {
    //const form = screen.getByRole('form');
    const user = {
      name: 'Nick',
      birthday: '2000-05-05',
      country: 'Italy',
      gender: 'Male',
    };
    // const files = [
    //   new File(['hello'], 'hello.png', { type: 'image/png' }),
    //   new File(['there'], 'there.png', { type: 'image/png' }),
    // ];
    const nameInput = screen.getByRole('textbox', { name: /user name/i });
    const dateInput = screen.getByLabelText(/birthday/i);
    const select = screen.getByRole('combobox');
    const radio = screen.getByRole('list');
    const checkbox = screen.getByRole('checkbox');
    const btn = screen.getByRole('button', { name: /submit/i });

    expect(btn).toBeDisabled();
    userEvent.paste(nameInput, user.name);
    userEvent.paste(dateInput, user.birthday);
    userEvent.selectOptions(select, user.country);
    userEvent.click(checkbox);
    userEvent.click(radio);

    expect(btn).toBeEnabled();
    userEvent.click(btn);

    //const successMessage = await screen.findByTestId('successMessage');

    // expect(successMessage).toBeInTheDocument();
    // expect(successMessage).toBeVisible();
  });
});
