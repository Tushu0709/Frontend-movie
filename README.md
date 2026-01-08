## Installation

1.  **Clone the repository:**
    ```
    git clone <repository-url>
    cd <project-folder>
    ```

2.  **Install dependencies:**
    ```
    npm install
    npm run dev
    ```

## Configuration

1.  **Environment Variables:**
    Create a `.env` file in the root directory and add the following variable:
    ```env
    VITE_API_URL=https://movie-backend-production-3d6a.up.railway.app
    ```
  


## Deployment

### Netlify
This project is configured for deployment on Netlify.
*   **Routing:** A `public/_redirects` file is included to handle client-side routing.
*   **Build Command:** `npm run build`
*   **Publish Directory:** `dist`
