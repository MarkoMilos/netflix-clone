# Netflix clone

This is an educational Netflix clone built with modern web technologies. The application interfaces with the TMDB API for content data and uses a local PostgreSQL database for user management and personalization features.

This project was created for educational purposes to demonstrate the implementation of a complex streaming platform using modern web technologies.

## Usage demo

[![Demo video](/assets/demo.png)](https://www.youtube.com/watch?v=4BI1LVlFMqc)


## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Component Development**: Storybook

## Features

- User authentication (login/registration)
- Social login with Google and GitHub
- Multiple profile selection
- Dynamic homepage with billboard and content rows
- Trailer video playback in billboard
- Horizontal content carousels
- Detailed content modal with metadata and similar content recommendations
- Content playback page
- "My List" functionality with dedicated page
- Account menus with settings and sign out
- Responsive navigation with dropdown for mobile breakpoints
- And more...

## Getting Started

### Docker Compose Setup

The easiest way to run the project is using Docker Compose:

```bash
docker compose up -d
```

This will start the following services:

1. **Next.js Application**: Front-end application with source code mounted for live changes
2. **PostgreSQL Database**: Persistent database for user data
3. **pgAdmin**: Web-based database administration tool

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development

### Storybook

This project uses Storybook to preview and develop components in isolation:

```bash
# Using npm
npm run storybook

# Using yarn
yarn storybook
```

Open [http://localhost:6006](http://localhost:6006) to view the component library.

## License

This project is for educational purposes only and is not affiliated with Netflix or TMDB.
