# graphql-prisma-auth-example

  # Basic backend with prisma graphql nexus apollo
    # using jwt for authentication and bcrypt for hashing
    - 1. user register with username, email and password
    - 2. user log's in with email and password, refresh token and access token gets generated
    - 3. refresh and access tokens are taken from backend with graphql-request plugin and are set as cookies
    
    TODO
    navbar to show logout button if user logged in, and log in, register if user is not logged in. 
    user can protected route with access token and access token gets renewed 
