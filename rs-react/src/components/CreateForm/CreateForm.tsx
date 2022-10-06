import React, { Component, createRef, RefObject } from 'react';
import SelectCountry from './elements/SelectCountry';
import TextInput from './elements/TextInput';
import CheckboxInput from './elements/CheckboxInput';
import { EGender, TCreateFormProps, TCreateFormState } from './CreateForm.types';
import style from './CreateForm.module.css';
import FileInput from './elements/FileInput';
import RadioGroup from './elements/RadioGroup';

export class CreateForm extends Component<TCreateFormProps, TCreateFormState> {
  private formRef: RefObject<HTMLFormElement>;
  private genderArray: string[] = Object.values(EGender);
  private defaultState: TCreateFormState = {
    showError: false,
    canSubmit: false,
    user: {
      username: '',
      birthday: '',
      gender: '',
      avatar: '',
      agree: false,
      country: '',
    },
  };
  private successRef: React.RefObject<HTMLDivElement>;

  constructor(props: TCreateFormProps) {
    super(props);

    this.formRef = createRef();
    this.successRef = createRef();
    this.state = { ...this.defaultState };
  }

  checkFormFilled = () => {
    const { username, birthday, country, agree, gender, avatar } = this.state.user;
    return (
      agree &&
      Boolean(username) &&
      Boolean(birthday) &&
      Boolean(country) &&
      Boolean(gender) &&
      Boolean(avatar)
    );
  };

  submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormFilled = this.checkFormFilled();

    if (!isFormFilled) {
      this.setState({ canSubmit: false, showError: true });
      return;
    }

    this.setState({ canSubmit: false });
    this.successRef.current?.classList.add(style.show);

    setTimeout(() => {
      this.props.onAdd(this.state.user);
      this.formRef.current?.reset();
      this.setState({ ...this.defaultState });
      this.successRef.current?.classList.remove(style.show);
    }, 2000);
  };

  saveParam = (key: string, value: string | boolean) => {
    this.setState(
      (prevState) => ({ ...prevState, user: { ...prevState.user, [key]: value } }),
      this.checkForm
    );
  };

  checkForm = () => {
    const { username, birthday, country, agree, gender, avatar } = this.state.user;

    const isFormFilled = this.checkFormFilled();

    if (isFormFilled) {
      this.setState({
        canSubmit: true,
        showError: false,
      });
      return;
    }

    this.setState({
      canSubmit:
        (Boolean(username) ||
          Boolean(birthday) ||
          Boolean(country) ||
          Boolean(avatar) ||
          Boolean(gender) ||
          agree) &&
        !this.state.showError,
    });
  };

  render() {
    return (
      <>
        <form
          aria-label="Create user form"
          data-testid="createForm"
          className={style.form}
          onSubmit={this.submitFormHandler}
          ref={this.formRef}
        >
          <fieldset className={style.formWrapper}>
            <legend className={style.formTitle}>Create user profile</legend>

            <div className={style.formContent}>
              <div className={style.fileUploadWrapper}>
                <FileInput
                  inpName="avatar"
                  setValue={this.saveParam}
                  isShowError={this.state.showError}
                />
              </div>

              <div>
                <TextInput
                  type="text"
                  label="Name"
                  inpName="username"
                  setValue={this.saveParam}
                  isShowError={this.state.showError}
                />

                <div className={style.twoColumn}>
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
                </div>

                <RadioGroup
                  name="gender"
                  label="Gender"
                  values={this.genderArray}
                  setValue={this.saveParam}
                  isShowError={this.state.showError}
                />
              </div>
            </div>

            <CheckboxInput
              title="I consent to my personal data"
              inpName="agree"
              setValue={this.saveParam}
              isShowError={this.state.showError}
            />

            <input
              type="submit"
              disabled={!this.state.canSubmit}
              className={style.submit}
              value="Submit"
            />
          </fieldset>
        </form>
        <div className={style.success} ref={this.successRef} data-testid="successMessage">
          <div>
            <p>User was added!</p>
            <button onClick={() => this.successRef.current?.classList.remove(style.show)}>
              close
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CreateForm;
