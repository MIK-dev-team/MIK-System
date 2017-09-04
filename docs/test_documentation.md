# Testing of the application
## What technologies were used to test the application
The application is tested in two distinct ways. Front-end and back-end tests are 
implemented with different technologies. Front-end tests are done with the Jest
testing-framework and complemented with the utility Enzyme for easier testing of
React-components. Back-end tests, as well as UI-tests, are done with RSpec.
For UI-tests we have RSpec use Capybara.

## Testing methodology
Most of the codebase is JS, so most of the tests are also for JS. There is not much integration in the front-end tests. The idea
was to unit-test the front-end code well and handle integration testing with Capybara on the back-end. This way the whole testing
suite remains relatively simple. 
### Front-end tests
Front-end tests are in the ```__tests__``` directory. They include unit tests for React-components, redux-reducer tests,
redux-action-dispatcher tests and seperate logic tests. 

### Backend-tests
Models and services are unit tested. Since we have an API that only serves JSON, we have requests specs that cover that API. 
There's very little business logic on the backend at this moment, since most of it is covered by models (through validation etc).
The little logic there is, is thoroughly tested (mainly the availability notifier). Rest of the back-end tests are UI-tests,
implemented using Capybara. 
