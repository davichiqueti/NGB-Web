# NGB

Repository dedicated to the main project of the course Web Programming (INE5646-UFSC)

The idea of the project is to develop a web application similar to the social network X (formerly Twitter). Users can make public posts on their profiles, interact with posts from other users, and also exchange private messages with another user.

## Students Involved in the Project

- Bernardo Alves Thives
- Davi Rodrigues Chiqueti
- Gustavo Gomes Formento
- Gustavo Padrao Serra de Araujo

## API Routes

### Authentication Routes

| Method | Endpoint         | Description                                                   |
|--------|------------------|---------------------------------------------------------------|
| GET    | `/authcheck`     | Checks if the user is authenticated. Requires a valid token.  |
| POST   | `/signup`        | Registers a new user.                                         |
| POST   | `/login`         | Authenticates a user and return a token.                      |
| POST   | `/logout`        | Logs out the user, invalidating the token.                    |

#### Middlewares

- **protectRoute**: Middleware that protects routes requiring authentication by checking for a valid token.
