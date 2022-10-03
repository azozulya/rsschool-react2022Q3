import React, { Component, createRef, RefObject } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  inpName: string;
  isShowError: boolean;
  setValue: (key: string, value: string) => void;
};

export class FileInput extends Component<TProps, never> {
  private avatarRef: RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.avatarRef = createRef<HTMLInputElement>();
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const avatarImg =
      this.avatarRef &&
      this.avatarRef.current &&
      this.avatarRef.current.files &&
      this.avatarRef.current.files[0];
    const avatarImgUrl = avatarImg && URL.createObjectURL(avatarImg);

    if (!avatarImg || !avatarImgUrl) return;

    this.props.setValue(this.props.inpName, avatarImgUrl);

    const fileCustomElement = (event.target as HTMLInputElement)?.nextElementSibling;

    fileCustomElement && (fileCustomElement.innerHTML = `<img src=${avatarImgUrl} />`);
  };

  render() {
    const isShowError = this.props.isShowError && !this.avatarRef.current?.files?.length;

    return (
      <p className={style.p}>
        <label htmlFor="avatar" className={style.file}>
          <input
            type="file"
            aria-label="Choose file"
            accept=".jpg, .jpeg, .png"
            className={style.fileInp}
            name={this.props.inpName}
            onChange={this.changeHandler}
            ref={this.avatarRef}
          />
          <span className={style.fileCustom}>Choose file...</span>
        </label>
        {isShowError && <span className={style.errorMessage}>Choose file for avatar</span>}
      </p>
    );
  }
}

export default FileInput;
