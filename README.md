

**NUS Orbital 2024 - Milestone 2**


[TOC]


**	**

**Team Name:**

GrassTouchers

**Proposed Level of Achievement: **

Apollo 11


# **Motivation**

NUS students face a myriad of challenges in managing their time efficiently, keeping track of numerous assignments, and balancing study sessions with social activities. Currently, there are existing tools that offer fragmented solutions that address these challenges in isolation, leading to a scattered and inefficient management of tasks and schedules. This gap in holistic, integrated solutions motivates our project.


# **Aim**

Our aim is to develop a comprehensive system that not only enhances individual productivity but also fosters a collaborative and supportive study culture among students. We hope to create an app to streamline task management and optimize schedules, allowing students to finish their work more effectively and providing a better work-life balance \



# **User Stories**



1. As a NUS Student who wants to better manage my time with ease, I want to be able to quickly plan and generate a timetable to better manage my time so as to finish my work on time.
2. As a NUS Student, who wants to not worry if I have missed an assignment, I want to be able to have the application remind me when there is a new Assignment up in Canvas or remind me with sufficient time to do my work.
3. As a NUS Student, who needs to find time to do group projects with other students , I would like to be able to have the application quickly find the free time for us, streamlining the process.
4. As a NUS Student, I would like to find time to study and hang out together with my friends and have the application recommend a timetable for my modules where we are able to spend more time together.


# **Milestones**


## **Milestone 1**

**Tasks :**



* User authentication service
* Home and Calendar page

**Summary :**

We created a login and register page to allow users to create an account for the app. The users will be sent to the home page which currently showcases the current date and in the future, today’s schedule, alerts from CANVAS and add events to the calendar. There is a navigation bar at the bottom that allows users to navigate to the calendar page which will be able to showcase the events on each day. In the future, the navigation bar will also be able to navigate to the recommended workflow and sync with friends page.

**Hurdles we encountered :**

**Languages :**



* We came into Orbital with no existing knowledge of web frameworks, and wanted to work on something that does not seem too hard to use. Hence, we chose the MERN stack- something that seems doable for us beginners that had no experience with making a Fullstack application. It is also all in javascript and thus we do not have to swap between different languages, making the work process more streamlined
* We had no experience with React Native , ExpressJs or MongoDB, so we had to pick them up quickly. We did so with the Mission Control workshops and online tutorials.

**Framework:**



* React Native Expo updated and they did not do clear and proper documentation for the overhaul, and we had to waste a lot of time looking around the internet to fix the issues that popped up.

**Login System :**



* The login system was working fine on the local machine but was extremely buggy and required immediate attention.
* We had to work out the backend logic for the token issuing as it works on some devices but does not always work.

**UI :**



* After going through a project consultation of UI/UX, we have a good idea on how our app would look like, and we were able to apply some of the considerations discussed during the consultation when creating the UI.
* However, some aspects of the UI, like the creation of the navigation bar and the design of the calendar was unexpectedly challenging and took us longer than expected to complete. As such, our UI is currently still quite rudimentary due to time constraints and we just wanted to have a simple visual while we work on other aspects of our application.


## **Milestone 2**

**Tasks:**



* Implementation of Google Sign-Up and Google Calendar Integration
* Changing Backend to firebase and handling FireBase Authentication 
* Addition of Events and syncing with user’s Google Calendar
* Addition of new tabs : Canvas, Recommended Workflow, Sync with friends and Profile featuring basic capabilities

**Summary:**

We have introduced several new tabs in our app, including Canvas, Recommended Workflow, Sync with Friends, and the Profile page. These tabs currently offer foundational capabilities and are still under development. The implementation of the Google API, which includes Google Sign Up and Google Calendar integration, has significantly enhanced our app's functionality. Users can now log in with their Gmail accounts and seamlessly sync their Google Calendar with our app. This integration allows users to add and view events across both platforms, providing a more streamlined experience for managing schedules.

**Challenges:**

**Google API:**



* Implementing the Google API, which includes Google Sign Up and Google Calendar integration, posed significant challenges. The strict OAuth2 authentication requirements and deprecated features within Expo extended our implementation timeline. Overcoming these hurdles required extensive troubleshooting and adaptation to ensure seamless functionality.
* The restrictions on Google API also caused us to give up on having it work on web and ios due to the library we resorted to using, and now we will only focus on android going forward

