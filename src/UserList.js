import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserDetailModal from './UserDetailModal'; // Import the modal component

// Define the GraphQL query to get names and details with options
const GET_USERS = gql`
  query GetUsers($options: PageQueryOptions) {
    users(options: $options) {
      data {
        id
        name
        email
        phone
        company {
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

function UserList() {
  // State for handling search, sort, pagination, and selected user
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      options: {
        search: { q: search },
        sort: [{ field: sortField, order: sortOrder }],
        paginate: { page, limit },
      },
    },
  });

  // to handle the loading state
  if (loading) return <p>Loading...</p>;

  // to handle the error state
  if (error) return <p>Error: {error.message}</p>;

  // Function to open the modal with the selected user
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
    {/* Search Bar */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <svg className="absolute left-4 top-4 w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm6.707 11.293a1 1 0 0 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 15.586l4.293-4.293z"/>
      </svg>
    </div>
  
    {/* Sort Options */}
    <div className="flex items-center justify-between">
      <select 
        value={sortField} 
        onChange={(e) => setSortField(e.target.value)} 
        className="p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="name">Sort by Name</option>
        <option value="company.name">Sort by Company</option>
      </select>
      <button 
        onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
        className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Toggle Sort Order
      </button>
    </div>
  
    {/* Display User List */}
    <ul className="divide-y divide-gray-200">
      {data.users.data.map((user) => (
        <li 
          key={user.id} 
          onClick={() => handleUserClick(user)}
          className="p-4 hover:bg-indigo-50 cursor-pointer transition"
        >
          <p className="text-lg font-medium text-gray-900">Name: {user.name}</p>
        </li>
      ))}
    </ul>
  
    {/* Pagination */}
    <div className="flex justify-between items-center pt-4">
      <button 
        disabled={page === 1} 
        onClick={() => setPage(page - 1)}
        className={`p-3 rounded-lg ${page === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'} transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        Previous
      </button>
      <button
        disabled={data.users.meta.totalCount <= page * limit}
        onClick={() => setPage(page + 1)}
        className={`p-3 rounded-lg ${data.users.meta.totalCount <= page * limit ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'} transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        Next
      </button>
    </div>
  
    {/* User Detail Modal */}
    {isModalOpen && (
      <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
    )}
  </div>
  
  );
}

export default UserList;
