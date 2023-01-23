



# Sanctuary

“Find your sanctuary, speak your truth”
## Introduction


Sanctuary is a mobile social media application featuring user-curated discussion spaces designed to calm the mind and encourage community support. Sanctuary is highly scalable, originally designed for a mental health counseling practice wishing to expand its online presence and serve its clients online, but is open to the general public and is capable of supporting a large number of simultaneous users.


## Technologies Used


This application is written in JavaScript and uses:
* React Native
* Expo Go
* Node
* Firebase
* Axios

## Authentication

	
The authentication component verifies new and existing users. Any user may
* Create a new account with their email and password
* Choose their own account username and icon
* Log into an existing account
* Reset their password from the login screen

	
## Home Page



## Confessions



## Comments

Comments display the username, the message, how long ago it was posted, an options button that slides up a modal with additional features such as reporting, and the current vote count with the option to upvote or downvote a comment.

* Utilized lazy loading with Flat List to improve app performance and increase comment load times



## Navigation



## Spaces

**User Spaces List**

<details><summary>Details</summary>
  
- Renders links to spaces the user has created and joined.
- Used Dimensions object to incorporate window-width into styling.
- Used RefreshControl to refetch spaces from the database.

</details>

### Space

<details><summary>Admin View</summary>
  
- Edit Modal: allows user to change space description and guidelines
- Members Tab: allows user to view list of users who've joined the space with member presence information
  - Number of confessions the user made in the space
  - Number of times the user was reported by another user
  - Number of times the user reported another user
- Member Ban: Admin can ban members, and remove all of the user's comments and confessions from the space and prevent the banned user from accessing the space.
</details>

<details><summary>General User View</summary>
  
- Leave/Join: Users can leave and join spaces. Joining a space updates user’s home feed with confessions from the space and makes space more easily accessible in the Spaces Tab Screen
- Write Confession Modal: Users can create confessions.
- Feed Tab: renders confession module with a refresh control to refetch confessions from the database.

</details>


## Profile 


Below highlights the features of each page under Profile.

**Profile Page**
* Ability to view account details (eg username, avatar)
* Ability to view spaces the user has joined or created
  * If the user is viewing Joined Spaces, they will be able to see which spaces they are an admin for
  * Names for each space will be shown, alongside the corresponding number of members in each space
  * Users may also go directly to view the space by clicking on “View Space”
* Ability to search through the spaces listed under “Joined” or “Created” spaces⋅⋅⋅
  * This becomes sticky so that users can easily access search while browsing spaces on the profile page.
* Ability to log out of the account
* Ability to see unread notifications and access their notifications page⋅⋅

**Notifications**
* Ability to view the following types of notifications:
  * When the current user’s comment or confession has been reported by another user
  * When a comment or confession has been reported by a user within a space of which the current user is an admin of
* Ability to view the corresponding comments/confessions
* Ability to ban the member from the corresponding space from which the comment or confession was reported
  * Banning a user will remove the corresponding user’s comments/confessions from the corresponding space
  * The banned user will no longer be able to access the corresponding space via search or their spaces lists on the profile page


## Account Management


The account management component enables users to manage their existing account. Any user may
* Update their password after submitting their old password
* Change their user icon

## Installation


1. Install packages using the following command

	`npm install`
	
2. Initialize the application

	`npm start`

3. Download the mobile application Expo Go
	
4. Open application by scanning the given QR code from your phone


## Team


* **Max Peterson - Product Manager**
  * https://github.com/maxpeterson96
  * https://www.linkedin.com/in/maxpeterson-swe
* **Chad Fusco - Architecture Owner**
  * https://www.linkedin.com/in/chadfusco
  * https://github.com/ChadFusco
* **Joseph Soto - UI Owner**
* **Kimberly Cheung**
  * https://www.linkedin.com/in/kimberlywycheung
  * https://github.com/kimberlywycheung
* **Warren Siu**
  * https://www.linkedin.com/in/warrensiu
  * https://github.com/warrensiu
* **Sai Vemireddy**
  * https://github.com/svemi
  * https://www.linkedin.com/in/sai-vemireddy
* **Justin Chong**
