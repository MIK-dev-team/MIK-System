# MIK-System [![Build Status](https://www.travis-ci.org/vipeeri/MIK-System.svg?branch=master)](https://www.travis-ci.org/vipeeri/MIK-System)

New system for MIK (Malmin Ilmailukerho) to handle reservation of
aeroplanes, keeping track of flight times for members, handling 
billing and accounting, and managing memberships.

The application is built with Ruby on Rails and React, and is
deployed using Docker.

### Development:
* running app: docker-compose up
* compiling assets: docker-compose run web bin/webpack
* running tests: docker-compose run web rspec spec

If you need to change Dockerfile or Gemfile run docker-compile build
