#Instructions for developing this project
##Technologies used
This project uses Docker to encapsulate the actual application, so it can be run
on any platform that can run Docker. You will needto install Docker and Docker 
Compose in order to develop and run this application. Inside the Docker 
containers, the application is based on Ruby on Rails and React. Essentially you 
will run all commands inside Docker containers by prepending ```docker-compose```
to every command.

Most of the code in this project is JS. We have used the new ES6-syntax of JS.
The code is transpiled into ES5 on compile-time. This results in React-warnings
about deprecated functions that aren't actually used in the code. React and 
redux are used for this project. This isn't a Single-Page App (SPA), but it has 
some elements of an SPA on certain pages. 

The Rails backend is rather bare. It is separated into an API and a website
section. The website section consists of views and controllers that load and show
React components and on some occasions pass static content from the database to
the components. The API serves the AJAX-requests React makes from the frontend.
It is JSON-only.

React and Rails are integrated with Webpack.

For testing we have used Jest and Enzyme for the front-end, and RSpec and Capybara
for the back-end and UI-testing. Capybara uses the headless Poltergeist-driver, 
which uses PhantomJS.
##Running the development environment
* In the project directory run ```docker-compose up```
    * this will start-up a database container, a container for the app itself and 
    webpack-container, and make them communicate with each other
    * note: the webpack container takes longer get started as it will start-up
    a webpack-dev-server to track changes to the front-end code and recompile the
    front-end code when it detects changes to it, so wait for it to finish
    starting before trying to load the page.
* When you want to shutdown the containers, user ```CTRL-C```
* The startup command will build and fetch the required images to run the app.
You will have to rebuild the created images if you either make changes to a
Dockerfile or if you add a new gem.
    * to rebuild the images, run ```docker-compose build```

##Running tests
* Before running the tests:
    * a test database has to be created and migrated before the RSpec specs 
    will run. If you have started the development environment before already
    with ```docker-compose up```, the database has already been created, but 
    you will still have to migrate the test database with
    ```docker-compose run web rails db:migrate RAILS_ENV=test```
    * front-end assets have to be compiled for the test environment by running
    ```docker-compose run -e "RAILS_ENV=test" web bin/webpack```
    * you have to rerun the above command every time you change the front-end JS 
    code
* For RSpec specs use ```docker-compose run web rake spec```
    * coverage information for RSpec specs is automatically saved to the 
    ```/coverage/``` directory
* For Jest tests (front-end JS tests) user ```docker-compose run web yarn test``` 
    * if you want to test a specific test-file or directory, specify the path
    after the previously mentioned command, like 
    ```docker-compose run web yarn test __tests__/path/to/test```
    * if you want to get test coverage information on Jest-tests, add 
    ```-- --coverage```
    to the previous test command
    * coverage information for Jest-tests is saved in the ```/coverage/react/```
    directory
    
##Production
The production version of this application uses a different image than the 
development version. The production image, for instance, does not contain 
webdriver that UI-tests (using Capybara) need to run. 
###Building a production image
The project has a separate Dockerfile and docker-compose.yml file for production.
To build a production image use 
```docker-compose -f docker-compose.prod.yml build```.
###Production image to a production server
_You don't have to use the following way, but it is the way we did it and it's 
written here as an example_

You can get your docker images to a production or a staging server  by first 
pushing them to a docker registry. We used 
[Docker's own registry](http://hub.docker.com). It's free and it'll host your
images publicly or privately. Once you have your custom images there you can
pull them to your server. On your server you have another docker-compose.yml file,
that contains the production settings for the docker images to work together in
production. There are also two production-only files on the server, that should
not be allowed to get into version control: and ```.env```-file and a 
```init-db.sh```-file that contain production secrets.

When you want to push a new version of the application to production you have to
create a new image of your production build, push it to the registry and pull it
down to the production server. You can pull specific images off of the registry 
with ```docker pull your-docker-hub-nick/repo-name:optional-tags```. When you have
a new version of your image on the server, you should make sure the name of new
image corresponds to the image name used in the ```docker-compose.yml```-file
that's on the server, and then run ```docker-compose up --no-deps --build```.
Remember that this project also uses a custom database image, so you will have to 
pull that as well if you change it.