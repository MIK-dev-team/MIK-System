FROM ruby:2.4.1
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
# yarn
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install nodejs
# Install firefox (aka iceweasel)
RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install -qq -y \
    iceweasel
# install phantomjs - download from https://bitbucket.org/ariya/phantomjs/downloads
ADD https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 .
RUN tar -xjf phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN mv ./phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin
RUN rm -rf ./phantomjs-2.1.1-linux-x86_64
RUN phantomjs --version
## for headless
#RUN apt-get install -y xvfb
## for capybara-webkit
#RUN apt-get install -y libqt4-webkit libqt4-dev
# cleanup repositories
RUN rm -rf /var/lib/apt/lists/*

RUN mkdir /mik-system
WORKDIR /mik-system
ADD Gemfile /mik-system/Gemfile
ADD Gemfile.lock /mik-system/Gemfile.lock
RUN bundle install
RUN yarn
ADD . /mik-system

