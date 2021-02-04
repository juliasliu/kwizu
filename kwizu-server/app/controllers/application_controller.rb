class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :login!, :logged_in?, :current_user, :authorized_user?, :logout!
  
  def login!
    session[:user_id] = @user.id
  end
  def logged_in?
    !!session[:user_id]
  end
  def current_user
    p session[:user_id]
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  def authorized_user?
    @user == current_user
  end
  def logout!
    session.clear
  end
  
  # send push notifications thru REST calls
  def send_notification(notification)
    require 'googleauth'
    require 'httparty'
    require 'json'
    require 'uri'
      
    # Get the environment configured authorization
    scopes =  ['https://www.googleapis.com/auth/cloud-platform',
               'https://www.googleapis.com/auth/compute']
    authorizer = Google::Auth.get_application_default(scopes)
    p authorizer
    
    # Add authorization header to the request
    some_headers = {}
    authorizer.apply!(some_headers)
    some_headers['Content-Type'] = 'application/json'
    p some_headers
    
    some_body = {
            "message" => {
              "token" => notification["token"],
              "notification" => {
                "title" => notification["title"],
                "body" => notification["body"]
              }
            }
          }.to_json
    
    res = HTTParty.post("https://fcm.googleapis.com/v1/projects/kwizu-app/messages:send",
    :body => some_body,
    :headers => some_headers)
  end
end
