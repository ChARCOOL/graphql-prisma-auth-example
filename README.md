# graphql-prisma-auth-example

  # Backend with prisma, graphql, nexus and apollo using JWT access token and refresh token strategy for authentication
    Using JWT for authentication and bcrypt for hashing
    - 1. User register with username, email and password
    - 2. User log's in with email and password, refresh token and access token gets generated
    - 3. Refresh and access tokens are taken from backend with graphql-request plugin
    - 4. Refresh token is stored as cookie and access token is stored in memory via redux
    - 5. When user visits protected route the access token gets renewed automatically and resaved

  # Using react in frontend with redux for state managament and styled components
