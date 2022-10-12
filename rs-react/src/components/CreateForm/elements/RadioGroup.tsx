import React, { Component, RefObject } from 'react';
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
  private groupRefs: RefObject<HTMLInputElement>[];

  constructor(props: TProps) {
    super(props);
    this.groupItems = this.props.values;
    this.groupName = this.props.name;
    this.groupLabel = this.props.label;
    this.groupRefs = this.createRefs();
  }

  createRefs = () => {
    return this.groupItems.map(() => React.createRef<HTMLInputElement>());
  };

  getCurrentElement = () => {
    return this.groupRefs.find((ref) => ref.current?.checked)?.current || null;
  };

  changeHandler = () => {
    const currentElement = this.getCurrentElement();
    this.props.setValue(this.props.name, currentElement?.value || '');
  };

  render() {
    const isShowError = this.props.isShowError && !this.getCurrentElement();

    return (
      <div className={style.formElement}>
        <span className={style.label}>{this.groupLabel}</span>

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
                    ref={this.groupRefs[idx]}
                  />
                  {item}
                </label>
              </li>
            );
          })}
        </ul>

        {isShowError && (
          <span className={`${style.error} ${style.errorAbsolute}`}>Choose your gender</span>
        )}
      </div>
    );
  }
}

export default RadioGroup;
