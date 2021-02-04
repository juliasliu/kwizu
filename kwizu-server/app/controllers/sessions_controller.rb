class SessionsController < ApplicationController
  def create
    # if already logged in before
    if session_params[:id]
      @user = User.find(session_params[:id])
      
      if @user.nil?
        render json: { 
          status: 401,
          errors: ['Sorry, we were unable to login with those credentials. Please try again or sign up.']
        } and return
      end
      # if logging in with Apple
    elsif session_params[:apple_id]
      @user = User.find_by(apple_id: session_params[:apple_id])

      if @user.nil?
        render json: { 
          status: 401,
          errors: ['Sorry, we were unable to login with those credentials. Please try again or sign up.']
        } and return
      end
      # if logging in with Facebook
    elsif session_params[:facebook_id]
      @user = User.find_by(facebook_id: session_params[:facebook_id])

      if @user.nil?
        render json: { 
          status: 401,
          errors: ['Sorry, we were unable to login with those credentials. Please try again or sign up.']
        } and return
      end
    else
      if session_params[:email].nil? or session_params[:email].empty?
        render json: { 
          status: 500,
          errors: ['Please enter your email or username.']
        } and return
      end
      if session_params[:password].nil? or session_params[:password].empty?
        render json: { 
          status: 500,
          errors: ['Please enter your password.']
        } and return
      end

      # otherwise, traditional login with email/username and password
      @user = User.find_by(email: session_params[:email])
      @user ||= User.find_by(username: session_params[:email])

      if @user.nil? || !@user.authenticate(session_params[:password])
        render json: { 
          status: 401,
          errors: ['Sorry, we were unable to login with those credentials. Please try again or sign up.']
        } and return
      end
    end

    # login and return user
    login!
    p current_user
    render json: {
      logged_in: true,
      user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
      { taken_quizzes: { methods: :image_url } }, 
      { friends: { methods: :avatar_url } }, 
      { friends_requested: { methods: :avatar_url } }, 
      { friends_received: { methods: :avatar_url } },
      { chats: { methods: :updated_at_localtime } } ], methods: :avatar_url)
    }
  end
  
  # PUT /apple_token
  def apple_token
    # verify identityToken for apple ID
    userIdentity = params[:user_identity]
    jwt = params[:identity_token]

    p userIdentity
    p jwt

    header_segment = JSON.parse(Base64.decode64(jwt.split(".").first))
    alg = header_segment["alg"]
    kid = header_segment["kid"]

    apple_response = Net::HTTP.get(URI.parse("https://appleid.apple.com/auth/keys"))
    apple_certificate = JSON.parse(apple_response)

    keyHash = ActiveSupport::HashWithIndifferentAccess.new(apple_certificate["keys"].select {|key| key["kid"] == kid}[0])
    jwk = JWT::JWK.import(keyHash)

    token_data = JWT.decode(jwt, jwk.public_key, true, {algorithm: alg})[0]

    p token_data
    
    if token_data.has_key?("sub") && token_data.has_key?("email") && userIdentity == token_data["sub"]
      p "validated."
      # return status "success" and apple_id
      render json: {
        status: :verified
      }
    else
      render json: {
        status: 500,
        errors: ["Your Apple ID could not be verified at this time."]
      } and return
    end
  end
  
  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user.as_json(include: [ { quizzes: { methods: :image_url } }, 
        { taken_quizzes: { methods: :image_url } }, 
        { friends: { methods: :avatar_url } }, 
        { friends_requested: { methods: :avatar_url } }, 
        { friends_received: { methods: :avatar_url } },
        { chats: { methods: :updated_at_localtime } } ], methods: :avatar_url)
      }
    else
      render json: {
        logged_in: false,
        message: 'no such user'
      }
    end
  end
  
  def destroy
    logout!
    render json: {
      status: 200,
      logged_out: true
    }
  end
  
  private
  def session_params
    params.require(:user).permit(:id, :email, :password, :facebook_id, :apple_id)
  end
end