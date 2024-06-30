# **Team Name**

GrassTouchers

# **Proposed Level of Achievement**

Apollo 11 

# **Product**
TaskMaster

# **Motivation**

NUS students face a myriad of challenges in managing their time efficiently, keeping track of numerous assignments, and balancing study sessions with social activities. Currently, there are existing tools that offer fragmented solutions that address these challenges in isolation, leading to a scattered and inefficient management of tasks and schedules. This gap in holistic, integrated solutions motivates our project.

# **Aim**

Our aim is to develop a comprehensive system that not only enhances individual productivity but also fosters a collaborative and supportive study culture among students. We hope to create an app to streamline task management and optimize schedules, allowing students to finish their work more effectively and providing a better work-life balance

# **Features**

1. Features 1 (core): Calendar with course timetable and additional assignments from CANVAS/ user-added
2. Feature 2 (core): Bot to check CANVAS for new announcements/ assignments. Announcements will be added to an announcement list, and assignments onto a To-Do List. Users will be notified when there is a new announcement/assignment
3. Feature 3 (core): Algorithm to arrange all assignments into calendar as a suggested workflow (depending on duration to complete assignments and deadline)
4. Feature 4 (core): Give recommendation for arrangement of mod choice slots for mod bidding.
5. Feature 5 (extension): Widget to allow user to see calendar/ to-do list easily
6. Feature 6 (extension): Allow for users to link timetables with each other to find/ arrange common timings for group projects/ study sessions

# **Timeline**

1. Milestone 1 - Technical proof of concept (i.e., a minimal working system with both the frontend and the backend integrated for a very simple feature)
    1. Have a working calendar application that allows for users to add / remove events, and ensure user data is saved between log-ins
2. Milestone 2 - Prototype (i.e., a working system with the core features)
    1. Have the calendar automatically add the user’s calendar from CANVAS.
    2. Develop the algorithm that can arrange the assignments and other events onto the calendar, taking into account their duration and deadlines, and have a separate screen to show the new timetable so as to let the user decide whether to use the suggested timetable.
3. Milestone 3 - Extended system (i.e., a working system with both the core + extension features)
    1. Implement a widget extension, allowing users to view their calendar/ To-Do List at a glance
    2. Have a system to sync with other users' calendars to find common times to meet.
    3. Refining of UI/UX to improve users experience.

# **Tech Stack**

1. Frontend: React Native
2. Backend: Express.js
3. Database: MongoDB
4. Security: Passportjs
5. Version Control: Github

# User Stories

[Untitled Database](https://www.notion.so/cbaa942c12d94a958bdcf77c85aaca3b?pvs=21)

# Program Flow

https://documents.lucid.app/documents/6a4d802f-5524-4114-b63e-a684b565fbd3/pages/0_0?a=2590&x=1951&y=805&w=3678&h=2287&store=1&accept=image%2F*&auth=LCA%2060e4b72d20628dbfe424a9478856196d417fc50dc24e6ddf2560258f0cb64eab-ts%3D1717162162

# **Milestone progress/Timeline**

## Milestone 1

**Tasks :** 

- User authentication service
- Home and Calendar page

**Summary :** 

We created a login and register page to allow users to create an account for the app. The users will be sent to the home page  which currently showcases the current date and in the future, today’s schedule, alerts from CANVAS and add events to the calendar.  There is a navigation bar at the bottom that allows users to navigate to the calendar page which will be able to showcase the events on each day. In the future, the navigation bar will also be able to navigate to the recommended workflow and sync with friends page.

**Hurdles we encountered :** 

Languages : 

- We came into Orbital with no existing knowledge of web frameworks, and wanted to work on something that does not seem too hard to use. Hence, we chose the MERN stack- something that seems doable for us beginners that had no experience with making a fullstack application.
- We had no experience with React Native , ExpressJs or MongoDB, so we had to pick them up quickly. We did so with the Mission Control workshops and online tutorials.

Framework:

- React Native Expo updated and they did not do clear and proper documentation for the overhaul, and we had to waste a lot of time looking around the internet to fix the issues that popped up.

Login System : 

- The login system was working fine on the local machine but was extremely buggy and required immediate attention.
- We had to work out the backend logic for the token issuing as it works on  some devices but does not always work.

UI : 

- After going through a project consultation of UI/UX, we have a good idea on how our app would look like, and we were able to apply some of the considerations discussed during the consultation when creating the UI.
- However, some aspects of the UI, like the creation of the navigation bar and the design of the calendar was unexpectedly challenging and took us longer than expected to complete. As such, our UI is currently still quite rudimentary due to time constraints and we just wanted to have a simple visual while we work on other aspects of our application.
