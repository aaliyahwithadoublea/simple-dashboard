
# UserList Component

## Overview# Simple User Dashboard

This project is a simple user dashboard built with React, styled using Tailwind CSS. The dashboard allows users to view a list of users, search and sort the list, and view detailed information about each user in a modal.

## Table of Contents
- [Thought Process](#thought-process)
- [Setup Instructions](#setup-instructions)
- [Assumptions and Decisions](#assumptions-and-decisions)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)

## Thought Process

The goal was to create a user-friendly dashboard where users can easily interact with a list of users fetched from an API. The key features include searching, sorting, and viewing detailed user information. The UI was designed to be clean and intuitive, with a focus on usability and aesthetic appeal. Tailwind CSS was chosen for styling due to its flexibility and ability to quickly create responsive designs.

The development process was as follows:
1. **Set Up the Project:** Initialize the React project and install necessary dependencies like Tailwind CSS.
2. **Create Components:** Develop the main components like `UserList`, `UserDetailModal`, and search/sort functionality.
3. **Implement Features:** Add features like searching, sorting, and displaying detailed user information.
4. **Styling:** Use Tailwind CSS to style the components, focusing on a modern and visually appealing UI.
5. **Testing:** Ensure that the application is responsive and works as expected across different devices and screen sizes.

## Setup Instructions

To set up and run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/simple-user-dashboard.git
   cd simple-user-dashboard


The `UserList` component is a React-based interface designed to display and manage a list of users. It connects to a GraphQL API to fetch user data and includes features for search, sorting, and pagination. The component also features a modal for displaying detailed user information.

Install dependencies:

npm install
Set up Tailwind CSS:
If you haven't already, make sure Tailwind CSS is properly configured:

npx tailwindcss init
Ensure your tailwind.config.js is correctly set up and that Tailwind is included in your CSS files.

Start the development server:

npm start
The app should now be running on http://localhost:3000.

Assumptions and Decisions
Data Structure: It was assumed that the API provides user data in a format that includes fields like name, email, phone, company, etc.
Responsive Design: The UI was designed with responsiveness in mind, using Tailwind CSS to ensure it looks good on both desktop and mobile devices.
Sorting and Searching: The sorting is based on either the user's name or company name. Searching can be done by name or email.
Modal for Details: A modal was chosen to display detailed user information to keep the UI clean and focused.

Features
User List: Displays a list of users fetched from an API.
Search Functionality: Allows users to search by name or email.
Sorting Options: Users can sort the list by name or company name.
User Details Modal: Clicking on a user opens a modal with more detailed information.
Responsive Design: The application is responsive and works well on different screen sizes.

Technologies Used
React: JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework for styling.
Axios: For making API requests.

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


