import React, { Component } from 'react';

export class SearchForm extends Component {
  render() {
    return (
      <div>
        Create user profile
        <form>
          <input type="text" value="" placeholder="Name" />
          <input type="date" value="" placeholder="Birthday" />
          Country
          <select>
            <option>Choose country of birth</option>
            <option>Cyprus</option>
            <option>France</option>
            <option>Spain</option>
            <option>Italy</option>
          </select>
          <label>
            <input type="checkbox" />
            Married
          </label>
          Gender
          <label>
            <input type="radio" name="gender" />
            Femail
          </label>
          <label>
            <input type="radio" name="gender" />
            Mail
          </label>
        </form>
      </div>
    );
  }
}

export default SearchForm;
