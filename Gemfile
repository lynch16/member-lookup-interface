source 'https://rubygems.org'

#Used to push db backups to Google Drive
gem 'google_drive'
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
#required to include active_model_serializers in Learn JS Assessment
gem 'active_model_serializers'
# Use sqlite3 as the database for Active Record - Just used for ActiveRecord initializers. Needs to be removed
gem 'sqlite3'
# Use Puma as the app server
gem 'puma', '~> 3.0'
#simple way to set Cron jobs
gem 'whenever', :require => false
#Simple Socket IO client
gem 'socket.io-client-simple'           # for Socket.IO v1.4.x
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  gem 'pry'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end
#bootstrap
gem 'sass-rails', '~> 5.0'
gem 'bootstrap-sass', '~> 3.3', '>=3.3.6'
gem 'bootstrap-datepicker-rails', '~> 1.6', '>= 1.6.1.1'

gem 'devise'

gem 'nested_form_fields'

#OmniAith Slack Integration
gem 'omniauth'
gem 'omniauth-slack', '~>2.3.0'

#use Paypal IPN
gem 'paypal-ipn', :require => 'paypal'
#Use Mongo DB
gem 'mongoid', '~> 6.0.0'

#for LDAB db
gem 'net-ldap'
gem 'activeldap', :require => 'active_ldap/railtie'
# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
