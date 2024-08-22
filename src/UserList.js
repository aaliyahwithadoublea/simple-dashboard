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
    <div className="flex-it">
     
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Sort Options */}
      <select value={sortField} onChange={(e) => setSortField(e.target.value)} className="sort-bar">
        <option value="name">Sort by Name</option>
        <option value="company.name">Sort by Company</option>
      </select>
      <button onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}>
        Toggle Sort Order
      </button>

      {/* Display User List */}
      <ul>
        {data.users.data.map((user) => (
          <li key={user.id} onClick={() => handleUserClick(user)}>
            <p>Name: {user.name}</p>
            {/* <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Company: {user.company?.name}</p> */}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <button
        disabled={data.users.meta.totalCount <= page * limit}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>

      {/* User Detail Modal */}
      {isModalOpen && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default UserList;
