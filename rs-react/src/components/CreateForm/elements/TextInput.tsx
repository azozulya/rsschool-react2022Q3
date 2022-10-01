import React, { Component, RefObject } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  setValue: (key: string, value: string) => void;
  label: string;
  inpName: string;
  type: 'text' | 'date';
  isShowError: boolean;
};

export class TextInput extends Component<TProps, never> {
  private inputRef: RefObject<HTMLInputElement>;
  private isShowError = false;

  constructor(props: TProps) {
    super(props);
    this.inputRef = React.createRef();
  }

  changeHandler = () => {
    this.props.setValue(this.props.inpName, this.inputRef?.current?.value || '');
  };

  render() {
    this.isShowError = this.props.isShowError && !this.inputRef.current?.value;

    return (
      <p className={style.p}>
        <label className={style.label}>
          {this.props.label}:
          <input
            name={this.props.inpName}
            type={this.props.type}
            ref={this.inputRef}
            onChange={this.changeHandler}
            className={this.isShowError ? style.error : ''}
          />
        </label>
        {this.isShowError && <span className={style.errorMessage}>This is a required field</span>}
      </p>
    );
  }
}

export default TextInput;
