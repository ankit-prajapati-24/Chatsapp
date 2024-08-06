import React, { useState } from 'react';

const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);

  const handleAddContact = () => {
    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    const newContact = { name, email, phone };
    setContacts([...contacts, newContact]);
    setName('');
    setEmail('');
    setPhone('');
    setError(null);
  };

  return (
    <div className="contacts-container">
      <h1>Contacts</h1>
      <div className="contact-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
        />
        <button onClick={handleAddContact} className="add-contact-btn">
          Add Contact
        </button>
        {error && <div className="error">{error}</div>}
      </div>
      <ul className="contacts-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            <div className="contact-name">{contact.name}</div>
            <div className="contact-email">{contact.email}</div>
            <div className="contact-phone">{contact.phone}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsComponent;
