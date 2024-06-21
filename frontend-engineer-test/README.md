# Star Wars Characters

## Overview

This project is a frontend application built using React, designed to display characters from the Star Wars universe. The application fetches data from the Star Wars API (SWAPI) and provides features such as real-time filtering of characters based on their homeworld, responsive design for various screen sizes, and the use of environment variables for API configuration.

## Features

- **Real-time Filtering**: Filter characters by their homeworld in real-time.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Data from SWAPI**: Fetches accurate and up-to-date information from the Star Wars API.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/VZeferino/cloudwalk.git
    cd cloudwalk/frontend-engineer-test
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Create a `.env` file in the root directory** and add the following environment variables:

    ```env
    NEXT_PUBLIC_API_BASE_URL=https://swapi.dev/api
    NEXT_PUBLIC_API_PLANETS=/planets
    NEXT_PUBLIC_API_PEOPLE=/people
    ```

### Running the Application

1. **Start the development server**:

    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to**:

    ```
    http://localhost:3000
    ```

## Components

- **Header**: Displays the main title and description of the application.
- **Filter**: Provides a dropdown to filter characters by their homeworld.
- **CharacterItem**: Displays individual character information, including name, homeworld, height, mass, and gender.

## API Integration

The application fetches data from the Star Wars API (SWAPI). The base URL and endpoints for fetching planets and people are defined in the `.env` file.

## Improvements

- **Pagination**: Implement infinite scroll or pagination for better user experience when browsing many characters.
- **Caching**: Implement caching strategies to reduce the number of API calls and improve performance.
- **Error Handling**: Improve error handling to provide better user feedback in case of API failures.
- **Testing**: Add unit and integration tests to ensure the application works as expected.
- **Loading State**: Enhance the loading state with animations or skeleton screens to improve user experience during data fetching.
- **Dark Mode**: Implement a dark mode for better user experience, especially in low-light environments.


## License

This project is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"></a>
