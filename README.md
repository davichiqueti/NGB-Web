# NGB

Repository dedicated to the main project of the course Web Programming (INE5646-UFSC)

The idea of the project is to develop a web application similar to the social network X (formerly Twitter). Users can make public posts on their profiles, interact with posts from other users, and also exchange private messages with another user.

## Students Involved in the Project

- Bernardo Alves Thives
- Davi Rodrigues Chiqueti
- Gustavo Gomes Formento
- Gustavo Padrao Serra de Araujo

## Running development project

```bash
# Starting Back-End
npm run dev
# Starting Front-End     
cd frontend
npm run dev
```

## API Routes

### Authentication ```/api/auth/```

| Method | Endpoint         | Description                                                   |
|--------|------------------|---------------------------------------------------------------|
| GET    | `/authcheck`     | Checks if the user is authenticated. Requires a valid token.  |
| POST   | `/signup`        | Registers a new user.                                         |
| POST   | `/login`         | Authenticates a user and return a token.                      |
| POST   | `/logout`        | Logs out the user, invalidating the token.                    |
| DELETE | `/delete-account`| Delete current logged account, and removes the token.         |

### Users ```/api/users/```

| Method | Endpoint                     | Description                                                   |
|--------|----------------------        |---------------------------------------------------------------|
| GET    | `/profile/$user_name`        | Gets user information.                                        |
| GET    | `/suggest`                   | Gets suggestions of profiles to follow.                       |
| POST   | `/toggle-follow/$user_id`    | Follow/Unfollow user.                                         |
| POST   | `/update`                    | Update user information                                       |

### Middlewares

- **protectRoute**: Middleware that protects routes requiring authentication and adds an "user" field in the request for use in controllers.
