# Sanctuary
User-curated therapeutic spaces on your mobile device




Sai Vemireddy

## Spaces


**User Spaces**



<details><summary>Details</summary>
<p>

* Renders links to spaces the user has created and joined.
* Used Dimensions ‘react-native’ object to incorporate window-width into styling.
* Used RefreshControl to refetch spaces from the database.



</p>
</details>


### Space



<details><summary>Admin View</summary>

* Edit Modal: allows user to edit space description and guidelines
- Members Tab: shows members that have joined the space and provides objective information about user presence.
  - Number of Confessions the user made
  - Number of times the user has reported another user.
  - Number of times the user has been reported by another user.
- Member Ban: Admin can ban members, and remove all of the members comments and confessions from the space and prevent the member from rejoining the space.

</details>

<details><summary>General User View</summary>

- Leave/Join: users can leave and join spaces. Joining a space updates home feed with confessions from joined space and allows space to be more easily accessible from **Spaces**
- Write Confession Modal: Users can create confessions.
- Feed Tab: renders confession module with a refresh control to refetch confessions from the database.

</details>

