# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Set build-time environment variables
ARG REACT_APP_GEMINI_API_KEY
ARG REACT_APP_API_URL
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY

ENV REACT_APP_GEMINI_API_KEY=$REACT_APP_GEMINI_API_KEY
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built app to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
