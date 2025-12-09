# React Native Reviews App

## Features

- **Drag and Drop:** Easily move the review panel within the interface.
- **Full-Screen Modal:** Expand the modal to take up the entire screen.
- **Star Breakdown:** Visual representation of ratings from 5⭐ → 1⭐.
- **Sticky Top Section:** Top section (overall rating, star breakdown, driver info) stays fixed when the modal is full-screen.
- **Review Sorting:** Sort review details by date for easy reference.
- **Animated Progress Bar:** Smooth animations for progress indicators.
- **Countdown Timer:** Built-in countdown functionality.
- **Reset Home Screen:** Clear and reset home screen data with a single action.
- **Filter Reviews by Rating (5→1):** Filter reviews based on star rating.

---

## Technical Overview

This project is a **React Native** application developed using **TypeScript** and bootstrapped with `@react-native-community/cli`. It is compatible with both **Android** and **iOS**.

### Key Technical Decisions

- **Draggable Review Panel:** Implemented using `@gorhom/bottom-sheet` for smooth, gesture-driven animations.
- **Full-Screen Expansion:** The bottom sheet supports snap points for collapsed, half, and full-screen modes.
- **Sticky Header on Scroll:** Achieved by separating the header from the scrollable review list, ensuring the top section remains fixed while reviews scroll underneath.
- **State Management:** Local component state with `useState` and `useRef` for tracking expanded/collapsed modes. For global state I used `redux-toolkit`.
- **Animations:** Leveraged `react-native-reanimated` for smooth gesture transitions and progress bar animations.

---

## Getting Started

### Step 1: Install Dependencies

Clone the repository:

```bash
git clone git@github.com:NishanChakma/truck-lagbe.git
```

Install dependencies:

```bash
# Using npm
npm install

# OR using Yarn
yarn install
```

### Step 2: Run Metro

Start the React Native Metro bundler:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

### Step 3: Build and Run the App

**Android:**

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

**iOS:**  
Make sure CocoaPods dependencies are installed:

```bash
# Install CocoaPods (first time only)
bundle install

# Install pod dependencies
bundle exec pod install

# Run app
npm run ios
# OR
yarn ios
```

If everything is set up correctly, your app should appear on the Android Emulator, iOS Simulator, or your connected device.

---

## Implementation Details

### Draggable Behavior

- The review panel can be dragged from bottom to top using gestures.
- Snap points define **collapsed**, **half-expanded**, and **full-screen** positions.
- Smooth animations handled via `react-native-reanimated` and `@gorhom/bottom-sheet`.

### Full-Screen Expansion

- Users can drag the panel or tap an expand button.
- Full-screen mode displays all top info (overall rating, star breakdown, driver info).
- Collapse and half-screen states are supported for flexibility.

### Sticky Header on Scroll

- The top section becomes **sticky** when the panel is full-screen.
- Only the reviews list below scrolls, providing a natural UX.

### Reviews Section

- Displays a **list of reviews** with stars, text, and date/tags.
- Includes **empty state** and **loading state** placeholders for better UX.
- Users can filter reviews by star rating (5⭐ → 1⭐).

---

## Screenshots / Screen Recording

_(Add screenshots or screen recordings here to demonstrate your implementation)_

---

## Troubleshooting

- Ensure your React Native environment is up to date.
- **Android:** Use Gradle JDK version `zulu-17`.
- **iOS:** Make sure CocoaPods are installed and up to date.

---

## Learn More

- [React Native Documentation](https://reactnative.dev/)
- [React Native Basics](https://reactnative.dev/docs/getting-started)
- [React Native Blog](https://reactnative.dev/blog)
- [GitHub Repository](https://github.com/facebook/react-native)
