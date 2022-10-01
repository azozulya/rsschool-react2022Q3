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

  changeHandler = () => {
    const avatarImg =
      this.avatarRef &&
      this.avatarRef.current &&
      this.avatarRef.current.files &&
      this.avatarRef.current.files[0].name;

    if (!avatarImg) return;

    this.props.setValue(this.props.inpName, avatarImg);
  };

  render() {
    const isShowError = this.props.isShowError && !this.avatarRef.current?.files?.length;

    return (
      <p className={style.p}>
        <label htmlFor="avatar">Profile picture:</label>

        <input
          name={this.props.inpName}
          type="file"
          onChange={this.changeHandler}
          accept=".jpg, .jpeg, .png"
          ref={this.avatarRef}
        />
        {isShowError && <span className={style.errorMessage}>Choose file for avatar</span>}
      </p>
    );
  }
}

export default FileInput;
