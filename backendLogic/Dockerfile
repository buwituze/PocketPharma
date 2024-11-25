# Use Node.js LTS version
FROM node:18


# Set environment to production
ENV NODE_ENV=production


# Set working directory
WORKDIR /app


# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --only=production


# Copy the rest of the app
COPY . .


# Build TypeScript code
RUN npm run build


# Expose the app's port
EXPOSE 4000


# Start the application
CMD ["npm", "run", "start"]