**Firebase:**



* The decision to migrate to Firebase was driven by the challenges we faced integrating the Google API with Expo for Android. Uncertainties about secure workarounds led us to adopt methods found online, relying on imported modules to manage access tokens and offline functionality effectively. Transitioning to Firebase, a Backend as a Service (BaaS), required a learning curve to fully configure and operationalize, despite its inherent advantages over our previous self-hosted server solution.

**Adding Events Capability:**



* During Milestone 2, it was surprisingly a challenge was integrating the 'Add Events' feature with Google Calendar in our app. Implementing the 'Add Events' page, included a date and time picker, and as the date time picker module was a bit weird for the android version and wonky to work with and there was time spent fiddling around with how we implemented it to ensure the data is captured and display appropriately
* Syncing events recorded within our app with Google Calendar also posed challenges. It required much debugging to avoid event duplication and discrepancies between our app and Google Calendar. Additionally, navigating OAuth2 authentication complexities and managing access tokens for secure integration further added to the complexity.


## **Milestone 3**

**Tasks:**



* Completion of features: Canvas, Sync with friends and recommended workflow
* Completion of Home page: Displays today’s schedule as well as alerts from Canvas and Recommendations
* Option to edit and delete events from calendar
* UI Improvements

**Summary:**

We have successfully integrated our app with Moodle, an open-source alternative to Canvas. This feature enables users to view posted assignments and announcements directly within the app. The "Sync with Friends" feature allows users to search for multiple friends' usernames within the app, helping in finding common free timings over a specified period. Our "Recommended Workflow" feature suggests an optimal schedule for users based on their existing tasks and deadlines. The home page of our app has been designed to display the user's schedule for the current day along with any alerts. Alerts include notifications for upcoming assignments and announcements from Canvas (Moodle) as well as reminders for recommended events that have not yet been accepted. We have added the functionality for users to edit and delete events directly from their calendar. This allows users to manage their schedules dynamically and make adjustments as needed. For our UI improvements, we designed our app such that navigation through the app is seamless, easy to use and appealing to our users.

**Challenges:**

**Moodle API:**



* Similar to the Google API, integrating the Moodle API posed significant challenges, primarily due to its complexity and the need for a thorough understanding to fetch assignments and announcements accurately. It took us a while to understand how to set and manage the tokens effectively, ensuring secure and seamless communication between our app and Moodle.

**Logic behind ‘Recommended Workflow’ feature:**



* Implementing the 'Recommended Workflow' feature was particularly challenging due to the need to handle events with and without predefined timings correctly. The process involved separating these events and developing a filtering and conditional logic to generate effective recommendations. The solution was to typecast events as "GoogleEventType" for those with set timings and "RecoEventType" for those without. This approach simplified the logic and ensured that all events were appropriately managed, ultimately making the recommendation process more efficient.

**Sync with friends:**



* 


# **Timeline and Development Plan**


<table>
  <tr>
   <td><strong>Milestone</strong>
   </td>
   <td><strong>Tasks</strong>
   </td>
   <td><strong>Details</strong>
   </td>
   <td><strong>Date</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="4" >1
   </td>
   <td>Preparation
   </td>
   <td>Familiarizing with basic technologies:
<p>
- React Native
<p>
- Express.js
<p>
- MongoDB
<p>
- Passportjs
   </td>
   <td>May 17 - May 25
   </td>
  </tr>
  <tr>
   <td>Login/Register feature
   </td>
   <td>Creation of UI for login and register screen, as well as using passport.js for its backend
   </td>
   <td>May 25 - May 30
   </td>
  </tr>
  <tr>
   <td>Navigation
   </td>
   <td>Navigation between all screens as well as a navigation bar at the bottom of the screen to navigate to all screens easily
   </td>
   <td>May 20 - May 25
   </td>
  </tr>
  <tr>
   <td>Documentation
   </td>
   <td>Documenting progress, updating of poster/ video and creation of README
   </td>
   <td>May 25 - May 31
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Milestone 1 Evaluation:</strong>
<ul>

<li>Ideation

