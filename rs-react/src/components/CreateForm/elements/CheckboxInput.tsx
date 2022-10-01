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
    console.log('checkbox change: ', this.checkboxRef.current?.checked);
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
          Married {this.checkboxRef.current?.checked ? 'yes' : 'no'}
        </label>
        {isShowError && <span className={style.errorMessage}>You has to married</span>}
      </p>
    );
  }
}

export default CheckboxInput;
