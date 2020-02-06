# HOODSCOOP

## Overview
Always feel like you're missing out on upcoming concerts, guest speakers and other local events in your area? HoodScoop has you covered, allowing you to never miss out on local events in your neighborhood! Hoodscoop is a Node.js web application that allows users to create an account, browser local events in their neighborhood, and save those events they wish to attend or come back to later.

## Technologies Used

- JavaScript
- jQuery
- Ajax
- Node
- Express
- MongoDB
- Mongoose
- Bootstrap

##### Application Dependencies
- bcryptjs
- connect-mongo
- express session
- nodemon

#### Third-Party API
- Ticketmaseter Discovery API

## Existing Features

#### User Account Creation & Authentication
All users must create an account to view the application's profile page, where all event information and remaining features are displayed. Users cre

#### Event Display (Map & Cards)
After a successful login and redirect to their Profile page, the application determines the users location using geolocation methods. Then, a call is sent to the Ticketmaster Discovery API to return events nearest the user based on their location. These returned events are visualized using two methods -- (1) a map with dropped pins on the venue location and (2) a card display where each card displays furthe information about each event (e.g name, genre, date/time, distance, location, url to event). 

#### Event Filters
Currently, the user can utilize a number of filters to modify the type of events displayed on their Profile page. These are based either on time (e.g. events in the next week) or on interest (e.g. Music, Sports, Arts & Theatre). When a filter is selected, a new call is sent to the Ticketmaster Discovery API with the appropriate query parameters to return relevant events to newly populate the users' Profile page. 

#### Favorite Events
Within the event card display, each event card has a small heart icon located at the top left of the card. When event cards are first displayed, this heart icon is simply an outline of a red heart. When a user wants to favorite an event, they click this icon which (1) visually modifies so the heart icon becomes solid red and (2) saves that specific event as a favorite to the user's account. A user can delete a favorite from their account by clicking on the heart icon a second time which visually modifies from a solid color back to the red outline generated when the cards were first rendered. Users can access their favorite events at any point by clicking the "Favorites" tab in the secondary navigation header (located next to event filters).

## Moving Forward
