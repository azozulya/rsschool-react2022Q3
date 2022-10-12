import React, { Component, RefObject } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  ariaLabel: string;
  label: string;
  inpName: string;
  type: 'text' | 'date';
  isShowError: boolean;
  setValue: (key: string, value: string) => void;
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
      <div className={style.formElement}>
        <label className={style.label}>
          {this.props.label}:
          <input
            aria-label={this.props.ariaLabel}
            autoComplete="off"
            name={this.props.inpName}
            type={this.props.type}
            ref={this.inputRef}
            onChange={this.changeHandler}
            className={style.inp}
          />
        </label>
        {this.isShowError && (
          <span className={`${style.error} ${style.errorAbsolute}`}>This is a required field</span>
        )}
      </div>
    );
  }
}

export default TextInput;
