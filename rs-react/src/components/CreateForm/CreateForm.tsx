import React, { useEffect, useState } from 'react';
import FileInput from './elements/FileInput';
import TextInput from './elements/TextInput';
import SelectCountry from './elements/SelectCountry';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EGender, TCreateFormValues, TCreateFormProps, TUserCard } from './CreateForm.types';
import style from './CreateForm.module.css';

const initialValues: TCreateFormValues = {
  username: '',
  birthday: '',
  gender: undefined,
  avatar: '',
  agree: false,
  country: '',
};

export function CreateForm(props: TCreateFormProps) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, dirtyFields, submitCount, isSubmitSuccessful, errors },
  } = useForm<TCreateFormValues>({
    defaultValues: { ...initialValues },
    mode: 'onSubmit',
  });
  const genderArray = Object.values(EGender);

  const onSubmitHandler: SubmitHandler<TCreateFormValues> = (user: TUserCard) => {
    props.onSubmit(user);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 1500);
  };

  useEffect(() => {
    reset({ ...initialValues });
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form
        aria-label="Create user form"
        className={style.form}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <fieldset className={style.formWrapper}>
          <legend className={style.formTitle}>Create user profile</legend>
          <div className={style.formContent}>
            <FileInput
              name="avatar"
              setValue={setValue}
              isSubmitSuccessful={isSubmitSuccessful}
              register={register}
              params={{ required: 'Choose file for avatar' }}
              error={errors.avatar}
            />

            <div>
              <TextInput
                type="text"
                name="username"
                label="User name"
                register={register}
                params={{ required: 'This is a required field' }}
                error={errors.username}
              />

              <div className={style.twoColumn}>
                <TextInput
                  type="date"
                  name="birthday"
                  label="Date of birth:"
                  register={register}
                  params={{ required: 'This is a required field' }}
                  error={errors.birthday}
                />

                <SelectCountry
                  name="country"
                  label="Country"
                  register={register}
                  params={{ required: 'Choose country' }}
                  error={errors.country}
                />
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
                type="checkbox"
                {...register('agree', { required: 'This is a required field' })}
              />
              I consent to my personal data
            </label>
            {errors.agree && (
              <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
                {errors.agree.message}
              </span>
            )}
          </div>

          <input
            type="submit"
            className={style.submit}
            disabled={
              !isDirty ||
              (Object.keys(dirtyFields).length < Object.keys(initialValues).length &&
                submitCount > 0)
            }
          />
        </fieldset>
      </form>
      {isSubmitSuccessful ? 'true' : 'false'}
      {showSuccessMessage && (
        <div className={style.success} data-testid="successMessage">
          <div>
            <p>User was added!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateForm;
