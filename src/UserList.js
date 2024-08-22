import React, { useState, useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';
import UserDetailModal from './UserDetailModal';
import _ from 'lodash'; 


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
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  const debouncedSearch = useCallback(
    _.debounce((query) => {
      setSearch(query);
    }, 500),
    [] 
  );

  // Handle search input
  const handleInputChange = (e) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

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

  // Function to open the modal
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };


  const filteredUsers = data?.users?.data.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase()) || 
    user.email.toLowerCase().includes(search.toLowerCase())
  );
  
  return (
    <div className="flex flex-col space-y-8 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email"
          onChange={handleInputChange} // Use the debounced input handler
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <svg className="absolute left-4 top-4 w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4a7 7 0 0 0-7 7c0 3.867 3.133 7 7 7 1.51 0 2.916-.48 4.07-1.29l5.207 5.207a1 1 0 0 0 1.414-1.414l-5.207-5.207A6.964 6.964 0 0 0 18 11a7 7 0 0 0-7-7zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
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
          className="p-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ml-4"
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
