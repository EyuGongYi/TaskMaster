To NOTE:
 - dbURL should be missing in this commit so that people don't anyhow touch my shit. If want the URL, contact me.

Modules used for backend:
 - Production Packages:
     - "express.js" (Provides an Backend application )
     - "bcryptjs" (hashing of password)
     - "connect-mongo"
     - "dotenv"
     - "express"
     - "express-session"
     - "mongodb"
     - "mongoose"
     - "passport"
     - "passport-local"

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
Wanted to figure out .env  for storing dbURL but a bit laze rn.


    