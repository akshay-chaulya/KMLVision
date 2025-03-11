# KML Viewer

KML Viewer is a web application designed to visualize KML (Keyhole Markup Language) files on an interactive map. The application leverages modern web technologies to provide a user-friendly interface for uploading, parsing, and displaying KML data, including points, lines, and polygons. The app also includes geolocation functionality to show the user's current location on the map.

## Features

- **Upload and Parse KML Files**: Users can upload KML files, which are then parsed to extract geographical data.
- **Interactive Map**: The application uses `react-leaflet` to render an interactive map with OpenStreetMap tiles.
- **Dynamic Center Calculation**: The map dynamically centers based on the average coordinates of the provided KML data.
- **Geolocation**: Users can click a button to obtain their current location using the `navigator.geolocation` API. A marker is placed on the map at the user's location, and the map re-centers to this location.
- **Responsive Design**: The application is designed to be responsive, ensuring it looks good on different screen sizes.
- **User Interface Enhancements**: The UI includes a gradient background, rounded corners, padding, and shadows to enhance visual appeal. Success and error messages are displayed using `react-hot-toast`.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **react-leaflet**: A React wrapper for Leaflet, an open-source JavaScript library for mobile-friendly interactive maps.
- **react-router-dom**: A collection of navigational components for React applications.
- **react-hot-toast**: A React library for displaying notifications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/kml-viewer.git
   cd kml-viewer
   ```
