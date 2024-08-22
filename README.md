
# UserList Component

## Overview

The `UserList` component is a React-based interface designed to display and manage a list of users. It connects to a GraphQL API to fetch user data and includes features for search, sorting, and pagination. The component also features a modal for displaying detailed user information.

## Thought Process

1. Component Purpose: 
   - The component’s goal is to provide an interactive interface for user data, allowing search, sorting, and pagination.
   - Users can also view detailed information through a modal.

2. State Management:
   - Search: Added debouncing to the search input to optimize performance and minimize API requests.
   - Sort: Implemented sorting options by name and company, with toggling between ascending and descending order.
   - Pagination: Included controls for navigating between pages of user data.
   - Modal: Managed modal visibility and user selection for displaying detailed information.

3. Debouncing: 
   - Implemented debouncing to handle the search input efficiently, reducing the frequency of API calls.

4. Error Handling: 
   - Added loading and error states to give user feedback during data fetching.

5. Styling: 
   - Used Tailwind CSS for styling to ensure a clean, responsive design.

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A GraphQL API endpoint for user data

### Installation

1. Clone the Repository:

   git clone https://github.com/your-username/userlist-component.git
   cd userlist-component
  

2. Install Dependencies:

  
   npm install
   # or
   yarn install
  
3. Setup Environment Variables:

   Create a `.appoloClient.js` file in the root directory and add your GraphQL API endpoint:

   REACT_APP_GRAPHQL_ENDPOINT=https://your-graphql-endpoint.com/graphql
   

4. Start the Development Server:

   
   npm start
   # or
   yarn start
  

   The application will be available at `http://localhost:3000`.

### Usage

- Search: Type in the search bar to filter users by name or email. The search includes debouncing for improved performance.
- Sort: Select sorting criteria from the dropdown and toggle the sort order with the button.
- Pagination: Navigate through pages of user data using the Previous and Next buttons.
- View Details: Click on a user’s name to open a modal with detailed user information.

## Assumptions and Decisions

1. API Structure:
   - Assumed the GraphQL API supports search, sort, and pagination through the `users` query.
2. Debouncing:
   - Chose a 500ms debounce delay to balance responsiveness and performance.
3. Pagination Handling:
   - Implemented basic pagination controls. More advanced pagination features can be added if needed.
4. Error Handling:
   - Basic error and loading states implemented. Expand error handling based on specific API responses if necessary.
5. Styling:
   - Used Tailwind CSS for styling. Ensure Tailwind CSS is configured properly in your project.

## Future Enhancements

- Advanced Search: Implement additional search filters and options.
- Better Pagination: Add page numbers and more advanced pagination logic.
- Accessibility Improvements: Enhance accessibility features for a better user experience.
- Testing: Add unit and integration tests to ensure component robustness.


