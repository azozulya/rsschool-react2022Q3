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
  isSubmitSuccessful: boolean;
  setValue: UseFormSetValue<TCreateFormValues>;
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
  const fileRegister = register(name, { ...params });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileRegister.onChange(event);
    const inputFile = event.target as HTMLInputElement;
    if (!inputFile) return;
    const url = URL.createObjectURL(inputFile?.files?.item(0) as File);
    setAvatarUrl(url);
  };

  useEffect(() => {
    if (!isSubmitSuccessful) return;

    setAvatarUrl('');
    setValue(name, undefined);
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
          {...fileRegister}
          onChange={onChange}
        />
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
