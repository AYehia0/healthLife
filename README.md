# HealthLife

HealthLife is a simple app to keep track of what you have eaten through out the day.
The application is splitted into two main parts: 
  - The API to fetch data from, (I made it from scratch).
  - The app itself with its own api calls.

### Important 

For now the application is meant to be for educatoional purposes as it lacks some features and not a user friendly.

# Main Features 

- User and Admin application: Users can create an account and track their life, on the other side : Admin can control the database(foodapi).
- The app has 2 main seperated routes (frontend) : ```/user/*``` , ```/admin/*``` , the admin's (backend) is : ```/topSecretRoute```, though it's not secret lol.
- For Users:
  - User can add Food by searching the api.
  - User can update their personal info : name, password, weight, height and age.
  - User can (ofc) login/logout and show added food.
 
- For Admin: 
  - Admin can added food to the db.
  - Admin can add/delete category to the food items.
  - Admin can modify a food item (for now, can only change the name).

# Bugs 

Since the app is still under development it may contain some unhandled bugs.
  - Angular multi interceptors : don't use the admin route along side the user in the same browser session, it's not meant to work like that.
  - Deleting food items from the main db : affects the user, since user meals are just ref to the main db.
  - Some Frontend bad pactices mixed with un-used code : ```[REFACTORING]```

# ScreenShots
![Screenshot](/periodic/ss/user-dashboard.png)
<br/>
![Screenshot](/periodic/ss/admin-dashboard.png)
<br/>
![Screenshot](/periodic/ss/user-register.png)
<br/>
![Screenshot](/periodic/ss/login.png)
<br/>
![Screenshot](/periodic/ss/add-category.png)

# Requirements 

The used tech : 

  - Angular for the frontend.
    - Angular Material : [here](https://material.angular.io/)
  - NodeJs and Express for the backend.
    - ```express```, ```mongoose```, ```jsonwebtoken```, ```validator```, ```cors```, ```bcryptjs```, ```dotenv``` may be more idk.
  - MongoDB for the database.

For Testing :

  - The backend runs on : ```8080``` while the front runs on the default.
  - Have a look at the postman collection i made : [here](/periodic/HealthApp.postman.json)

# ToDo 
  
  - [ ] Code refactoring.
  - [ ] Org the backend routes and normalize the response template.
  - [ ] Fix above bugs.
  - [ ] Change the UI/UX,, it's super ugly.
  - [ ] Keep track of the macronutrients.
  - [ ] Hide the admin route.
  - [ ] Re-structure the angular components and remove dups.
