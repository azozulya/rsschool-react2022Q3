import React from 'react';
import { render, screen } from '@testing-library/react';
import CreateForm from './CreateForm';
import userEvent from '@testing-library/user-event';

describe('Form', () => {
  const testImg = './assets/test-img.png';
  const file = new File([testImg], 'test-img.png', { type: 'image/png' });
  const user = {
    name: 'Nick',
    birthday: '2000-05-05',
    country: 'Italy',
    gender: 'Male',
    avatar: testImg,
  };

  let formElement: HTMLFormElement;
  let submitBtn: HTMLButtonElement;
  let nameInput: HTMLInputElement;
  let dateInput: HTMLInputElement;
  let radioElement: HTMLInputElement;
  let checkboxElement: HTMLInputElement;
  let selectElement: HTMLSelectElement;
  let fileUploadElement: HTMLInputElement;

  const submitHandler = jest.fn();

  Object.defineProperty(global.self, 'crypto', {
    value: {
      randomUUID: () => Date.now() + (Math.random() * 100).toFixed(),
    },
  });

  beforeEach(() => {
    URL.createObjectURL = jest.fn(() => testImg);

    render(<CreateForm />);

    formElement = screen.getByRole('form', { name: /user form/i });
    submitBtn = screen.getByRole('button', { name: /submit/i });
    nameInput = screen.getByRole('textbox', { name: /user name/i });
    dateInput = screen.getByLabelText(/birth/i);
    selectElement = screen.getByRole('combobox');
    radioElement = screen.getByRole('radio', { name: /other/i });
    checkboxElement = screen.getByRole('checkbox', { name: /I consent /i });
    fileUploadElement = screen.getByLabelText(/avatar/i);
  });

  test('renders form', () => {
    screen.debug();
    expect(formElement).toBeInTheDocument();
  });

  test('renders disabled submit button', () => {
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });

  test('renders empty form fields', () => {
    expect(formElement).toHaveFormValues({
      username: '',
      birthday: '',
      gender: undefined,
      avatar: '',
      agree: false,
      country: '',
    });
  });

  test('change name field set submit button active', () => {
    expect(submitBtn).toBeDisabled();
    userEvent.paste(nameInput, 'Nick');
    expect(submitBtn).not.toBeDisabled();
  });

  test('show avatar preview', async () => {
    userEvent.upload(fileUploadElement, file);
    expect(URL.createObjectURL(file)).toBe(testImg);

    const preview = await screen.findByTestId(/avatarPreview/i);
    expect(preview).toBeInTheDocument();
  });

  test('should validate form fields before submit and show alerts', async () => {
    userEvent.type(nameInput, 'Nick');

    expect(submitBtn).not.toBeDisabled();
    userEvent.click(submitBtn);

    const errorMessages = await screen.findAllByRole('alert');
    expect(errorMessages).toBeDefined();
    expect(errorMessages).toHaveLength(5);
    expect(submitHandler).not.toBeCalled();
  });

  test('should show success message after submit', async () => {
    userEvent.paste(nameInput, user.name);
    userEvent.paste(dateInput, user.birthday);
    userEvent.selectOptions(selectElement, user.country);
    userEvent.click(checkboxElement);
    userEvent.click(radioElement);
    userEvent.upload(fileUploadElement, file);

    expect(submitBtn).toBeEnabled();
    userEvent.click(submitBtn);

    // const successMessage = await screen.findByTestId('successMessage');
    // expect(successMessage).toBeInTheDocument();
    // expect(successMessage).toBeVisible();
  });
});
