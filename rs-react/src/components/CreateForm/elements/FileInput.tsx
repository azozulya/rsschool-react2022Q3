import React, { useEffect, useState } from 'react';
import { FieldError, Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IMG_EMPTY } from '../../../utils/constants';
import { TCreateFormValues } from '../CreateForm.types';
import style from '../CreateForm.module.css';

type TFileInputProps = {
  name: Path<TCreateFormValues>;
  register: UseFormRegister<TCreateFormValues>;
  params: Record<string, string>;
  error: FieldError | undefined;
  setValue: UseFormSetValue<TCreateFormValues>;
  isSubmitSuccessful: boolean;
};

export const FileInput = ({
  name,
  register,
  params,
  error,
  setValue,
  isSubmitSuccessful,
}: TFileInputProps) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target as HTMLInputElement;
    const url = URL.createObjectURL(inputFile?.files?.item(0) as File);
    setAvatarUrl(url);
    setValue(name, url);
  };

  useEffect(() => {
    if (!isSubmitSuccessful) return;

    setAvatarUrl('');
    setValue(name, '');
  }, [isSubmitSuccessful, name, setValue]);

  return (
    <div className={style.fileUploadWrapper}>
      <div className={style.filePreview}>
        {avatarUrl ? (
          <img src={avatarUrl} className={style.avatarPreview} data-testid="avatarPreview" />
        ) : (
          IMG_EMPTY
        )}
      </div>

      <label className={style.file}>
        <input
          type="file"
          aria-label="Choose avatar"
          accept=".jpg, .jpeg, .png"
          className={style.fileInp}
          onChange={onChange}
        />
        <input type="hidden" {...register(name, { ...params })} />
        <button className={style.fileCustom}>Choose file</button>
      </label>

      {error && (
        <span role="alert" className={style.error}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FileInput;
