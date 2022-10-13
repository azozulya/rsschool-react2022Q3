import React, { Component, createRef, RefObject } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  inpName: string;
  isShowError: boolean;
  setValue: (key: string, value: string) => void;
};

const IMG_EMPTY = 'No image';

export class FileInput extends Component<TProps, never> {
  private avatarRef: RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.avatarRef = createRef<HTMLInputElement>();
  }

  getAvatarImgUrl = () => {
    const avatarImg =
      this.avatarRef &&
      this.avatarRef.current &&
      this.avatarRef.current.files &&
      this.avatarRef.current.files[0];
    return avatarImg && URL.createObjectURL(avatarImg);
  };

  changeHandler = () => {
    const avatarImgUrl = this.getAvatarImgUrl();

    if (!avatarImgUrl) return;

    this.props.setValue(this.props.inpName, avatarImgUrl);
  };

  render() {
    const isShowError = this.props.isShowError && !this.avatarRef.current?.files?.length;
    const avatarImgUrl = this.getAvatarImgUrl();

    return (
      <>
        <div className={style.filePreview}>
          {avatarImgUrl ? (
            <img src={avatarImgUrl} className={style.avatarPreview} data-testid="avatarPreview" />
          ) : (
            IMG_EMPTY
          )}
        </div>

        <label htmlFor="avatar" className={style.file}>
          <input
            type="file"
            aria-label="Choose avatar"
            accept=".jpg, .jpeg, .png"
            className={style.fileInp}
            name={this.props.inpName}
            onChange={this.changeHandler}
            ref={this.avatarRef}
          />

          <button className={style.fileCustom}>Choose file</button>
        </label>

        {isShowError && (
          <span role="alert" className={style.error}>
            Choose file for avatar
          </span>
        )}
      </>
    );
  }
}

export default FileInput;