<li>Proof of concept: 
<ul>
 
<li>Login/Register
 
<li>Sidebar navigation
 
<li>Home and Calendar Screen
</li> 
</ul>
</li> 
</ul>
   </td>
   <td>3 June, 2pm
   </td>
  </tr>
  <tr>
   <td rowspan="9" >2
   </td>
   <td rowspan="8" >Features 
   </td>
   <td>Adding events to calendar page
   </td>
   <td>1 Jun - 11 Jun
   </td>
  </tr>
  <tr>
   <td>Syncing with other users page
   </td>
   <td>1 Jun - 11 Jun
   </td>
  </tr>
  <tr>
   <td>CANVAS page
   </td>
   <td>1 Jun - 11 Jun
   </td>
  </tr>
  <tr>
   <td>Google Login and Calendar Integration
   </td>
   <td>1 Jun - 11 Jun
   </td>
  </tr>
  <tr>
   <td>Profile page
   </td>
   <td>11 Jun - 20 Jun
   </td>
  </tr>
  <tr>
   <td>User settings
   </td>
   <td>11 Jun - 20 Jun
   </td>
  </tr>
  <tr>
   <td>Unit Testing
   </td>
   <td>21 Jun - 30 Jun
   </td>
  </tr>
  <tr>
   <td>Integration Testing
   </td>
   <td>21 Jun - 30 Jun
   </td>
  </tr>
  <tr>
   <td>README
   </td>
   <td>-update design principles
<p>
-system testing
<p>
-Github documentation
   </td>
   <td>1 Jun - 30 Jun
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Milestone 2 Evaluation: </strong>
<ul>

<li><strong>Design:</strong> UI/UX design has made significant progress, with core elements implemented. Refinements are ongoing to enhance user experience and visual coherence.

<li><strong>Prototype:</strong> Implemented event saving functionality on the calendar. In progress: Integration for syncing with CANVAS and NUSMods to display assignments, announcements, and timetable. Full implementation of these features is underway to enrich user interaction and utility.
</li>
</ul>
   </td>
   <td>1 July, 2pm
   </td>
  </tr>
  <tr>
   <td rowspan="8" >3
   </td>
   <td rowspan="4" >Features to be implemented
   </td>
   <td>Sync With Friends
   </td>
   <td> By 3 July (can be done fast) (Gong Yi)
   </td>
  </tr>
  <tr>
   <td>Canvas Assignment Checker
   </td>
   <td>By 10 July(Bryan)
   </td>
  </tr>
  <tr>
   <td>Recommended Time Slots
   </td>
   <td>By 15 July(Bryan and Gong yi)
   </td>
  </tr>
  <tr>
   <td>NUS Mod Calendar Adder
   </td>
   <td> By 10 July(Gong yi)
   </td>
  </tr>
  <tr>
   <td>Unit Testing
   </td>
   <td>
<ul>

<li>To ensure app does not bug out and have unintended consequences
</li>
</ul>
   </td>
   <td>4- 6 July on the existing things
   </td>
  </tr>
  <tr>
   <td>User Testing
   </td>
   <td>
<ul>

<li>Collect feedback on usability, and accessibility of app

<li>Implement any changes based on feedback
</li>
</ul>
   </td>
   <td>Start by 15 july
   </td>
  </tr>
  <tr>
   <td>Unit Testing and Integration Testing
   </td>
   <td>
<ul>

<li>
</li>
</ul>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Debugging
   </td>
   <td>
<ul>

<li>Fix any bugs found during testing
</li>
</ul>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td colspan="3" ><strong>Milestone 3 Evaluation:</strong>
<ul>

<li>Perform system and user testing 

<li>Full Documentation and deployment of project
</li>
</ul>
   </td>
   <td>29 July, 2pm
   </td>
  </tr>
</table>



# **Features**


---


## **Google Login and Google Calendar Integration **


### **Description**

Enable users to log in using their Google account credentials and integrate Google Calendar functionality within the app. Users can also add events into their Google calendar on the app with our “add Events” page.


### **Implementation Philosophy**

