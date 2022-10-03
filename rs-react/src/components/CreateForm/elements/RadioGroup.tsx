import React, { Component } from 'react';
import style from '../CreateForm.module.css';

type TProps = {
  values: string[];
  name: string;
  label: string;
  isShowError: boolean;
  setValue: (key: string, value: string) => void;
};

export class RadioGroup extends Component<TProps, never> {
  private groupItems: string[];
  private groupName: string;
  private groupLabel: string;
  private currentValue: string | undefined;

  constructor(props: TProps) {
    super(props);
    this.groupItems = this.props.values;
    this.groupName = this.props.name;
    this.groupLabel = this.props.label;
  }

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target?.value || this.groupItems[0];
    console.log('radiobtn: ', this.props.name, currentValue);
    this.props.setValue(this.props.name, currentValue);
    this.currentValue = currentValue;
  };

  render() {
    const isShowError = this.props.isShowError && !this.currentValue;

    return (
      <div className={style.p}>
        <label className={style.label}>
          {this.groupLabel}
          <ul className={style.radioList}>
            {this.groupItems.map((item, idx) => {
              return (
                <li key={'label' + idx}>
                  <label className={style.radioLabel}>
                    <input
                      key={item + 'inp' + idx}
                      type="radio"
                      name={this.groupName}
                      value={item}
                      onChange={this.changeHandler}
                    />
                    {item}
                  </label>
                </li>
              );
            })}
          </ul>
        </label>
        {isShowError && <span className={style.errorMessage}>Choose your gender</span>}
      </div>
    );
  }
}

export default RadioGroup;
