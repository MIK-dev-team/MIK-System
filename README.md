# MIK-System [![Build Status](https://www.travis-ci.org/MIK-dev-team/MIK-System.svg?branch=master)](https://www.travis-ci.org/Owlaukka/MIK-System)

New system for MIK (Malmin Ilmailukerho) to handle reservation of
aeroplanes, keeping track of flight times for members, handling 
billing and accounting, and managing memberships.

The application is built with Ruby on Rails and React, and is
deployed using Docker.

### Development:
* running app: docker-compose up
* running tests: docker-compose run web rspec spec
* running react tests: docker-compose run web yarn test

If you need to change Dockerfile or Gemfile run docker-compile build

Detailed development instructions can be found in the ```Docs```

### Previous backlog: https://tree.taiga.io/project/owlaukka-mik-system/backlog
