FROM node:8

ARG appdir=/usr/src/app

# build-essential is a reference for all the packages needed to compile a Debian package
# g++ is GNU C++ Compiler
# openssl, a software library for app that secure commications over computer network
# Cleaning up of the apt cache
# r, remove recursively, f, rm will not ask any confirmation
# /var/lib/apt/lists/ , Storage area for state information for each package resource
RUN apt-get update -qq && apt-get install -y \
      build-essential \
      g++ \
      make \
      python \
      openssl \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# Set the work directory
WORKDIR $appdir

# yarn.lock stores the versions of each dependency to get consistent installs across machines
COPY package.json yarn.lock ./
RUN yarn install

ADD . $appdir

# command that will get executed when running a container
CMD ["yarn", "start"]
