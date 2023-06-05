# ASECCA - Front end client SPA

Asecca front end client SPA used to present company "widgets" (pages) for particular data records, served from the company's web API.

The application has been built using React, Next.JS, TypeScript and Redux
state managment. The application is styled with MUI v5, with custom theme.

Application unit tests are performed with Jest and React Testing Library.

## Project Status

This project is currently in development.

## Project Documentation

This project is documented automatically using JSDoc. Please be aware of this when commenting/modifying code, and please respect the JSDoc commenting format. Please see the [JSDoc documentation](https://jsdoc.app/) for guidance.

The documentation for the project can be explored by opening /docs/index.html in your chosen browser.

The documentation can be updated by running:

        npm run docs

## Evironment Variables

The project requires the following variables to be defined in a local
".env" file:

        STAGING_DB_USERNAME=<your-username-value-here>
        STAGING_DB_PASSWORD=<your-password-value-here>
        STAGING_DB_REST_API_URL=<your-api-url-value-here>

## Installation and Setup

Clone down this repository. You will need Node.JS and npm installed globally on your machine.

Installation:

        npm install --legacy-peer-deps

To Run Test Suite:

        npm test

To Run Test Suite and update snapshots:

        npm test -- -u

To run a build:

        npm run build

To Start Server (ensure there is a build ready to be run):

        npm start

To Start Dev Server:

        npm run dev

To Visit App:

        localhost:3000/
