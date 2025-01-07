# Auth-Services

This project combines NestJS for the server-side and Next.js for the client-side to create a full-stack authentication service.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Clone the repository

```bash
git clone https://github.com/yourusername/Auth-Services.git
cd Auth-Services
```

### Install dependencies

#### Server-side (NestJS)

```bash
cd server
npm install
```

#### Client-side (Next.js)

```bash
cd ../client
npm install
```

## Usage

### Running the server

```bash
cd server
npm run start:dev
```

The server will start on `http://localhost:3000`.

### Running the client

```bash
cd ../client
npm run dev
```

The client will start on `http://localhost:3001`.

## Project Structure

```
Auth-Services/
├── server/       # NestJS server-side code
│   ├── src/
│   ├── test/
│   ├── nest-cli.json
│   ├── package.json
│   └── tsconfig.json
└── client/       # Next.js client-side code
   ├── pages/
   ├── public/
   ├── styles/
   ├── package.json
   └── tsconfig.json
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
