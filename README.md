# Clearscore Take Home Test

This project is a web application built using Vite and React with TypeScript. It implements an idea board based on the provided requirements.

## Project Description

The application allows users to manage and sort their ideas on a virtual board. They can add new ideas, update existing ones, and delete ideas they no longer need. The ideas are then stored in local storage so they can be accessed again later.

The app is deployed to Vercel and can be viewed here: https://clearscore-fed-test.vercel.app/

## Installation and Setup

To run the project locally, follow these steps:

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the project folder: `cd clearscore-fed-test`
3. Install dependencies: `npm install`

## Useful commands

1. `npm run dev` - Runs the app in development mode on http://localhost:5173
2. `npm run build` - Builds the app for production
3. `npm run test` - Runs the Jest unit tests with coverage
4. `npm run test:watch` - Runs the Jest unit tests in watch mode
5. `npm run cy:open` - Opens the Cypress test runner

## Technology Choices

- Vite was chosen as it is a fast build tool and has built-in support for React and TypeScript, making it ideal for this small project.
- Styled Components was selected as the CSS-in-JS library, providing the added benefit of using JavaScript to style components, resulting in a more maintainable codebase.
- Jest and Cypress were chosen as testing frameworks due to their popularity, ease of use, and comprehensive test coverage capabilities.

## Prefix Convention

Styled Components in the project are prefixed with `Sc` for clarity.

## Requirements

The requirements for the build can be found [here:](https://github.com/ClearScore/tech-screen/tree/master/idea-board)
