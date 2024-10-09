# Hide and Seek

Hide and Seek is an interactive web platform designed to showcase the parks of Berlin, providing users with comprehensive information about amenities, nearby shops, and upcoming events. Users can easily browse through a curated list of parks, filter options based on specific features, and search for parks by name. Each park is presented in a detailed view, offering insights into available activities and local attractions. Additionally, users can add personal notes to keep track of their experiences, making "Hide and Seek" a valuable resource for exploring and enjoying urban green spaces.

## User Stories

### User Story 1: View All Parks

As a user
I want to see all parks in Berlin
so that I can get an overview of available parks

#### Description

This feature allows users to see a list of all parks, providing a quick overview of the options with a map and name of the park, but no further information to provide a clean and minimalistic appearance.

#### Tasks

- Create a database schema for parks.
- Implement an API endpoint to fetch all parks.
- Develop a frontend component to display the list of parks.
- Style the list for clarity and usability.

---

### User Story 2: Detailed Park View

As a user
I want to view detailed information about a specific park
so that I can learn more about its amenities and upcoming events but also about the park in general.

#### Description

When a user clicks on a park, they will see a detailed view with all relevant information, such as amenities, nearby shops, and upcoming events.

#### Tasks

- Create a detailed view component for parks.
- Develop an API endpoint to fetch details for a specific park.
- Write down the history / general information about the park
- include accessibility information (e.g. wheelchair access)
- Display park amenities and event information in the detailed view.

---

### User Story 3: Filter Parks

As a user
I want to filter parks based on amenities available
so that I can find parks that meet my needs.

#### Description

Users can filter parks to show only those with specific amenities (e.g., table tennis, kiosks) or that are barrier-free.

#### Tasks

- Create a filtering interface (checkboxes/dropdowns).
- Update the API to support filtering based on amenities.
- Implement client-side filtering in the parks list.

---

### User Story 4: Search for Specific Parks

As a user
I want to search for specific parks by name
so that I can quickly find the park I am looking for.

#### Description

This functionality provides an input field where users can type the name of a park to filter the list.

#### Tasks

- Create a search input field.
- Implement search functionality that filters parks in real time.
- Update the API to handle search queries if necessary.

---

### User Story 5: Add Comments

As a user
I want to add comments about parks
so that I can share my thoughts and experiences.

#### Description

Users can add personal comments to each park.

#### Tasks

- Implement a comments input field in the detailed park view.
- Create an API endpoint to save comments.
