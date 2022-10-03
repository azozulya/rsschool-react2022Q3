import React, { Component } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  inpName: string;
  isShowError: boolean;
  setValue: (key: string, value: boolean) => void;
};

export class CheckboxInput extends Component<TProps, never> {
  private checkboxRef: React.RefObject<HTMLInputElement>;

  constructor(props: TProps) {
    super(props);
    this.checkboxRef = React.createRef();
  }

  clickHandler = () => {
    this.props.setValue(this.props.inpName, this.checkboxRef.current?.checked || false);
  };

  render() {
    const isShowError = this.props.isShowError && !this.checkboxRef.current?.checked;

    return (
      <p className={style.p}>
        <label>
          <input
            type="checkbox"
            name={this.props.inpName}
            ref={this.checkboxRef}
            onClick={this.clickHandler}
          />
          Married
        </label>
        {isShowError && <span className={style.errorMessage}>This is a required field</span>}
      </p>
    );
  }
}

export default CheckboxInput;
