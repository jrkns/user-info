# Use Node
FROM node:argon

# Add everything in the current directory to our image, in the 'app' folder.
ADD . /app


# Install dependencies
RUN cd /app; \ 
	npm install --production --loglevel=error 

# Expose our server port.
EXPOSE 3030

# Run our app.
CMD cd /app; \
	npm start