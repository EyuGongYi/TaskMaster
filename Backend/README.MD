To NOTE:
 - dbURL should be missing in this commit so that people don't anyhow touch my shit. If want the URL, contact me.

Modules used for backend:
 - Production Packages:
     - "express" (Provides an Backend application )
     - "bcryptjs" (hashing of password)
     - "connect-mongo" (mongoDB Session store)
     - "dotenv" (storing env file and env variable)
     - "express-session" (Enable Sessions in express application)
     - "mongodb" (database)
     - "mongoose" (database)
     - "passport" (auth)
     - "passport-local" (auth strategy)

 - Development Packages:
     - Typescript and its dependency for other packages
     - Nodemon (To rerun the application whenever there is change)
     - Jest (For Unit Testing)

File Structure:
 - dist/ (transpiled file from ts to js)
 - src/
     - __mocks__/ (Mock data to test on our functions)
     - __tests__/ (Contains Unit Test file, structured similarly to production code)
     - e2e/ (Integration Test files)
     - dB/ (To connect to db and be used throughout the backend)
     - index.ts (Main entry)
     - createApp (Creates app + route registration, middleware)
     - router/ (Holds different endpoints of the backend)
     - handler/ (handles post/ get requests)
     - middleware/ (Middleware functions)
     - strategies/ (passport auth)
     - dtos/ (Contain Interfaces for RequestBody(Data transfer obj)) *** still unsure, need to update definition when done
     - types/ (Custom types for the project, a bit useless for now)

 Misc:
 - package.json script
     - run it with npm run (function)
     - created and allows for:
         - testing (test)
         - running of nodemon (start:dev)
         - building to go from ts to js (build)
         - running of server  using the built version(start)

Todo:
Figure out how jest works
Figure out how SuperTest works
Figure out Passport.js
Probably needa change :username to use the query feature???

API EndPoint:
 - /api/users
     - /username (Returns user's username)
     - /:username (return an array of [username, email] with usernames corresponding to the username searched)
 - /api/auth
     - /register (Registers a new account for user)
     - /login (Attempts to log the user in. returns Status 201 if logged in. Returns status 500 if Fails to Log in )
     - /isLoggedIn (Checks if user is logged in. Returns status 200 if logged in. status 401 if not logged in) 


    