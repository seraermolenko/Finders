**TO SEE OUR PROJECT PLEASE VISIT [SFUFINDERS.COM](https://sfufinders.com/)**

**HERE IS A DEMO OF OUR ITERATION 2 [DEMO](https://youtu.be/lIsFlJB11_0)**

**Worked on this project with 3 other students: Sera Ermolenko, Alex Simpson, and Jason Jang.**
<img width="1297" alt="image" src="https://github.com/user-attachments/assets/6f91308e-10f4-42dd-b42d-aceda70cfac9">

# Description
Finders is a platform designed to help students at find team members for class projects, hackathons, and personal initiatives. Whether it’s forming a group for a course, or seeking contributors for a passion project, Finders bridges the gap between students with complementary skill sets.

Many students face challenges when pursuing projects because they lack the necessary skills or time to expand into new areas. At the same time, there are students with valuable skills who struggle to find projects where they can apply their expertise. Instead of relying on immediate peers to form teams, Finders offers a more optimized solution.

By providing a job-search-like experience, similar to a job board, Finders allows students to post project descriptions, list required skills, and connect with peers who have matching strengths. Features such as skill tagging, project sorting by relevance, and a rating system for potential collaborators make it easy to build effective teams and ensure project success.

Finders helps students find the missing piece to their project, making collaboration more accessible and successful.

# Iteration 2
### Reflection on progress for Iteration 2
## Front End
#### What went well
In this iteration, the front-end team focused on working on creating a better user interface and adding features related to logging in and user authentication. It allowed us to add the feature for a user to delete their own post and for posts to be identified by the user that posted them. In addition, this feature will allow us to build new features related to comment sections and potentially adding contact information for users creating project postings. We also worked on using React navigation so that the user can switch between signin/ signup screens and home/upload screens to improve user-experience.

#### What went wrong
We started of this itereation with refactoring the code and split the code into different "screens" which were switch between by React navigation. However, the upload feature broke after this refactoring and it took some time to isolate the underlying error. It was quite difficult to debug and we had to put lots of console.log() calls throughout our codebase. Moreover, with multiple js files representing the different screens created more modular code, this also presented difficulties. If we made a change in one of the files, this often affected multiple other files and so every code change was coupled with an extensive debugging session.

#### Things to improve
As currently implemented, only logged in users can see postings, in the future, we would like to allow users to view all project postings without being logged in, while preventing them from being able to upload their own. We plan to introduce a search functionality that allows users to search for other users by their usernames, making it easier to connect and interact within the platform. Additionally, we aim to create a dedicated profile screen where users can view and edit their personal information, manage their posts, and see their activity history. Lastly, we would like to add tags that indicate the technologies required to apply for a specific posting and add this to the search. We also need to add popups when the user types in the wrong password.

### Iteration 2 Testing
First, we need to install a package for async-storage by running the following command in the below.
```
npx expo install @react-native-async-storage/async-storage
```
Next we build the React front-end locally as we did for iteration 1:

##### 1.Download Node.js
In order to run Front end locally, Node.js has to be installed on computer
https://nodejs.org/en/download/package-manager
-**Check Node.js is installed in the machine**
Run following command in order to check Node.js has been installed
```bash
  node -v
  ```
 ##### 2. 
 Change directory into Finders Folders inside Finders, and use following command to download latest version npm, then running npm install will install the required packages to run the React Dev Environment
 ```bash
 cd Finders
 npm install -g npm
 npm install
 ```
 It allows us to open the dev envrionment on web
 ##### 3. Running on Web
 ```bash
 npx expo start
 ```
 - **Description** Run dev environment and get ready to run on web
 - **Success**: Starting Metro Bundler
 - **Open Web**: Press w to open Dev Environment in web
 - **Example**
 ```bash
 npx expo start
 Starting Metro Bundler
 › Metro waiting on exp://207.23.217.217:8082
 .
 .
 Logs for your porject will apear below.
 w <- PRESS W TO OPEN THE APP ON WEB
 › Open in the web browser...
```

## Back End
#### What went well
In this iteration, we successfully focused on expanding the backend by implementing user authentication features. Specifically: Login and Signup endpoints and post management with user association. Additionally, we adjusted the delete post to be user specifc. This means another user cannot delete someone-elses post. 
- Our endpoints are well-organized and follow RESTful practices.
- The model integirty of the CustomUser and Posting models upheld as new features were added. 
- We expanded our range of corner case unit testing, including duplicate registration and invalid login.

#### What went wrong
WOAuth2 Authentication: We originally intended to implement OAuth2 for secure authentication but ended up using basic username-password login. this was becuse it is considered standard practice in the industry and would have been a nice-to-have. However, we found that OAuth2 is more complex to set up, requiring additional components like authorization servers and token management. Given our time constraint, we were unable to do this.

#### Retrospective
In the last iteration, we wanted to improve functionality. We did this by creating more API end points and expanding the useability of our website. This issue is still in the works but has noteably improved. 

#### Things to improve
We would like to improve our unit testing. Specifically: corner cases and tests for each functionality. Also, having a CDCD workflow/implementing Gtihub Actions is on our radar to help catch broken code as we develop. Next we also want to improve our error messages by returning more detailed feedback (e.g., specific field errors during registration) instead of generic messages.
 
####  New features added
##### 1. Register a New User

- **Endpoint:** `POST /register/`  
- **Description:** Creates a new user account. Returns the user ID on success.
- **URL Parameters**: None
- **Request Body**:
	- `username` (string): The user’s username.
	- `password` (string): The user’s password.
- **Response:**
	- **Success:** `{ "id": 1 }`, 201 Created
	- **Failure:** `"User already exists"`, 400 BAD REQUEST

Example:
```
POST /register/
Body: { "username": "example_user", "password": "password123" }
Response: { "id": 1 }
```

##### 2. Login User

- **Endpoint:** `POST /login/`  
- **Description:** Authenticates a user and returns their user ID on success.
- **URL Parameters**: None
- **Request Body**:
	-  `username` (string): The user’s username.
	- `password` (string): The user’s password.
- **Response:**
	- **Success:** `{ "id": 1 }`, 200 OK
	 - **Failure:** `"Invalid username or password"`, 400 BAD REQUEST

Example:
```
POST /login/
Body: { "username": "example_user", "password": "password123" }
Response: { "id": 1 }
```

##### 3. Delete a Posting
- **Endpoint**: `DELETE /users/<int:id>/postings/<int:postID>`
- **Description**: Deletes a specific post based on its ID. Returns status code `200` on success.
- **URL Parameters**:
  - `id` (int): The user's ID.
  - `postID` (int): The post's ID.
- **Response**:
  - **Success**: `Posting deleted`, `200 OK`
  - **Failure**: `404 NOT FOUND`
- **Example**:
    ```bash
    DELETE /users/1/postings/45
    Response: Posting deleted, 200 OK
    ```
### Iteration 2 Testing
This iteration we added on to our implementation of unit tests for our two Django models, CustomUser and Posting alongside API end point tests. These tests validate various behaviors of the models and the associated API functionality. Specifcally, the added on tests validate the login and signup features, aswell as the user-specific delete posting feature. 
We used Django's TestCase class for testing which allows us to re-set the database each test. The setup() method initializes an instance of APIClient which simulates an HTTP request in a test envoirment. This allows us to test API endpoints without using front-end, postman or a server. Using setup() we created CustomUser and Posting objectes. Assertions were used to compare the actual results with the expected results for these tests.

### 1. test_login_user()
- Simulates user login by sending a POST request to the login API endpoint.
- Uses the reverse() method to generate the URL for the login view.
- Sends valid credentials (username and password) in the request payload.
- Verifies that the API responds with a 200 (OK) status code and returns the user's ID.

### 2. test_login_invalid_credentials()
- Tests the behavior when incorrect login credentials are provided.
- Sends a POST request to the `login` API endpoint with an invalid password.
- Verifies that the response contains a 400 (Bad Request) status code and returns the appropriate error message ('Invalid username or password').

### 3. test_register_user()
- Simulates user registration by sending a POST request to the `register` API endpoint.
- Uses the `reverse()` method to generate the URL for the `register` view.
- Sends a sample payload with user details (username, password, bio, school, etc.).
- Verifies that the response contains a 201 (Created) status code and returns the user's ID.

### 4. test_register_duplicate_user()
- Tests the behavior when attempting to register with a username that already exists.
- Sends a POST request to the `register` API endpoint with a duplicate username.
- Verifies that the response contains a 400 (Bad Request) status code and returns the appropriate error message ('User already exists').

### 5. test_delete_post()
- Simulates deleting a post by making a DELETE request to the delete_post API endpoint.
- Uses reverse() method to generate the correct URL, passing in both the user’s ID and the post’s ID.
- Ensures the post is successfully deleted by checking for a 200 status code and verifying the response message (Post deleted).


# Iteration 1
### Reflection on progress for Iteration 1
## Front End
#### What went well
The front-end team started off with zero react experience. Within week 1, we successfully completed a React Expo tutorial to create an example React app. In week 2, we started to create our own running app. We added a box that allows the user to input a description of the project for which they are searching for teammates. This came with the challenge of figuring out how to create our own React components, such as a button that submits the posting to our back-end database. At this point in time, the back-end team had not yet created a version of our back-end that was ready to be used in a test setting (running the back-end on localhost). In the meantime, we successfully created a "fake api call" which simply added the posting description to an array of postings. This allowed us to continue developing without being blocked by the backend. In our third week of working on the project, we refined some of our features such as adding a scroll bar to be able to see a long list of posts. In this week we also successfully deployed this version of the front-end using Netlify.

#### What went wrong
Both members of the front-end team were new to React. As a result, a lot of time was spent researching how to do small simple tasks, which greatly limitted our throughput. In addition, we struggled to write quality code and our solutions to our problems were very hacky. This will result in us needing to refactor much of the front-end before iteration 2. To add more colour to these struggles, we had particular difficulty with a Button component, which needed to be able to post a new posting to the back-end and also to be able to perform other functionalities. In its current state, the button takes in far too many inputs many of which are useless to whatever it is being used for. Refactoring the Button will be a significant task before Iteration 2, while providing no extra value to the user.

#### Things to improve
Due to the short amount of time between the start of this project and iteration 1, our code is not the best formatted. We have some work to do in order to refactor our code in order to make it more modular and readable. This will ease future development and should prevent us from running into bugs. In addition, we learned along the way that reading React documentation is the best place to learn how to use certain functional components provided by React. By fully understanding our code, we will be able to code at higher efficiency and at a higher standard.

### Iteration 1 Testing
**Click create post**
![image](https://media.github.sfu.ca/user/2510/files/985cd014-7481-4613-b729-1270ea34d516)
**Type a title and a description**
![image](https://media.github.sfu.ca/user/2510/files/b174837e-0179-43b6-8d8e-768a1f6674e5)
**Refresh page manually**
![image](https://media.github.sfu.ca/user/2510/files/04b26b2a-5ac1-4996-be38-7bf8aec536e8)



#### Prerequisites
##### 1.Download Node.js
In order to run Front end locally, Node.js has to be installed on computer
https://nodejs.org/en/download/package-manager
-**Check Node.js is installed in the machine**
Run following command in order to check Node.js has been installed
```bash
  node -v
  ```
 ##### 2. 
 Change directory into Finders Folders inside Finders, and use following command to download latest version npm, then running npm install will install the required packages to run the React Dev Environment
 ```bash
 cd Finders
 npm install -g npm
 npm install
 ```
 It allows us to open the dev envrionment on web
 ##### 3. Running on Web
 ```bash
 npx expo start
 ```
 - **Description** Run dev environment and get ready to run on web
 - **Success**: Starting Metro Bundler
 - **Open Web**: Press w to open Dev Environment in web
 - **Example**
 ```bash
 npx expo start
 Starting Metro Bundler
 › Metro waiting on exp://207.23.217.217:8082
 .
 .
 Logs for your porject will apear below.
 w
 › Open in the web browser...
```
## Back End
### Reflection on progress for Iteration 1
#### What went well
Backend team was able to set up a REST API for the Frontend to interact with. These functionalities are comprised of POST, GET, and DELETE functions. The specific endpoints include viewing all postings, deleting individual posting, and uploading a posting. The Backend, along with the Postgres Database, was containerized for easy deployment. Hosted on our personal home server as two containers and directing traffic through a Cloudflare tunnel. The base URL is: http://finders.sodavault.co/api/v1 ... followed by the specific endpoint.

#### What went wrong
We tried creating a deployment pipeline with GitHub Actions but due to the enterprise nature of SFU's GitHub, we were not able to complete this pipeline as no workers were availble to execute our script. We're looking at automating a pipeline to pull this repo from GitHub Enterprise to regular GitHub that will then deploy to a server. 

#### Things to improve
We would like to improve API functionality but adding more endpoints, and improve error handling by covering more corner cases. We could also expand the database schema for more versatility. Currently we don't have a way of authenticating users which is something we will be implementing in iteration 2.

### Iteration 1 Testing (Please add screenshots of tests and results and add descriptions of each test)

### Documentation for Running the Development Environment

#### Prerequisites

Before you can run the backend for this repository, make sure you have the following prerequisites installed on your development machine:

1. **Python**: Ensure you have Python 3.x installed. You can download it from [python.org](https://www.python.org/downloads/).

2. **pip**: This is the Python package installer and is typically included with Python. You can verify it's installed by running `pip --version` in your terminal.

3. **Virtual Environment**: It's a good practice to use a virtual environment to manage your project's dependencies. You can use `venv` which is included with Python.

4. **Clone the Repository**: You will need to clone this repository to your local machine.

#### Setting Up the Backend for the Repository

Follow these steps to run the backend:

1. **Clone the Repository**:
   Open your terminal and clone the repository:

   ```bash
   git clone https://github.sfu.ca/sea42/Finders.git
   ```

   Navigate into the cloned repository:

   ```bash
   cd Finders/FindersBackend
   ```

2. **Create a Virtual Environment**:
   Set up a virtual environment to isolate your project dependencies. Run the following command:

   ```bash
   python3 -m venv env
   ```

   Activate the virtual environment.

   - On Windows:

     ```bash
     .\env\Scripts\activate
     ```

   - On macOS and Linux:

     ```bash
     source env/bin/activate
     ```

3. **Install Project Dependencies**:
   With your virtual environment activated, install the required dependencies listed in `requirements.txt`:

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations**:
   Prepare the database by applying migrations:

   ```bash
   python manage.py migrate
   ```

5. **Run the Development Server**:
   Start the development server to run the backend:

   ```bash
   python manage.py runserver
   ```

   You should see output indicating that the server is running at `http://127.0.0.1:8000/`. Access this URL to test that the backend is operational.

#### Additional Tips

- **Deactivating the Virtual Environment**: When you are done working on the backend, you can deactivate the virtual environment by typing:

  ```bash
  deactivate
  ```
#### Important Note

Please note that you will not be able to successfully run this backend without the proper `.env` file and a backup of the database. Ensure you have these files and configurations available as needed to execute the backend environment properly.

### Documentation

#### API Documentation

##### 1. Create a New Posting
- **Endpoint**: `POST /users/<int:id>/postings`
- **Description**: Uploads a new posting to the database. Returns status code `201` on success.
- **URL Parameters**:
  - `id` (int): The user's ID.
- **Request Body**:
  - `title` (string): Title of the posting.
  - `content` (string): Content of the posting.
- **Response**:
  - **Success**: `Posting uploaded`, `201 Created`
  - **Failure**: `Title or content cannot be empty`, `400 BAD REQUEST`
- **Example**:
    ```bash
    POST /users/1/postings
    Body: { "title": "New Post", "content": "This is the content of the post." }
    Response: Posting uploaded, 201 Created
    ```

##### 2. Delete a Posting
- **Endpoint**: `DELETE /users/<int:id>/postings/<int:postID>`
- **Description**: Deletes a specific post based on its ID. Returns status code `200` on success.
- **URL Parameters**:
  - `id` (int): The user's ID.
  - `postID` (int): The post's ID.
- **Response**:
  - **Success**: `Posting deleted`, `200 OK`
  - **Failure**: `404 NOT FOUND`
- **Example**:
    ```bash
    DELETE /users/1/postings/45
    Response: Posting deleted, 200 OK
    ```

##### 3. Get All Postings
- **Endpoint**: `GET /postings`
- **Description**: Retrieves all postings from the database. Serialized fields include `['id', 'title', 'content', 'date_posted']`. Returns status code `200` on success.
- **Response**:
  - **Success**: `<Serialized Data>`, `200 OK`
  - **Failure**: `No posting found`, `404 NOT FOUND`
- **Example**:
    ```bash
    GET /postings
    Body: [
      {
        "id": 1,
        "title": "Post 1",
        "content": "Content of post 1",
        "date_posted": "2024-10-06T18:05:14.261947Z"
      },
      {
        "id": 2,
        "title": "Post 2",
        "content": "Content of post 2",
        "date_posted": "2024-10-06T18:58:13.231947Z"
      }
    ]
    Response: 200 OK
    ```

### Database Schema Documentation 
When making our relational database in models.py we started with including two tables. One was a "custom user" table used for storing information about each personal user. The other is a 'postings' table for storing content/post. 
The relationship between the two: A users primary key serves as the foreign key for the postings table. 


### Documentation for Running the Development Environment
Run Tests 
```
python3 manage.py test
```

Explanation: 
Currently we have implemented unit tests for our two Django models, CustomUser and Posting alongside API end point tests. These tests validate various behaviors of the models and the associated API functionality. We used Django's TestCase class for testing which allows us to re-set the database each test. The setup() method initializes an instance of APIClient whiich simulates an HTTP request in a test envoirment. This allows us to test API endpoints without using front-end, postman or a server. Using setup() we created CustomUser and Posting objectes. Assertions were used to compare the actual results with the expeted results for these tests.

### 1. test_model_CustomUser()

- Checks that the CustomUser model is properly set up and contains the expected attributes. 
- self.assertEqual is used to compare the values in the database with the expected values, (bio, school, ext)


### 2. test_model_Posting()

- Checks that the Costing model is properly set up and contains the expected attributes. 
- self.assertEqual is used to compare the values in the database with the expected values (title, content, ext).

### 3. test_post_upload()

- Simulates uploading a new post by making a POST request to the upload_post API endpoint. 
- reverse() method is used to generate the URL for the upload_post view with the custom_user.id
- Sends a sample post payload (title, content) to the endpoint.
- The test verifies that the API responds with a 201 (Created) status code and the correct response message (Post uploaded)

### 4. test_get_all_postings()

- Sends a GET request to the get_all_postings API endpoint, which returns all posts.
- Checks for a 200 (OK) status code.
- Asserts that the response contains exactly 1 post (the one created in the setUp method) and verifies the title field of the post.

