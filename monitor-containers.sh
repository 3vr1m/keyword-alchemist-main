#!/bin/bash

# Container monitoring script for Keyword Alchemist
# This script checks if containers are running and restarts them if needed

COMPOSE_DIR="/opt/keyword-alchemist-main"
LOG_FILE="/var/log/keyword-alchemist-monitor.log"
CONTAINERS=("keyword-alchemist-frontend" "keyword-alchemist-backend")

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

check_and_restart_containers() {
    cd "$COMPOSE_DIR" || {
        log_message "ERROR: Cannot access $COMPOSE_DIR"
        exit 1
    }
    
    # Check if docker-compose services are running
    RUNNING_CONTAINERS=$(docker compose ps --format json | jq -r 'select(.State == "running") | .Name')
    
    for container in "${CONTAINERS[@]}"; do
        if ! echo "$RUNNING_CONTAINERS" | grep -q "$container"; then
            log_message "WARNING: Container $container is not running. Attempting to restart..."
            
            # Try to restart the specific service
            docker compose up -d "$container" 2>&1 | tee -a "$LOG_FILE"
            
            # Wait and check again
            sleep 10
            if docker compose ps "$container" --format json | jq -r '.State' | grep -q "running"; then
                log_message "SUCCESS: Container $container restarted successfully"
            else
                log_message "ERROR: Failed to restart container $container"
                # Try full restart as last resort
                docker compose down && docker compose up -d
            fi
        fi
    done
}

# Check if ports are accessible
check_ports() {
    if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ | grep -q "200"; then
        log_message "WARNING: Port 3001 not responding, restarting frontend..."
        docker compose restart frontend
    fi
    
    if ! curl -s -o /dev/null -w "%{http_code}" http://localhost:3002/api/health | grep -q "200"; then
        log_message "WARNING: Port 3002 not responding, restarting backend..."
        docker compose restart backend
    fi
}

main() {
    log_message "Starting container health check..."
    check_and_restart_containers
    check_ports
    log_message "Health check completed"
}

main "$@"
