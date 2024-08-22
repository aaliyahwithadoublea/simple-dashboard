import React from 'react';

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal">
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
    <h2 className="text-white text-xl font-bold">User Details</h2>
  </div>
  <div className="p-6 space-y-4">
    <p className="text-gray-700 text-lg">
      <span className="font-semibold text-gray-900">Name:</span> {user.name}
    </p>
    <p className="text-gray-700 text-lg">
      <span className="font-semibold text-gray-900">Email:</span> {user.email}
    </p>
    <p className="text-gray-700 text-lg">
      <span className="font-semibold text-gray-900">Phone:</span> {user.phone}
    </p>
    <p className="text-gray-700 text-lg">
      <span className="font-semibold text-gray-900">Company:</span> {user.company.name}
    </p>
    <button 
      onClick={onClose} 
      className="mt-4 w-full text-center bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
      style={{cursor:"pointer"}}
    >
      Close
    </button>
  </div>
</div>


    </div>
  );
};

export default UserDetailModal;
