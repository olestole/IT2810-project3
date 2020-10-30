## Run project

```
$ git clone git@gitlab.stud.idi.ntnu.no:it2810-h20/team-49/prosjekt3.git
$ npm install
$ cd backend 
$ npm start
```
Open another terminal
```
$ cd frontend
$ npm start
```

## Run tests

### Unit tests

### End to end tests


## Structure

**/root**: The root of the project, contains frontend and backend as separate parts including a *package.json* to simplify the installation/usage of the webapp. <br> 
* **/backend** 
    * **/src**: Contains the backend logic. *index.ts* starts the server and connects to the database. *resolver.ts* and *typeDefs.ts* contains Apollo GraphQL-specific logic for defining the available types and queries/mutations.<br>
        * **/models**: contains the different schemas contained in the database. These models are modelled using Mongoose. <br>
        * **/utils**: Utility-functions for the backend. It only contains a script for verifying JWT. Read more about this under #Authentication. <br>
* **/frontend**
    * **/cypress**: Cypress testing files. (Read more under #Testing)<br>
        * **/integration**: Contains our test file for e2e testing
    * **/public**: Contains assets and other static files hosted with the client<br>
    * **/src**: The source-code of the project frontend part<br>
        * **/__tests__: Contains the unit- and snapshot-tests and the reference snapshots. <br>
        * **/components**: Includes every component used by the application. The folder is divided into subfolders where every subfolder includes components (.tsx-files) related to that specific area of concern. <br>
            * **/graphql**: Contains every GraphQL query/mutation, and their related, generated type-definitions in *__generated__*. <br>
            * **/pages**: Contains the different pages/routes <br>
            * **/store**: Redux specific files
                * **/action**: Contains every action defined for redux.<br>
                * **/reducer**: Contains the reducer used to update and mutate state. <br>
                * **/types**: Contains redux-specific type-definitions. <br>
            * **/types**: Contains global TS-interfaces. <br>
            * **/utils**: Utility-functions for the frontend. It only contains a wrapper-script for tapping into the headers apollo and integrate it with Auth0 (Read more under #Authentication and #Apollo). <br>

**Mentionable files:**

* **.env:** Contains the environment variables used throughout the project. These would normally not be pushed to version control, but given the nature of peer-grading, it’s necessary that we reveal these.
* **apollo.config.js:** Defines the connection to the remote *Apollo studio*.

## Tech Stack

### Frontend

#### Material-UI
As we were encouraged to use libraries for frontend, we chose to use Material-UI. Members of the group already had experience with working with Material-UI and it comes with a lot of benefits. 
It contains a large library of components, a customizable theme that can be accessed globally throughout your components, a large community of users providing external support and examples. 

#### Redux (State Management)
With Redux we are storing a global AppState. We need the global state to be able to access the same variables in different components. The Appstate includes “modalOpen”, used for opening the product review modal. “searchtext” is used to update the search. 
When the text is “” (empty) it will search for all items. All the “filterOptions” is used for filtering the data. “viewMode” is used to check if the data to be loaded should be appended or fetching a new query set. 

### Backend

#### MongoDB
For our database we use MongoDB. MongoDB is a NoSQL database which makes it easy to store different documents and add/update independent fields. MongoDB is also very easy to query. The queries are implemented in the backend resolver.

We connect to MongoDB through Mongoose which is a library that makes it easier to model the different object-schemas.


#### Apollo Client

To retrieve data from the backend to the client we use Apollo Client. Apollo Client is a comprehensive state management library for JavaScript/TypeScript that enables us to manage both local and remote data with GraphQL. Apollo also makes it easy to generate the TypeScript-interfaces of every query and mutation with apollo codegen.

GraphQL enables the client to ask the backend for specific fields of data. This is convenient as it enables us to fetch exactly the data we need, instead of continuously over-/underfetch. An example of this is shown in the query “productsQuery”. 
Instead of fetching all fields from the product we exclude fields like Farge, Lukt, Smak as we’re not interested in those fields where we query these products.

*Lazyloading:*
The implementation of lazy loading (fetching additional data and adding it to the current dataset) is implemented in ProductListView using fetchMore, a function that comes with apollo. The fetchmore function runs each time you scroll to the bottom of the current dataset. This function enables us to fetch just the next sequence of data we need, and not the whole data sequence. 
This is done by passing in a new filterIndex, a variable the same as the length of the current list of data. To make this work we made our function for fetching data skip the provided index (in the database ignoring the items before the index), so we are actually using the same function for fetching data each time just with different variables. 
This function is called products and can be found under: /backend/src/resolvers. 

#### Authentication

For authentication the webapp implements Auth0. Auth0 is an out-of-the-box authentication & authorization platform. Auth0 keeps a username-password-database so that we don’t have to worry about implementing encryption for passwords and risk leaking sensitive information.

An example of the usecase for Auth0:
As we don’t want users who aren't logged in to add reviews for a product, Auth0 let’s us secure the addReview-mutation. 
By wrapping this mutation in withAuth a user without a valid JSON Web Token (JWT) will not be able to execute this call. I.e. if a user somehow bypasses the client-side logic and pretends that they have a user - they still wouldn’t be able to add a review because the authentication prevents it in the backend.

## Functionality

### Fetching, Filtering, Search

### Login

### Reviews

## Testing

### End-2-End Testing
For end to end testing we are using cypress. Cypress is a front end testing tool built for the modern web.The test can be found under /frontend/cypress/integration/e2e.ts. Cypress tests are fast and easy to write with just a few lines of code needed. 
Currently we are testing the different functionality of the application. This includes filtering, searching, looking at products and signing in to comment products.

As described at the beginning the test can be run either with cy:run or cy:open. cy:run will run the tests to see if everything is working, but not showing what is done. With cy:open you get to see what is happening and it helps to see what the tests are doing. 


### Unit Testing
For unit testing we chose to use the react testing library. With this library it encourages us to test the components in the way a user will interact with it. 
React testing library also enforces us to write better components, with regards to web accessibility. 
Furthermore, it requires no setup and is already installed with create-react-app.

In our unit tests we test:

* Logo component: <br>
    * Renders correctly <br>
    * Shows correct title of page <br>
    * Handles user interaction of clicking the logo (homebutton) <br>
    * Matches snapshot <br>
* Search component: <br> 
    * Renders correctly <br> 
    * Handles user interaction of giving search string as input and pressing enter <br> 
* Store actions: <br> 
    * SET_SEARCH_STRING
    * FILTER_MODE
* Detail component: <br>
    * Tests that we render the correct data by mocking graphql queries using a <MockedProvider> <br>
* App: <br> 
    * Matches snapshot <br> 


## Styling
For styling we have used Material-UI’s hook API. This was a natural choice because of our use of Material-UI’s components. 
We have been consistent with our use of styling by only implementing styles from this API, with the exception of App.css for setting colors and font. 
This consistency makes our code easier to read and more structured in contrast to using different styling implementations.For responsive design we used breakpoints with the hook API’s theme. This is similar to CSS media queries. 


## Use of git
During our development we have described tasks usings issues in GitLab.
Every commit was to be on the form “#issuenumber description”, where the issue number corresponds to the issue on GitLab and the description describing what was contributed. 
We developed using branches corresponding to one or more issues. The branches were then merged to master via merge requests, the merge requests were to be accepted by someone else on the team.