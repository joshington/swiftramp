

## =====azure dev  instructions =====

## create new branch from within azure

## clone the repo from azure and aswell take not of your git credentials coz you will use 
## them when pushing your commit


## ===to ease development and configure 
## kindly use the Dockerfile.dev file in the master branch that i added 
## == run this docker command to install everything in development
##  1 - Build the docker image; =>  docker build -f Dockerfile.dev -t swiftramp:dev .
##      -f Dockerfile.dev: Specifies the Dockerfile to use (in this case, Dockerfile.dev).

##      -t swiftramp:dev: Tags the image with a name (my-nextjs-app) and a tag (dev).

##      .: The build context (current directory).

##   2  - Run the Docker Container  => docker run -p 3000:3000 swiftramp:dev
##         -p 3000:3000: Maps port 3000 on your local machine to port 3000 in the container (as specified by ##         EXPOSE 3000 in your Dockerfile).
##      -  swiftramp:dev - the name and tag of the image you built

##   3   - Access the Application
##         After running the container, your Next.js development server should start, and you can access the ##         application in your browser at:


