import React from 'react';
import PropTypes from 'prop-types';
import './ContactList.css';
function ContactList({ contactsArray, onDelete }) {
  return (
    <ul className="contacts">
      {contactsArray.map(({ name, number, id }) => {
        return (
          <li key={number} className="contacts__item">
            <p>
              • {name} : {number}
            </p>
            <button
              type="button"
              className="contacts__del-btn"
              onClick={() => onDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  contactsArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
export default ContactList;
