import React, { useCallback, useEffect, useState } from 'react';
import {
  Control,
  FieldError,
  Path,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from 'react-hook-form';
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
  control?: Control<TCreateFormValues>;
};

export const FileInput = ({
  name,
  register,
  params,
  error,
  setValue,
  control,
  isSubmitSuccessful,
}: TFileInputProps) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!isSubmitSuccessful) return;

    setAvatarUrl('');
    setValue(name, '');
  }, [isSubmitSuccessful, name, setValue]);

  const preview = useWatch({ control, name, defaultValue: '' }) as unknown as FileList;

  useEffect(() => {
    if (!preview.length) return;
    const url = URL.createObjectURL(preview[0] as File);
    setAvatarUrl(url);
  }, [preview]);

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
          {...register(name, { ...params })}
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
