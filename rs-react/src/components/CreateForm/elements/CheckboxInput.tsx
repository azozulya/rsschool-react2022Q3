import React, { Component } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  title: string;
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
      <div className={style.formElement}>
        <label className={style.formCheckbox}>
          <input
            type="checkbox"
            name={this.props.inpName}
            ref={this.checkboxRef}
            onClick={this.clickHandler}
          />
          {this.props.title}
        </label>

        {isShowError && (
          <span role="alert" className={`${style.error} ${style.errorAbsolute}`}>
            This is a required field
          </span>
        )}
      </div>
    );
  }
}

export default CheckboxInput;
