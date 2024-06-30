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
   <td rowspan="9" >3
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
   <td>Widget feature
   </td>
   <td>
<ul>

<li>Implement the widget feature if time allows
</li>
</ul>
   </td>
   <td>If time permits (very very difficult)
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

The implementation involves using OAuth2 authentication for secure Google login via Firebase Authentication. Once authenticated, the app accesses Google Calendar API to fetch, add, and update events. Data handling includes storing user tokens securely and managing calendar events with real-time synchronization.

**Fully Implemented:**



* Google login functionality allows users to authenticate via their Google accounts.
* Integration with Google Calendar API to fetch and display calendar events within the app.


### **Implementation Challenges**



* **OAuth2 Authentication:** Implementing secure OAuth2 flows and handling access tokens securely.
* **API Integration:** Ensuring proper integration with Google Calendar API endpoints for event management.
* **Data Synchronization:** Real-time synchronization of calendar events between the app and Google Calendar to maintain consistency.


### **Diagrams/Screenshots**



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")




<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")



---


## **Home Page**


### **Description**

The Home Page serves as the central hub, displaying the current date, user's name, upcoming events from Google Calendar, and alerts from CANVAS as well as a button for users to add events quickly. This is to provide users a comprehensive view of their schedule, integrating data from NUSMods for course timetable, CANVAS for assignments, and user-generated events. Ensuring a seamless user experience with intuitive navigation and event management.


### **Implementation Philosophy**

Currently, the Home Page successfully renders the current date and user's name using React Native components. The UI design is finalized, setting the template for other tabs. However, integration of today's events from Google Calendar and alerts from CANVAS is in progress. Future implementation will involve fetching data from Google Calendar and CANVAS APIs.


### **Implementation Challenges**



* **Data Integration**: Integrating data from multiple sources (NUSMods, CANVAS, user inputs) into a unified calendar view.
* **UI**: Designing a responsive and visually appealing calendar interface that accommodates various screen sizes.


### **Diagrams/Screenshots: **



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")



---


## **Calendar**


### **Description**

The Calendar Tab displays the user’s Google Calendar, enabling users to view existing events and add new events. Events added through the app are synchronized with the user’s Google Calendar, accessible across devices.


### **Implementation Philosophy**

We developed an 'Add Event' page enabling users to input events into their calendars within our app. Utilizing date and time pickers, users can specify event details seamlessly. Real-time data synchronization ensures that any events added or updated in the app are immediately reflected on the user’s Google Calendar."

**Fully Implemented:**



* Display of user’s Google Calendar events within the app.
* Ability to add new events directly to the Google Calendar through the app.
* Real-time synchronization of events between the app and Google Calendar.


### **Implementation Challenges**



* **Date and Time Pickers Compatibility:** Integrating compatible date and time pickers across both iOS and Android platforms posed challenges, as some components were not fully compatible with Android versions, requiring additional testing and adjustments.
* **Time Transfer to Calendar:** Implementing a seamless transfer of event times from the user input to the Google Calendar API involved overcoming technical complexities to avoid discrepancies between app and calendar entries.


### **Diagrams/Screenshots**



<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")





---


## **Canvas Assignment Checker (Incomplete)**


### **Description**


### Automated script to monitor CANVAS for new announcements and assignments, notifying users accordingly.


### **Implementation Philosophy**

To enhance user productivity by providing timely notifications for new CANVAS updates. Integration with backend services for real-time data fetching and notification delivery.


### **Implementation Challenges**



* TBH


### **Diagrams/Screenshots**


---


## **Suggested Workflow Feature (Incomplete)**


### **Description**

Algorithmic recommendation system to organize assignments into a suggested workflow based on deadlines and estimated completion times.


### **Implementation Philosophy**

To optimize user time management by suggesting prioritized task sequences. Utilizing machine learning or heuristic algorithms to generate personalized workflows.


### **Implementation Challenges**



* TBC


### **Diagrams/Screenshots:** 


---


## **Mod Choice Bidding Aid (Incomplete)**


### **Description**

Feature to assist users in arranging mod choice slots for mod bidding, providing recommendations based on user preferences and availability.


### **Implementation Philosophy**

To streamline the mod bidding process by offering optimized slot arrangements. Incorporating user preferences, availability data, and historical bidding trends.


### **Implementation Challenges**



*  TBH 


### **Diagrams/Screenshots: **


---


## **Widget (Incomplete)**


### **Description**

Widget functionality allows users to view their calendar or to-do list directly from their device’s home screen.


### **Implementation Philosophy**

To enhance accessibility and usability by providing quick access to essential app features without launching the full application. Customizable widget options to cater to user preferences.


### **Implementation Challenges**



* TBH ( High Chance will be scrapped)

**Diagrams/Screenshots:** [Include screenshots or diagrams of the widget on the home screen]


---


## **Sync With Friend (Incomplete)**


### **Description**

Feature enabling users to synchronize timetables with friends, facilitating coordination for group projects or study sessions.


### **Implementation Philosophy**

To foster collaboration and time management among users by identifying common free timings. Implementing user search functionality and real-time synchronization algorithms.


### **Implementation Challenges**



* Designing a secure and user-friendly interface for linking and syncing timetables between users.
* Implementing efficient algorithms to identify and display common free time slots.
* Handling privacy concerns and ensuring user consent and data security measures.


### **Diagrams/Screenshots: **

[Include any relevant interface mockups or flow diagrams]


---


# Instructions on how to access the application (Only Available for Android):

**Download the Development build with the following link:**

[https://expo.dev/accounts/diomon/projects/TaskMaster/builds/f25ae30e-378d-46b4-b387-91c36e8a4582](https://expo.dev/accounts/diomon/projects/TaskMaster/builds/f25ae30e-378d-46b4-b387-91c36e8a4582) Click the blue install icon to download the apk and just install it on to your device (Needed due to libraries not supported by expo by default )



<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


Click on this link and run it under development Build:

<span style="text-decoration:underline;">https://expo.dev/preview/update?message=MileStone2&updateRuntimeVersion=1.0.0&createdAt=2024-06-30T15%3A41%3A22.361Z&slug=TaskMaster&projectId=a19afe2a-7aa8-4f75-b19c-64c121b9b2a9&group=572c7382-637e-4ae5-843c-b375aefee680</span>


    

<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.jpg). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.jpg "image_tooltip")
<span style="text-decoration:underline;">v</span>

Run it under development build

Note: Due to the Application being unverified, only selected test users can use the application. We have prepared a test google account for you to use.

Gmail: taskmastertest27@gmail.com

PW: .taskMaster69420!

Poster: 

Github Repo: [https://github.com/EyuGongYi/TaskMaster](https://github.com/EyuGongYi/TaskMaster)

Project Log: 