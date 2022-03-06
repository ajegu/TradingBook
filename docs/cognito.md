# Cognito

App client: TradingBook-Dashboard
App client ID: 3ll2a3dn9m921jupk6l5mrud5m
Url: https://local-tradingbook.auth.eu-west-3.amazoncognito.com

Blank URL:

authorization code grant   
https://local-tradingbook.auth.eu-west-3.amazoncognito.com/login?response_type=code&client_id=3ll2a3dn9m921jupk6l5mrud5m&redirect_uri=http://localhost:3000/

JSON web token (JWT)   
https://local-tradingbook.auth.eu-west-3.amazoncognito.com/login?response_type=token&client_id=3ll2a3dn9m921jupk6l5mrud5m&redirect_uri=http://localhost:3000/


Private key
https://cognito-idp.eu-west-3.amazonaws.com/eu-west-3_BTXTBYEgg/.well-known/jwks.json

Verify token   
https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt

Blank example   
http://localhost:3000/?#id_token=eyJraWQiOiJkaXRLV0JWbkM2cVRraTJSREZ6V3ZBZG9hUldyMHZtNXljQ2wxNVFkcW1VPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiYUhLb3lpWGp3YU9yU0VsbDdqb0xWZyIsInN1YiI6IjYxZGQ1NzQ4LWE4OTYtNDU4Ni05YjA4LTQ0ZTA2YzU3YjJiMiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0zLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtM19CVFhUQllFZ2ciLCJjb2duaXRvOnVzZXJuYW1lIjoiNjFkZDU3NDgtYTg5Ni00NTg2LTliMDgtNDRlMDZjNTdiMmIyIiwiYXVkIjoiM2xsMmEzZG45bTkyMWp1cGs2bDVtcnVkNW0iLCJldmVudF9pZCI6IjlkOWFhZGNmLWZlNDMtNDkyYy05ZDhiLWRkN2NjYWVlYzk1NCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjQ2NTY5NzE0LCJuYW1lIjoiQWxsYW4iLCJleHAiOjE2NDY1NzMzMTQsImlhdCI6MTY0NjU2OTcxNCwiZmFtaWx5X25hbWUiOiJKRUdVIiwianRpIjoiNGU5NzY1ZDctZTQwMC00YmZiLWJiNDgtZjY5NDcwYjkxMmNkIiwiZW1haWwiOiJhbGxhbmplZ3UrbG9jYWwtdHJhZGluZ2Jvb2tAZ21haWwuY29tIn0.jlN6p2nSuNyiI3dWNi7kZMAofhVLRUGR7jDCHjUx2uywMButsAUZGIHDiiV1CCwAa7vNr-IUPr3J022q9I_yJ3cCSwlGtVDhKJpZ45gRamJe5Aj5wZ_7_YwiYLS3RIBprluX4XSJEJZX2wabIPilg1GBydIXkJrbrIvP_H6Tz4ysmVPPzjxHZORcbSpZoXHS7V8UoLZn2I22uDVWsD0UlxXUsGrlp49gQTKIXZEmDUP-OmjAm8HvRVlGm6_n79CftwB4jb435jnrUKqWrxJTg3lmwIdzRBpdcyz-LRnlDOUkFoJ_vhdpsrR9fCGKw0rigEUneCeBN4brIVa1gQB4_A&access_token=eyJraWQiOiJYVXpoa2J4SkZrNFwvSndaTEwrVTlVdThGSTBMUHA3dWRDY2hSajUxdUtcL1E9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI2MWRkNTc0OC1hODk2LTQ1ODYtOWIwOC00NGUwNmM1N2IyYjIiLCJldmVudF9pZCI6IjlkOWFhZGNmLWZlNDMtNDkyYy05ZDhiLWRkN2NjYWVlYzk1NCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4gcGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NDY1Njk3MTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTMuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0zX0JUWFRCWUVnZyIsImV4cCI6MTY0NjU3MzMxNCwiaWF0IjoxNjQ2NTY5NzE0LCJ2ZXJzaW9uIjoyLCJqdGkiOiI2ZjI1YzJiMC1jZjBjLTQxOGMtOWZkYS02OWNmNGZhYWNhYzciLCJjbGllbnRfaWQiOiIzbGwyYTNkbjltOTIxanVwazZsNW1ydWQ1bSIsInVzZXJuYW1lIjoiNjFkZDU3NDgtYTg5Ni00NTg2LTliMDgtNDRlMDZjNTdiMmIyIn0.L_28EM7pNcaHkLDNMqckfZi9vswZjQh3-F7uXh7s-HxdSpVsup8zM5SBq5cEYJs5Dny0FYtw-lApsDQIJJJkyuk6J7TCiyvaT_L8l4q-Tr6wUAruVkK0l3e_uSkTOhs2bPpDABYBgdJjWgat7lkJYrzmEuRZo90_tnRGc7mJdvL8cafGLEmJEU8r3L0oSQtCzcRRhWVnnfUJ9zNZu8Q7KjDzKcq3U_jscCKPEBJb26g-d4OPPHS5Xd1RF3G69UPtaPyvLhttwPbMSmt868b6QZ3JkgtILxjsBRJ3_V7KCmmaKwejFgMpVsnoD0l8kxBl7em677Iyy1aehvenqaBYjw&expires_in=3600&token_type=Bearer