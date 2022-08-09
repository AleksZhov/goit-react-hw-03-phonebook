import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';

const Filter = ({ value, onChange }) => (
  <div className="filter-container">
    <p>Find contacts by name</p>
    <input name="filter" value={value} onChange={onChange}></input>
  </div>
);
Filter.propTypes = {
  value: PropTypes.string,
  onchange: PropTypes.func,
};

export default Filter;