The implementation involves using OAuth2 authentication for secure Google login via Firebase Authentication. Once authenticated, the app accesses Google Calendar API to fetch, add, and update events. Data handling includes storing user tokens securely and managing calendar events with real-time synchronization. We wanted to use the Google Calendar API as it streamline our application with the users google calendar, allowing the calendar to be easily ported over to any devices. Using  the Calendar API also reduced the storage space of our backend database, making the application less costly if we have a  large user base in the case that we decide to further develop it and have it work  with Canvas

**Fully Implemented:**



* Google login functionality allows users to authenticate via their Google accounts.
* Integration with Google Calendar API to fetch and display calendar events within the app.


### **Implementation Challenges**



* **OAuth2 Authentication:** Implementing secure OAuth2 flows and handling access tokens securely. As there are different OAuth2 flows, the fear of handling access tokens insecurely and the documentation for google API usage was messy to get through, especially for a mobile application, this was surprisingly the biggest hurdle out of everything in our project that we faced.
* **API Integration:** Ensuring proper integration with Google Calendar API endpoints for event management.
* **Data Synchronization:** Real-time synchronization of calendar events between the app and Google Calendar to maintain consistency.


### **Diagrams/Screenshots**



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")



---


## **Home Page**


### **Description**

The Home Page serves as the central hub of our app, providing users with a comprehensive view of their schedule. It displays the current date, the user's name, upcoming events from Google Calendar, and alerts from CANVAS and the Recommendations tab. This integrated view combines data from CANVAS (Moodle) for assignments and announcements, user-generated events, and recommended events from the recommendations tab, ensuring a seamless user experience with intuitive navigation and event management.


### **Implementation Philosophy**

Currently, the Home Page successfully renders the current date and user's name using React Native components. The UI design is finalized, setting the template for other tabs. The integration of today's events from Google Calendar and alerts from CANVAS (Moodle) is complete, with data being fetched from Google Calendar and Moodle API. This provides users with real-time updates on their schedule and important alerts.


### **Implementation Challenges**



* **Data Integration:** Integrating data from multiple sources (Moodle, Recommendations, and user calendar) into a unified calendar view required careful handling of different data formats and synchronization.
* **UI Design:** Designing a visually appealing calendar interface that accommodates various screen sizes was essential. The numerous components making up the homepage required constant adjustments to values and styling to maintain a consistent and user-friendly layout.


### **Diagrams/Screenshots: **



<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")



---


## **Calendar**


### **Description**

The Calendar Tab offers a comprehensive view of the user’s Google Calendar, allowing users to seamlessly view, edit, delete, and add events. Events added through the app are synchronized with the user’s Google Calendar, ensuring accessibility across all devices. This synchronization allows users to manage their schedules efficiently, with real-time updates reflected immediately on their Google Calendar.


### **Implementation Philosophy**

We developed a robust calendar feature that enables users to not only view their existing events but also add new ones through an 'Add Event' page. This page utilizes intuitive date and time pickers, allowing users to specify event details easily. The calendar also supports editing and deleting events directly within the app, with changes being synchronized in real-time with the user's Google Calendar. Additionally, events without fixed timings are seamlessly transitioned to the recommendations tab for further management.


### **Implementation Challenges**



* **Date and Time Pickers Compatibility:** Ensuring compatibility of date and time pickers across both iOS and Android platforms posed significant challenges. Some components were not fully compatible with Android versions, necessitating extensive testing and adjustments to achieve a seamless user experience.
* **Time Transfer to Calendar:** Implementing the seamless transfer of event times from user input to the Google Calendar API involved overcoming technical complexities. This was crucial to avoid discrepancies between the app and calendar entries, ensuring accurate event scheduling. The packages used to help us with the Calendar had a weird data type to work with and the need to handle the timezone issue and ISO format took us awhile to figure out.
* **Transition to Recommendations Tab:** Managing events created without fixed timings required a smooth transition to the recommendations tab. This involved addressing difficulties in event management and typecasting to ensure a streamlined user experience. Events with fixed timings are typecast as “GoogleEventTypes” while non-fixed ones (sent to recommendations) are typecast as “RecoEventTypes.” Additionally, while “GoogleEventTypes” can be easily stored in the user’s Google Calendar, “RecoEventTypes” could not due to lacking time data, necessitating the use of async storage.


### **Diagrams/Screenshots**




---


## **Canvas Assignment Checker **


