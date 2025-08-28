```markdown
# Detailed Implementation Plan for YouTube App (Free Alternative Approach)

This plan outlines the creation of a YouTube web application built on the Next.js framework that uses YouTube’s public RSS feeds and embed URLs. The app will feature a home page with search functionality, a grid of video cards, and a dedicated video detail page for playback. The UI is designed to be modern and clean, using only typography, color, spacing, and layout for styling.

---

## 1. Project Dependencies & Preparations
- **New Dependency:**  
  - Install an XML parser for Node.js (e.g., xml2js) using:  
    `npm install xml2js`
- **Error Handling:**  
  - Use try/catch blocks in API routes.
  - In UI components, include error messages for failed fetches or media load issues.
- **Best Practices:**  
  - Use proper TypeScript typings.
  - Follow responsive design and accessibility guidelines.

---

## 2. API Route: `src/app/api/youtube-feed/route.ts`
- **Purpose:**  
  - Fetch the YouTube RSS feed data using a default (or query-provided) channel ID.
- **Steps:**  
  1. Extract the `channelId` from URL query params, defaulting to a preset channel (e.g., `"UC_x5XG1OV2P6uZZ5FSM9Ttw"`).
  2. Fetch RSS XML data from:  
     `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
  3. Parse the XML using `xml2js` to extract video entries (including `yt:videoId`, title, published date, and description).
  4. Construct a JSON response with a list of videos and add a thumbnail URL using the template:  
     `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`
  5. Implement error handling: return HTTP 500 with an error message if any step fails.

---

## 3. Home Page: `src/app/page.tsx`
- **Purpose:**  
  - Serve as the landing page that displays an app header, a search bar, and a responsive grid of video cards.
- **Steps:**  
  1. Import and integrate the `SearchBar` and `VideoCard` components.
  2. Use React hooks (`useState`, `useEffect`) to fetch video data from `/api/youtube-feed`.
  3. Display a loading indicator while fetching and an error message if the fetch fails.
  4. Render the video grid with proper spacing and responsive grid classes.
  5. Ensure clear typography and modern styling using utility classes (or CSS modules) defined in `globals.css`.

---

## 4. Video Detail Page: `src/app/video/[id]/page.tsx`
- **Purpose:**  
  - Display a single video player along with video information.
- **Steps:**  
  1. Use Next.js dynamic routing to capture the video `id` from the URL.
  2. Embed the video in an `<iframe>` using the URL:  
     `https://www.youtube.com/embed/${id}?autoplay=1`
  3. Optionally, display additional video details (title, description) passed as props or re-fetched.
  4. Include a back navigation link to return to the home page.
  5. Implement error handling for cases where the video ID is missing or invalid.

---

## 5. UI Components
### a. Search Bar: `src/components/SearchBar.tsx`
- **Purpose:**  
  - Provide a modern search input to allow users to filter video listings.
- **Steps:**  
  1. Create an input field with rounded borders, focus styling, and a clear placeholder.
  2. Implement a submit button labeled “Search” with a background color and hover states.
  3. Handle form submission and call a provided callback (prop `onSearch`) to filter or re-fetch videos.
  
### b. Video Card: `src/components/VideoCard.tsx`
- **Purpose:**  
  - Display each video in the grid with a clickable card.
- **Steps:**  
  1. Render the video thumbnail using the URL:  
     `https://img.youtube.com/vi/{video.id}/hqdefault.jpg`
  2. Set detailed `alt` text and an `onerror` handler that falls back to a placeholder image from:  
     `https://placehold.co/400x300?text=Video+Thumbnail+Not+Available`
  3. Display the video title and published date with appropriate typography.
  4. Wrap the component in a Next.js `<Link>` that routes to `/video/[id]`.

### c. (Optional) Layout Component: `src/components/Layout.tsx`
- **Purpose:**  
  - Provide a consistent header (with the app title “YouTube App”) and footer across pages.
- **Steps:**  
  1. Create a component that wraps content with a header, main section, and footer.
  2. Use this layout in the home and video detail pages for consistent styling.

---

## 6. UI/UX Considerations & Error Handling
- **Modern UI Elements:**  
  - Clean typography with bold headings and ample whitespace.
  - Responsive grid layout for video cards to adjust across devices.
  - Focus states on interactive elements (input fields, buttons, links).
- **Error Handling:**  
  - In the API route, capture network or XML parsing errors.
  - In pages/components, display fallback messages if data or images fail to load.
  - Validate dynamic route parameters in the video detail page.

---

## Summary
- Created an API route to fetch and parse YouTube RSS feeds using xml2js with full error handling.  
- Updated the home page to display a modern UI featuring a search bar and responsive video grid.  
- Implemented a dynamic video detail page that embeds videos using YouTube’s embed URLs with robust navigation.  
- Developed reusable UI components (SearchBar and VideoCard) with proper error fallbacks and styling.  
- Ensured the overall design is clean, responsive, and accessible by adhering to modern design practices.  
- Incorporated detailed error handling and user feedback in API and UI elements.  
- Key dependencies include Next.js, React, and xml2js with best practices for API routes and dynamic routing.  
- The plan delivers a modular, scalable codebase ready for real-world integration and further enhancements.
