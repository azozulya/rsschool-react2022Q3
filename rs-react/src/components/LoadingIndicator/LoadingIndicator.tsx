import React, { Component } from 'react';
import style from './LoadingIndicator.module.css';

export class LoadingIndicator extends Component {
  render() {
    return (
      <div className={style.spinner}>
        <div className={style.ldio}>
          <div></div>
        </div>
      </div>
    );
  }
}

export default LoadingIndicator;
