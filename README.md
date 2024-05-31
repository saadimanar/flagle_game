# Flagle

Flagle is a fun game where you guess the country based on its flag. This project is built using React.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Approach](#approach)

## Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/saadimanar/flagle_game.git
    cd flagle
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Run the app:**

    ```sh
    npm run dev 
    ```

    The app will run in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- When you open the app, a random flag will be displayed.
- Type your guess for the country's name in the input field.
- Press Enter to submit your guess.
- If your guess is correct, you will be notified. Otherwise, try again!
- Click "Show Another Flag" to display a new flag.
- Click on the question mark icon in the header to view the game instructions.

## Approach

### Random Flag Display

The app uses a JSON file (`countries.json`) containing data about countries and their flags. A random flag is displayed each time the page is loaded or when the "Show Another Flag" button is clicked.

### Modal for Instructions

The modal component displays the game instructions when the question mark icon is clicked. This helps new users to understand how to play the game.

### Dynamic Image Import

Flag images are stored in the `public/SVG` directory. To avoid manually importing each image and loading all the images at once, a dynamic import approach is used to load one spesific image each time the page is loaded.

### Styling

The app is styled using CSS to ensure a consistent look and feel. The modal and question icon are styled to provide a user-friendly experience.

