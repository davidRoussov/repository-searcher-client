# Repository Searcher

Nuxt 3 web app that searches Github repositories.

## Prerequisites

Before running this web application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 16.18.1 or higher)
- [Yarn](https://yarnpkg.com/) (version 1.22.19 or higher)

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:davidRoussov/repository-searcher-client.git
```

2. Navigate to the project directory:

```bash
cd repository-searcher-client
```

3. Install dependencies using Yarn:

```bash
yarn install
```

## Running the Application

To start the development server, run the following command:

```bash
yarn dev
```

This will launch the web application at [http://localhost:3000](http://localhost:3000) in your default web browser.

---

*Note: If API port 8000 was originally unavailable, update environment variable VUE_APP_API_BASE_URL in .env to reflect the port the API is running on.*

## Building the Application

To build the production-ready version of the web application, execute the following command:

```bash
yarn build
```
