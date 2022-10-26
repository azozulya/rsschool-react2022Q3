import React, { useEffect } from 'react';
import { EGender, TCreateFormValues, TCreateFormProps, TUserCard } from './CreateForm.types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { COUNTRIES } from '../../utils/constants';
import style from './CreateForm.module.css';
import FileInput from './elements/FileInput';

const initialValues: TCreateFormValues = {
  username: '',
  birthday: '',
  gender: undefined,
  avatar: '',
  agree: false,
  country: '',
};

export function CreateForm(props: TCreateFormProps) {
  const {
    watch,
    register,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<TCreateFormValues>({
    defaultValues: initialValues,
  });
  const genderArray = Object.values(EGender);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log(value, name, type));
    const subscriptionFile = watch('avatar');
    console.log(subscriptionFile);
    return () => subscription.unsubscribe();
  }, [watch]);

  // const onSubmit: SubmitHandler<TCreateForm> = (user: TUserCard) => {
  //   console.log('submit', user);
  // };

  // const checkFormFilled = () => {
  //   const { username, birthday, country, agree, gender, avatar } = this.state.user;

  //   return (
  //     agree &&
  //     Boolean(username) &&
  //     Boolean(birthday) &&
  //     Boolean(country) &&
  //     Boolean(gender) &&
  //     Boolean(avatar)
  //   );
  // };

  const onSubmit: SubmitHandler<TCreateFormValues> = (user: TUserCard) => {
    //event.preventDefault();
    console.log(user);
    //const isFormFilled = checkForm();

    //if (!isFormFilled) {
    //this.setState({ canSubmit: false, showError: true });
    return;
    //}

    //this.setState({ canSubmit: false, showSuccessMessage: true });

    setTimeout(() => {
      //handleSubmit(props.onSubmit());
      // this.formRef.current?.reset();
      // this.setState({ ...this.defaultState });
    }, 1000);
  };

  // const saveParam = (key: string, value: string | boolean) => {
  //   setState(
  //     (prevState) => ({ ...prevState, user: { ...prevState.user, [key]: value } }),
  //     this.checkForm
  //   );
  // };

  // const checkForm = () => {
  //   const { username, birthday, country, agree, gender, avatar } = this.state.user;

  //   const isFormFilled = this.checkFormFilled();

  //   if (isFormFilled) {
  //     this.setState({
  //       canSubmit: true,
  //       showError: false,
  //     });
  //     return;
  //   }

  //   this.setState({
  //     canSubmit:
  //       (Boolean(username) ||
  //         Boolean(birthday) ||
  //         Boolean(country) ||
  //         Boolean(avatar) ||
  //         Boolean(gender) ||
  //         agree) &&
  //       !this.state.showError,
  //   });
  // };

  return (
    <>
      <form aria-label="Create user form" className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <fieldset className={style.formWrapper}>
          <legend className={style.formTitle}>Create user profile</legend>

          <div className={style.formContent}>
            <FileInput
              label="avatar"
              register={register}
              params={{ required: 'Choose file for avatar' }}
              error={errors.avatar}
              currentValue={watch('avatar')}
            />

            <div>
              <div className={style.formElement}>
                <label className={style.label}>
                  Name:
                  <input
                    {...register('username', { required: 'This is a required field' })}
                    type="text"
                    autoComplete="off"
                    className={style.inp}
                  />
                </label>
                {errors.username && (
                  <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className={style.twoColumn}>
                <input {...register('birthday')} type="date" />

                <select {...register('country')}>
                  {COUNTRIES.map((country) => (
                    <option key={self.crypto.randomUUID()} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className={style.formElement}>
                <span className={style.label}>Gender</span>

                <ul className={style.radioList}>
                  {genderArray.map((item) => {
                    return (
                      <li key={self.crypto.randomUUID()}>
                        <label className={style.radioLabel}>
                          <input
                            {...register('gender', { required: 'Choose your gender' })}
                            type="radio"
                            value={item}
                          />
                          {item}
                        </label>
                      </li>
                    );
                  })}
                </ul>

                {errors.gender && (
                  <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
                    {errors.gender.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className={style.formElement}>
            <label className={style.formCheckbox}>
              <input
                {...register('agree', { required: 'This is a required field' })}
                type="checkbox"
              />
              I consent to my personal data
            </label>
            {errors.agree && (
              <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
                {errors.agree.message}
              </span>
            )}
          </div>
          {isDirty ? 1 : 0}
          <input type="submit" className={style.submit} value="Submit" disabled={!isDirty} />
        </fieldset>
      </form>
      {/* {this.state.showSuccessMessage && (
        <div className={style.success} ref={this.successRef} data-testid="successMessage">
          <div>
            <p>User was added!</p>
          </div>
        </div>
      )} */}
    </>
  );
}

export default CreateForm;
