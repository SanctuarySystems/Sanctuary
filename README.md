# Sanctuary
User-curated therapeutic spaces on your mobile device


Sai Vemireddy

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