### **Description**


### The Canvas Assignment Checker is an automated script that monitors Moodle (used as a substitute for CANVAS, as we do not have access to CANVAS API and Moodle is open source) for new announcements and assignments. It provides real-time updates to users, ensuring they are promptly informed.

If Testers are interested in tinkering with the moodle system, the testing account and details are provided at the bottom


### **Implementation Philosophy**

The Canvas Assignment Checker aims to boost user productivity by delivering timely notifications about new Moodle updates. The implementation includes:



* **Real-Time Monitoring:** Continuous monitoring of Moodle for any new announcements and assignments.
* **Assignment/Announcements Delivery:** Integration with backend services to fetch data in real-time and deliver assignments/announcements immediately to users.
* **User Interface Integration:** Displaying fetched announcements and assignments within the app's UI, ensuring users can view and manage their tasks efficiently.

Moodle was used in our application as it was suggested to be used as a proof of concept as working the NUS Canvas was going to be a hassle. We were also not too comfortable with NUS Canvas as it is our first time handling security and sensitive information. Moodle also provided the ability for us to better test TaskMaster as we are able to add and edit assignments and announcements. 


### **Implementation Challenges**


    **Moodle API Complexities:**



* **Token Management:** Handling the token-based authentication system of Moodle was challenging. The process involved understanding how to generate, store, and refresh tokens securely.
* **API Documentation and Stability:** The Moodle API documentation was not very friendly for beginners to look at, requiring significant time to comprehend the correct endpoints and methods to use. Additionally, ensuring the API calls were stable and reliable posed an ongoing challenge.

    **Role Allocation:**

* **Different Permissions:** Moodle assigns different permissions to roles like students and teachers. Implementing a system that correctly handled these permissions was crucial to fetch data accurately.
* **Role-Specific Data Fetching:** Ensuring that the app could fetch the correct data based on the user’s role (e.g., only fetching assignments for students and creation capabilities for teachers) required detailed logic and testing.


### **Diagrams/Screenshots**



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")



---


## **Suggested Workflow Feature **


### **Description**

An algorithmic recommendation system designed to organize assignments into a suggested workflow. The system prioritizes tasks based on deadlines, estimated completion times, and priority levels, helping users manage their time more efficiently.


### **Implementation Philosophy**

The primary goal is to optimize user time management by suggesting a prioritized sequence of tasks. The system leverages straightforward filtering and conditional logic to create personalized workflows. Users input an event with a deadline, duration, and priority level, and the event is initially typecast as a "RecoEventType." This typecast event runs through the algorithm to generate a suggested timing. Upon user acceptance, the event is converted to a "GoogleEventType" and synchronized with the user's Google Calendar.


### **Implementation Challenges**


    **Typecast Issues:**



* **Initial Complexity:** Initially, filtering the correct events for generating accurate suggestions was difficult due to poor typecasting. This complexity hindered the system's ability to compare and prioritize events effectively. This was solved by cleaning the code and ensuring precise typecasting, making it simpler to handle events. Properly distinguishing between "RecoEventType" and "GoogleEventType" allowed the system to filter and process events accurately, enhancing the recommendation accuracy.

    **Algorithm Development:**

* **Task Prioritization Logic:** Developing an algorithm that effectively prioritize tasks based on multiple criteria (deadline, duration, priority) was challenging. The logic needed to account for various scenarios and user inputs to generate optimal recommendations.
* **Real-Time Adjustments:** Ensuring the algorithm could adapt to real-time changes in user inputs or event updates required continuous testing and refinement.

    **User Experience:**

* **Seamless Transition:** Facilitating a smooth transition from "RecoEventType" to "GoogleEventType" upon user acceptance involves integrating the recommendation system with the Google Calendar API seamlessly.
* **Intuitive Interface:** Designing an interface that allowed users to input events easily and understand the generated recommendations required thoughtful UI/UX design. The goal was to make the process intuitive and user-friendly, minimizing any potential confusion.

    **Data Synchronization:**

