# install these npm package for the database
- npm i sequelize
- npm i mysql2
- npm i sequelize-cli

# go inside the `src` folder and execute the following command:
    ```
      npx sequelize init
    ```
 - By executing the above command you will get migrations and seeders folder along with a config.json inside the config folder. 
 - If you're setting up your development environment, then write the username of your db, password of your db and in dialect mention whatever db you are using for ex: mysql, mariadb etc
 - If you're setting up test or prod environment, make sure you also replace the host with the hosted db url.




to create the table and db using cli
# Creating the Model/Table-->run these commands going inside the src folder

1. npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string 
--> it just creates the model and migration file,similar to the git add

2. whatever changes wants to make ,this is the high time to do that
    model file add js level constraints
    migration file add database level constraints

3. To run the migration /similar to git commit 
    npx sequelize-cli db:migrate 


# to do basic crud with the tables use sequelize inside repositories layer
https://sequelize.org/docs/v6/core-concepts/model-basics/

