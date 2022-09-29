import React, { Component } from 'react';
import style from './CreateUserForm.module.css';

type TProps = {
  setState: (value: boolean) => void;
};

export class CheckboxInput extends Component<TProps, never> {
  private checkboxRef: React.RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.checkboxRef = React.createRef();
  }

  changeHandler = () => {
    console.log(this.checkboxRef.current);
    this.props.setState(this.checkboxRef.current?.checked || false);
  };

  render() {
    return (
      <p className={style.p}>
        <label>
          <input type="checkbox" ref={this.checkboxRef} onChange={this.changeHandler} />
          Married
        </label>
      </p>
    );
  }
}

export default CheckboxInput;