* **Google Calendar Integration:** Implementing real-time synchronization with Google Calendar to reflect accepted events accurately posed technical challenges. Ensuring that events were updated without discrepancies between the app and the calendar was crucial.
* **Async Storage for RecoEvents:** Since "RecoEventTypes" cannot be stored in Google Calendar without fixed timings, using async storage to manage these events until they are accepted was necessary. Ensuring data consistency and reliability in this intermediate storage step was vital.


### **Diagrams/Screenshots:** 



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")



---


## **Sync With Friend**


### **Description**

A feature that allows users to synchronize their timetables with friends, making it easier to coordinate group projects, study sessions, or any other collaborative activities by identifying common free times.


### **Implementation Philosophy**

The goal is to foster collaboration and improve time management among users by identifying and displaying common free times. This is achieved through implementing a user search functionality and real-time synchronization algorithms. Users can search for friends' usernames, link their timetables, and view overlapping free time slots.


### **Implementation Challenges**


    **User-Friendly Interface:**



* **Design:** Creating an intuitive and visually appealing interface that allows users to easily search for friends and sync their timetables was challenging. Ensuring that the process is straightforward and user-friendly was a primary focus.
* **User Interaction:** Designing a smooth interaction flow, where users can quickly link their timetables with friends and view the results without confusion, required thorough UI/UX testing and iteration.

    **Real-Time Synchronization Algorithms:**

* **Efficiency:** Developing efficient algorithms to identify and display common free time slots was technically demanding. The algorithms needed to handle large datasets and perform real-time calculations to provide accurate results.
* **Accuracy:** Ensuring that the identified free time slots were accurate and up-to-date with the latest timetable changes required robust synchronization logic. This involved continuous testing and optimization.

    **Linking with Other Users:**

* **Access and Permissions:** Linking with other users and accessing their calendar data presented significant challenges. Ensuring that our application had the correct permissions and handled the offline token correctly so that the token does not become invalid.
* **Data Consistency:** Maintaining data consistency between linked users, especially when timetables are frequently updated, was essential to provide reliable synchronization. This involved implementing robust data handling mechanisms.

    **Backend Integration:**

* **API Integration:** Integrating with backend services to fetch and update timetable data in real-time posed technical challenges. Ensuring that the API calls were efficient and handled errors gracefully was crucial.
* **Scalability:** Designing the system to handle multiple users syncing their timetables simultaneously required careful consideration of scalability and performance.


### **Diagrams/Screenshots: **



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")



---


# Instructions on how to access the application (Only Available for Android):

**Download the Development build with the following link:**

[https://expo.dev/accounts/diomon/projects/TaskMaster/builds/f25ae30e-378d-46b4-b387-91c36e8a4582](https://expo.dev/accounts/diomon/projects/TaskMaster/builds/f25ae30e-378d-46b4-b387-91c36e8a4582) Click the blue install icon to download the apk and just install it on to your device (Needed due to libraries not supported by expo by default )



<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")


Click on this link and run it under development Build:

<span style="text-decoration:underline;">https://expo.dev/preview/update?message=MileStone%203&updateRuntimeVersion=1.0.0&createdAt=2024-07-28T19%3A31%3A41.874Z&slug=TaskMaster&projectId=a19afe2a-7aa8-4f75-b19c-64c121b9b2a9&group=0fba628e-dd59-49d7-95bd-807d1571f0d8</span>


    

<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.jpg "image_tooltip")
<span style="text-decoration:underline;">v</span>

Run it under development build

Note: Due to the Application being unverified, only selected test users can use the application. We have prepared a test google account for you to use.

Gmail: taskmastertest27@gmail.com

PW: .taskMaster69420!

We use Moodle as a proof of concept for Canvas and you may be automatically logged into it when pressing the “Canvas” tab, otherwise you are required to enter the email below.

Moodle:

[https://taskmasterr.moodlecloud.com](https://taskmasterr.moodlecloud.com) 

Student account:

Username: test1

PW: .taskMaster69420!

Teacher account:

Username: test2

PW: .taskMaster69420!

Feel free to go onto the temp moodle site we have to tinker between the student account and the teacher account. Taskmaster currently checks for assignment type only and the special announcement forum of the course the user is enrolled into. Just to show the concept of it working with canvas. 

Poster: 

Github Repo: [https://github.com/EyuGongYi/TaskMaster](https://github.com/EyuGongYi/TaskMaster)

Project Log: 
