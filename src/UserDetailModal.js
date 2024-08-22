import React from 'react';

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal">
      <button onClick={onClose} style={{cursor:"pointer"}}>Close</button>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
};

export default UserDetailModal;
