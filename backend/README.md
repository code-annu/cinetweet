# Cinetweet Backend

This is the backend for the Cinetweet application, a social media platform for movie enthusiasts. It is built using Node.js, Express, and TypeScript, following Clean Architecture principles.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt
- **Dependency Injection**: InversifyJS
- **Validation**: Zod

## 🏗️ Architecture

The project follows **Clean Architecture** to ensure separation of concerns, scalability, and testability.

1.  **Domain Layer** (`src/domain`):

    - Contains the core business logic and entities.
    - Defines repository interfaces (e.g., `IUserRepository`, `ITweetRepository`).
    - Independent of frameworks and external libraries.

2.  **Application Layer** (`src/application`):

    - Contains application-specific business rules (Use Cases).
    - Orchestrates data flow between the UI and Domain layers.
    - Defines DTOs (Data Transfer Objects) for input and output.

3.  **Infrastructure Layer** (`src/infrastructure`):

    - Implements the interfaces defined in the Domain layer.
    - Handles database interactions using Prisma.
    - Contains external service implementations (e.g., JWT utilities).

4.  **API Layer** (`src/api`):

    - Handles HTTP requests and responses.
    - Contains Controllers, Routers, and Middleware.
    - Uses Zod schemas for request validation.

5.  **Dependency Injection** (`src/di`):
    - Manages dependencies using `inversify`.
    - Binds interfaces to their concrete implementations in the `container`.

## 🛠️ Setup & Requirements

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd cinetweet/backend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/cinetweet?schema=public"
    JWT_SECRET="your-secret-key"
    PORT=3000
    ```

4.  Run database migrations:

    ```bash
    npx prisma migrate dev --name init
    ```

5.  Start the development server:
    ```bash
    npm run dev
    ```

## ✨ Features & API Endpoints

### 🔐 Authentication (`/auth`)

- **Signup**: Register a new user.
  - `POST /auth/signup`
  - Body: `{ email, username, password, fullname, bio?, profile_picture? }`
- **Login**: Authenticate a user and receive tokens.
  - `POST /auth/login`
  - Body: `{ email, password }`
- **Refresh Token**: Get a new access token using a refresh token.
  - `POST /auth/refresh-token`
  - Body: `{ refresh_token }`

### 👤 Profile (`/profile`)

- **Get My Profile**: Retrieve the authenticated user's profile.
  - `GET /profile`
  - Headers: `Authorization: Bearer <token>`
- **Update Profile**: Update profile details.
  - `PUT /profile`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ fullname?, bio?, profile_picture? }`
- **Delete Profile**: Delete the user's account.
  - `DELETE /profile`
  - Headers: `Authorization: Bearer <token>`

### 🐦 Tweets (`/tweets`)

- **Create Tweet**: Post a new tweet.
  - `POST /tweets`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ content, media_url? }`
- **Get Tweet**: Retrieve a specific tweet by ID.
  - `GET /tweets/:id`
- **Update Tweet**: Edit a tweet.
  - `PATCH /tweets/:id`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ content?, media_url? }`
- **Delete Tweet**: Remove a tweet.
  - `DELETE /tweets/:id`
  - Headers: `Authorization: Bearer <token>`
- **Like/Unlike Tweet**: Toggle like status on a tweet.
  - `POST /tweets/:id/like`
  - Headers: `Authorization: Bearer <token>`
- **Get Tweet Likes**: Get a list of users who liked a tweet.
  - `GET /tweets/:id/likes`
- **Get Comments**: Retrieve comments for a tweet.
  - `GET /tweets/:id/comments`
- **Add Comment**: Post a comment on a tweet.
  - `POST /tweets/:id/comments`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ content }`
- **Get Comment**: Retrieve a specific comment.
  - `GET /tweets/:id/comments/:commentId`
- **Update Comment**: Edit a comment.
  - `PATCH /tweets/:id/comments/:commentId`
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ content }`
- **Delete Comment**: Remove a comment.
  - `DELETE /tweets/:id/comments/:commentId`
  - Headers: `Authorization: Bearer <token>`

### 👥 Users (`/users`)

- **Search Users**: Search for users by username.
  - `GET /users/search?username=query`
- **Get User Profile**: Get public profile of a user.
  - `GET /users/:userId`
- **Get User Tweets**: Get tweets posted by a specific user.
  - `GET /users/:userId/tweets`
- **Follow/Unfollow**: Toggle follow status for a user.
  - `POST /users/:userId/follow`
  - Headers: `Authorization: Bearer <token>`
- **Get Followers**: Get a list of a user's followers.
  - `GET /users/:userId/followers`
- **Get Following**: Get a list of users a user is following.
  - `GET /users/:userId/followings`

## 🧪 Development

- **Build**: `npm run build` - Compiles TypeScript to JavaScript.
- **Dev Server**: `npm run dev` - Runs the server with hot-reloading using `nodemon`.
- **Start**: `npm start` - Runs the compiled code from `dist/`.
- **Prisma Studio**: `npx prisma studio` - GUI to view and edit database data.
