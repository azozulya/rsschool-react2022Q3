import React, { Component } from 'react';
import style from './CreateUserForm.module.css';

export class CreateUserForm extends Component {
  render() {
    return (
      <div>
        <form className={style.form}>
          <fieldset>
            <legend>Create user profile</legend>
            <p>
              <label>
                Name:
                <input type="text" />
              </label>
            </p>
            <p>
              <label>
                Date of birth:
                <input type="date" />
              </label>
            </p>
            <p>
              Country:
              <select>
                <option></option>
                <option>Cyprus</option>
                <option>France</option>
                <option>Spain</option>
                <option>Italy</option>
              </select>
            </p>
            <label>
              <input type="checkbox" />
              Married
            </label>
            <p>
              Gender
              <label>
                <input type="radio" name="gender" />
                Femail
              </label>
              <label>
                <input type="radio" name="gender" />
                Mail
              </label>
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CreateUserForm;
