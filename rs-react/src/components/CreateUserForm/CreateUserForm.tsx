import React, { Component, createRef, RefObject } from 'react';
import SelectCountry from './SelectCountry';
import TextInput from './TextInput';
import { TProps, TState } from './types';
import style from './CreateUserForm.module.css';
import CheckboxInput from './CheckboxInput';

const defaultState: TState = {
  cansubmit: false,
  username: '',
  birthday: '',
  gender: undefined,
  avatar: '',
  married: false,
  country: '',
};

export class CreateUserForm extends Component<TProps, TState> {
  private avatar: RefObject<HTMLInputElement>;
  private submitBtn: RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);

    this.avatar = createRef<HTMLInputElement>();

    this.submitBtn = createRef<HTMLInputElement>();

    this.state = defaultState;
  }

  changeHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const el = event.target as HTMLInputElement;

    if (!el) return;

    this.setState((prev: TState) => ({
      ...prev,
      cansubmit: true,
    }));
  };

  selectAvatarHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state);
    this.setState((prev: TState) => ({
      ...prev,
      gender: undefined,
      avatar:
        (this.avatar &&
          this.avatar.current &&
          this.avatar.current.files &&
          this.avatar.current.files[0].name) ||
        '',
      married: false,
      country: '',
    }));
  };

  saveUserName = (username: string) => {
    this.setState({ username }, this.checkForm);
  };

  saveBirthday = (birthday: string) => {
    this.setState({ birthday }, this.checkForm);
  };

  saveCountry = (country: string) => {
    this.setState({ country }, this.checkForm);
  };

  saveCheckbox = (married: boolean) => {
    this.setState({ married }, this.checkForm);
  };

  checkForm = () => {
    const { username, birthday, country, married, gender, avatar } = this.state;
    console.log('1: ', this.state);
    this.setState({
      cansubmit:
        username.length > 0 ||
        birthday.length > 0 ||
        country.length > 0 ||
        married ||
        (gender && gender.length > 0) ||
        avatar.length > 0,
    });
  };

  render() {
    return (
      <div>
        <form className={style.form} onSubmit={this.submitFormHandler}>
          <fieldset>
            <legend>Create user profile</legend>

            <TextInput type="text" label="Name" setState={this.saveUserName} />

            <TextInput type="date" label="Date of birth" setState={this.saveBirthday} />

            <SelectCountry setState={this.saveCountry} />

            <CheckboxInput setState={this.saveCheckbox} />

            <p>
              <label htmlFor="avatar">Choose a profile picture:</label>

              <input
                type="file"
                onChange={this.selectAvatarHandler}
                name="avatar"
                accept=".jpg, .jpeg, .png"
                ref={this.avatar}
              />
            </p>

            <p>
              Gender
              <label>
                <input type="radio" name="gender" value="Femaile" />
                Femail
              </label>
              <label>
                <input type="radio" name="gender" value="Male" />
                Mail
              </label>
            </p>
            <input type="submit" disabled={!this.state.cansubmit} ref={this.submitBtn} />
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CreateUserForm;
