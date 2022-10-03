import React, { Component, createRef, RefObject } from 'react';
import SelectCountry from './elements/SelectCountry';
import TextInput from './elements/TextInput';
import CheckboxInput from './elements/CheckboxInput';
import { EGender, TCreateFormProps, TCreateFormState } from './CreateForm.types';
import style from './CreateForm.module.css';
import FileInput from './elements/FileInput';
import RadioGroup from './elements/RadioGroup';

export class CreateForm extends Component<TCreateFormProps, TCreateFormState> {
  private cardsList: JSX.Element[];
  private formRef: RefObject<HTMLFormElement>;
  private defaultState: TCreateFormState = {
    showError: false,
    canSubmit: false,
    user: {
      username: '',
      birthday: '',
      gender: '',
      avatar: '',
      married: false,
      country: '',
    },
  };

  constructor(props: TCreateFormProps) {
    super(props);

    this.formRef = createRef();

    this.state = { ...this.defaultState };

    this.cardsList = [];
  }

  submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, birthday, country, married, gender, avatar } = this.state.user;

    if (
      Boolean(username) &&
      Boolean(birthday) &&
      Boolean(country) &&
      married &&
      Boolean(gender) &&
      Boolean(avatar)
    ) {
      this.props.onAdd(this.state.user);
      this.formRef.current?.reset();
      this.setState({ ...this.defaultState });
      return;
    }
    console.log('not submit: ', this.state);
    this.setState({ canSubmit: false, showError: true });
  };

  saveParam = (key: string, value: string | boolean) => {
    console.log(key, value);
    this.setState(
      (prevState) => ({ ...prevState, user: { ...prevState.user, [key]: value } }),
      this.checkForm
    );
  };

  checkForm = () => {
    const { username, birthday, country, married, gender, avatar } = this.state.user;

    const noErrors =
      Boolean(username) &&
      Boolean(birthday) &&
      Boolean(country) &&
      Boolean(avatar) &&
      Boolean(gender) &&
      married;

    if (noErrors) {
      this.setState({
        canSubmit: true,
        showError: false,
      });
      return;
    }

    const canSubmit =
      (Boolean(username) ||
        Boolean(birthday) ||
        Boolean(country) ||
        Boolean(avatar) ||
        Boolean(gender) ||
        married) &&
      !this.state.showError;

    this.setState({
      canSubmit,
    });
  };

  render() {
    const genderArray: string[] = Object.values(EGender);

    return (
      <>
        <form className={style.form} onSubmit={this.submitFormHandler} ref={this.formRef}>
          <fieldset className={style.formWrapper}>
            <legend className={style.formTitle}>Create user profile</legend>

            <TextInput
              type="text"
              label="Name"
              inpName="username"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <TextInput
              type="date"
              label="Date of birth"
              inpName="birthday"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <SelectCountry
              title="Country"
              selectName="country"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <RadioGroup
              values={genderArray}
              name="gender"
              label="Gender"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <FileInput
              inpName="avatar"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <CheckboxInput
              inpName="married"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />
            <input type="submit" disabled={!this.state.canSubmit} />
          </fieldset>
        </form>
        <div>{this.cardsList.length > 0 && this.cardsList.map((card) => card)}</div>
      </>
    );
  }
}

export default CreateForm;
