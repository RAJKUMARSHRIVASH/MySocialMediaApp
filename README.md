# Social Media App Backend

## API routes of this app are 👎

1. **GET** `api/user/` --> This endpoint allow us to get list of all the users.    `status code : 200`
2. **POST** `api/user/register` --> This endpoint allow users to register.  `status code : 201`
3. **POST** `api/user/login` --> This endpoint allow users to login and getting authorization token.    `status code : 201`
4. **GET** `api/user/:id/friends` --> This endpoint allow users to get all the friends of this user id.    `status code : 200`
5. **POST** `api/user/:id/friends` --> This endpoint allow users to make friend request to the user with that user's id.    `status code : 200`
6. **PATCH** `api/user/:id/friends/:friendid` --> This endpoint allow users to make friend request to the user with that user's id.    `status code : 204`
7. **GET** `api/posts` --> This endpoint allow users to get all the posts.    `status code : 200`
8. **POST** `api/posts` --> This endpoint allow users to create new posts.    `status code : 201`
9. **PATCH** `api/posts/:id` --> This endpoint allow users to update the posts by specific post id.    `status code : 204`
10. **DELETE** `api/posts/:id` --> This endpoint allow users to delete the posts by specific post id.    `status code : 202`
11. **POST** `api/posts/:id/like` --> This endpoint allow users to like the posts by specific post id.    `status code : 201`
12. **POST** `api/posts/:id/comment` --> This endpoint allow users to comment on the post by specific post id.    `status code : 201`
13. **GET** `api/posts/:id` --> This endpoint allow users to comment on the post by specific post id.    `status code : 200`