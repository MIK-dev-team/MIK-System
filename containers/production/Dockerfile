FROM ruby:2.4.1-slim

ENV RAILS_ROOT=/mik-system
ENV RAILS_ENV=production
ENV NODE_ENV=production

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
# yarn
RUN apt-get update && apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && \
    apt-get install nodejs && apt-get purge --auto-remove -y curl && \
    apt-get clean && \
    rm -rf /tmp/* /var/lib/apt/lists/*

RUN mkdir -p $RAILS_ROOT/tmp/pids
WORKDIR $RAILS_ROOT

ADD Gemfile $RAILS_ROOT/Gemfile
ADD Gemfile.lock $RAILS_ROOT/Gemfile.lock
RUN bundle check || bundle install --without development test -j4
ADD . $RAILS_ROOT
RUN DB_ADAPTER=nulldb bundle exec rails assets:precompile RAILS_ENV=production NODE_ENV=production

EXPOSE 3000