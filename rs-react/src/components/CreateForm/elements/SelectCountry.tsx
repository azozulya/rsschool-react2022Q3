import React, { Component } from 'react';
import { COUNTRIES } from '../../../utils/constants';
import style from '../CreateForm.module.css';

type TProps = {
  title: string;
  selectName: string;
  setValue: (key: string, value: string) => void;
  isShowError: boolean;
};

export class SelectCountry extends Component<TProps, never> {
  private selectRef: React.RefObject<HTMLSelectElement>;

  constructor(props: TProps) {
    super(props);
    this.selectRef = React.createRef();
  }

  changeHandler = () => {
    this.props.setValue(this.props.selectName, this.selectRef.current?.value ?? '');
  };

  render() {
    const isShowError = this.props.isShowError && !this.selectRef.current?.value;

    const countries = COUNTRIES.map((country, idx) => (
      <option key={country + idx} value={country}>
        {country}
      </option>
    ));

    return (
      <p className={style.p}>
        <label className={style.label}>
          {this.props.title}:
          <select
            name="country"
            ref={this.selectRef}
            onChange={this.changeHandler}
            className={style.select}
          >
            <option></option>
            {countries}
          </select>
        </label>
        {isShowError && <span className={style.errorMessage}>Choose country of birth</span>}
      </p>
    );
  }
}

export default SelectCountry;
