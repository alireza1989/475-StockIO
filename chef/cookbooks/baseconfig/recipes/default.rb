#Make sure the Apt package lists are up to date, so we're downloading versions that exist.
cookbook_file "apt-sources.list" do
  path "/etc/apt/sources.list"
end
execute 'apt_update' do
  command 'apt-get update'
end

# Base configuration recipe in Chef.
package "wget"
package "ntp"
cookbook_file "ntp.conf" do
  path "/etc/ntp.conf"
end
execute 'ntp_restart' do
  command 'service ntp restart'
end

# Install nginx via apt-get
package "nginx" do
  action :install
end

# Override the default nginx config with the one in our cookbook.
cookbook_file "nginx-default" do
  path "/etc/nginx/sites-available/default"
end
# Reload nginx to pick up new nginx config

service "nginx" do
  action :reload
end

#Add repository so apt-get can install latest Node from NodeSource
execute "add_nodesource_repo" do
  command "curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -"
end
 
# Install node.js
package "nodejs"
 
# NPM install for client and server
execute "npm_install_server" do
  cwd "/home/ubuntu/project/web-app"
  command "npm install"
end

# NPM install for client and server
execute "sqlite" do
  cwd "/home/ubuntu/project/web-app"
  command "npm install sqlite3"
end

# Install postgres
package "postgresql"

# Create postgres user
execute 'pg_user' do
  command 'sudo -u postgres psql -c "CREATE ROLE development LOGIN PASSWORD \'password\';"'
end

# Create database for app
execute 'pg_db' do
  command 'sudo -u postgres psql -c "CREATE DATABASE stockiodb OWNER development;"'
end

# Populate the DB
execute "populate_db" do
  cwd "/home/ubuntu/project/web-app/db"
  command "node populateDb.js"
end

# Add a service file for running the server on startup
cookbook_file "stockio-server.service" do
  path "/etc/systemd/system/stockio-server.service"
end
 
# Start the server 
execute "start_stockio-server" do
  command "sudo systemctl start stockio-server"
end
 
# # Start server on VM startup
execute "startup_stockio-server" do
  command "sudo systemctl enable stockio-server"
end