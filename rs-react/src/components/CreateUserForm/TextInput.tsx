import React, { Component, RefObject } from 'react';
import style from './CreateUserForm.module.css';

type TProps = {
  setState: (value: string) => void;
  label: string;
  type: 'text' | 'date';
};

export class TextInput extends Component<TProps, never> {
  private inputRef: RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.inputRef = React.createRef();
  }

  changeHandler = () => {
    this.props.setState(this.inputRef?.current?.value || '');
  };

  render() {
    return (
      <p className={style.p}>
        <label className={style.label}>
          {this.props.label}:
          <input type={this.props.type} ref={this.inputRef} onChange={this.changeHandler} />
        </label>
      </p>
    );
  }
}

export default TextInput;
