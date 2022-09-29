import React, { Component } from 'react';
import { COUNTRIES } from '../../utils/constants';
import style from './CreateUserForm.module.css';

type TProps = {
  setState: (country: string) => void;
};

export class SelectCountry extends Component<TProps, never> {
  private selectRef: React.RefObject<HTMLSelectElement>;

  constructor(props: TProps) {
    super(props);
    this.selectRef = React.createRef();
  }

  changeHandler = () => {
    this.props.setState(this.selectRef.current?.value ?? '');
  };

  render() {
    const countries = COUNTRIES.map((country, idx) => (
      <option key={country + idx} value={country}>
        {country}
      </option>
    ));

    return (
      <p className={style.p}>
        Country:
        <select name="country" ref={this.selectRef} onChange={this.changeHandler}>
          <option></option>
          {countries}
        </select>
      </p>
    );
  }
}

export default SelectCountry;
