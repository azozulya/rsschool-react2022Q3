import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

export class Main extends Component {
  render() {
    return (
      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    );
  }
}

export default Main;
