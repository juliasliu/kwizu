class UsersController < ApplicationController
  # GET /users
  def index
    @users = User.all
    if @users
      render json: {
        users: @users.map { |q|
        q.as_json(methods: :avatar_url)
        }
      }
    end
  end

  # GET /users/search/:keyword
  def search
    if params[:keyword]
      @users = User.where('name ILIKE :keyword OR username ILIKE :keyword', keyword: "%#{params[:keyword]}%")
    end
    if @users
      render json: {
        users: @users.map { |q|
        q.as_json(methods: :avatar_url)
        }
      }
    end
  end
  
  # GET /users/1
  def show
    @user = User.find(params[:id])
    if @user
      render json: {
        user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
        { taken_quizzes: { methods: :image_url } }, 
        { friends: { methods: :avatar_url } }, 
        { friends_requested: { methods: :avatar_url } }, 
        { friends_received: { methods: :avatar_url } },
        { chats: { include: :users, methods: :updated_at_localtime } } ], methods: :avatar_url)
      }
    else
      render json: {
        status: 500,
        errors: ['User not found']
      }
    end
  end

  # POST /users
  def create
    @user = User.new(user_params)
    if @user.save
      login!
      render json: {
        status: :created,
        user: @user
      }
    else 
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end
  
  # PUT /users/1
  def update
    @user = User.find_by(id: params[:id])
    unless params[:user][:avatar].nil?
      @user.avatar.attach(io: image_io, filename: file_name)
    end
    if @user.update(user_params)
      render json: {
        status: :updated,
        user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
        { taken_quizzes: { methods: :image_url } }, 
        { friends: { methods: :avatar_url } }, 
        { friends_requested: { methods: :avatar_url } }, 
        { friends_received: { methods: :avatar_url } },
        { chats: { include: :users, methods: :updated_at_localtime } } ], methods: :avatar_url)
      }
    else
      render json: {
        status: 500,
        errors: @user.errors.full_messages
      }
    end
  end
  
  # PUT /users/1/notification_token
  def notification_token
    @user = User.find_by(id: params[:id])
    unless params[:token].nil?
      p params[:token]
      if @user.update(notification_token: params[:token])
        render json: {
          status: :updated,
          user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
          { taken_quizzes: { methods: :image_url } }, 
          { friends: { methods: :avatar_url } }, 
          { friends_requested: { methods: :avatar_url } }, 
          { friends_received: { methods: :avatar_url } },
          { chats: { include: :users, methods: :updated_at_localtime } } ], methods: :avatar_url)
        }
      else
        render json: {
          status: 500,
          errors: @user.errors.full_messages
        }
      end
    end
  end
  
  # PUT /users/1/change_password
  def change_password
    @user = current_user
    if @user.authenticate(params[:old_password])
      if @user.update(password: params[:password])
        render json: {
          status: :updated,
          user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
          { taken_quizzes: { methods: :image_url } }, 
          { friends: { methods: :avatar_url } }, 
          { friends_requested: { methods: :avatar_url } }, 
          { friends_received: { methods: :avatar_url } },
          { chats: { include: :users, methods: :updated_at_localtime } } ], methods: :avatar_url)
        }
      else
        render json: {
          status: 500,
          errors: @user.errors.full_messages
        }
      end
    else
      render json: {
        status: 500,
        errors: ["Your old password is incorrect"]
      }
    end
  end
  
  # PUT /users/1/points
  def points
    @user = User.find_by(id: params[:id])
    unless params[:points].nil?
      newPoints = @user.points + params[:points]
      if @user.update(points: newPoints)
        render json: {
          status: :updated,
          points: newPoints
        }
      else
        render json: {
          status: 500,
          errors: @user.errors.full_messages
        }
      end
    end
  end
  
  # PUT /users/1/facebook_friends
  def facebook_friends
    friends = []
    params[:user_ids].each do |id|
      friends << User.find_by(facebook_id: id)
    end
    render json: {
      friends: friends.map { |q|
      q.as_json(methods: :avatar_url)
      }
    }
  end
  
  # PUT /users/1/connect_facebook
  def connect_facebook
    @user = User.find_by(id: params[:id])
    existing_user = User.find_by(facebook_id: params[:facebook_id])
      
    unless existing_user.nil?
      if existing_user.id != @user.id
        render json: {
          status: 500,
          errors: ["There is already an account connected to this Facebook user"]
        }
      end
    else
      if @user.update(facebook_id: params[:facebook_id])
        render json: {
          status: :updated,
          user: @user.as_json(include: [ { quizzes: { methods: :image_url } }, 
          { taken_quizzes: { methods: :image_url } }, 
          { friends: { methods: :avatar_url } }, 
          { friends_requested: { methods: :avatar_url } }, 
          { friends_received: { methods: :avatar_url } },
          { chats: { include: :users, methods: :updated_at_localtime } } ], methods: :avatar_url)
        }
      else
        render json: {
          status: 500,
          errors: @user.errors.full_messages
        }
      end
    end
  end
  
  # PUT /users/1/send_request
  def send_request
    @user = current_user
    @other_user = User.find_by(id: params[:id])

    @friend_request = FriendRequest.find_by(requestor_id: @user.id, receiver_id: @other_user.id)
    if @friend_request.nil?
      @friend_request = @user.requests_as_requestor.build(requestor_id: @user.id, receiver_id: @other_user.id)
      if @friend_request.save
        if @other_user.notification_token
          send_notification({
            "token" => @other_user.notification_token, 
            "body" => @user.name + " has sent you a friend request"
          })
        end
        
        render json: {
          status: :sent,
          user: @user,
          other_user: @other_user
        }
      else
        render json: {
          status: 500,
          errors: @friend_request.errors.full_messages
        }
      end
    end
  end
  
  # DELETE /users/1/undo_request
  def undo_request
    @user = current_user
    @other_user = User.find_by(id: params[:id])

    @friend_request = FriendRequest.find_by(requestor_id: @user.id, receiver_id: @other_user.id)
    unless @friend_request.nil?
      # remove request from requests_as_receiver
      if @friend_request.destroy
        render json: {
          status: :unsent,
          user: @user,
          other_user: @other_user
        }
      else
        render json: {
          status: 500,
          errors: @friend_request.errors.full_messages
        }
      end
    end
  end
  
  # PUT /users/1/accept_request
  def accept_request
    @user = current_user
    @other_user = User.find_by(id: params[:id])

    @friend_request = FriendRequest.find_by(receiver_id: @user.id, requestor_id: @other_user.id)
    unless @friend_request.nil?
      # remove request from requests_as_receiver
      if @friend_request.destroy
        # add friend to each other
        @user.friends << @other_user
        @other_user.friends << @user
        if @user.save and @other_user.save
          if @other_user.notification_token
            send_notification({
              "token" => @other_user.notification_token, 
              "body" =>  @user.name + " has accepted your friend request"
            })
          end
                  
          render json: {
            status: :accepted,
            user: @user,
            other_user: @other_user
          }
        else
          render json: {
            status: 500,
            errors: @user.errors.full_messages
          }
        end
      else
        render json: {
          status: 500,
          errors: @friend_request.errors.full_messages
        }
      end
    end
  end
  
  # PUT /users/1/submit_ticket
  def submit_ticket
    @user = current_user

    if params[:ticket][:category] == "user"
      # validate that if category == "user", verify @reported_user exists
      @reported__user = User.find_by(username: params[:ticket][:username])
      if @reported__user.nil?
        render json: {
          status: 500,
          errors: ["User does not exist for that username or username is blank"]
        }
      elsif @user.id == @reported__user.id
        render json: {
          status: 500,
          errors: ["You cannot report yourself"]
        }
      else
        @ticket = @user.tickets.build(ticket_params)
        @ticket.reported_user = @reported__user
        if @ticket.save
          render json: {
            status: :submitted,
            ticket: @ticket
          }
        else
          render json: {
            status: 500,
            errors: @ticket.errors.full_messages
          }
        end
      end
    elsif params[:ticket][:category] == "quiz"
      # validate that if category == "content", verify @quiz exists
      @reported_quiz = Quiz.find_by(id: params[:ticket][:quiz_id])
      if @reported_quiz.nil?
        render json: {
          status: 500,
          errors: ["Kwiz does not exist for that ID or ID is blank"]
        }
      else
        @ticket = @user.tickets.build(ticket_params)
        @ticket.reported_quiz = @reported_quiz
        if @ticket.save
          render json: {
            status: :submitted,
            ticket: @ticket
          }
        else
          render json: {
            status: 500,
            errors: @ticket.errors.full_messages
          }
        end
      end
    else
      @ticket = @user.tickets.build(ticket_params)
      if @ticket.save
        render json: {
          status: :submitted,
          ticket: @ticket
        }
      else
        render json: {
          status: 500,
          errors: @ticket.errors.full_messages
        }
      end
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :email, :name, :caption, :password, :password_confirmation, :facebook_id, :apple_id)
  end
  
  def ticket_params
    params.require(:ticket).permit(:category, :title, :description)
  end
  
  def image_io
    decoded_image = Base64.decode64(params[:user][:avatar][:data])
    StringIO.new(decoded_image)
  end
  
  def file_name
    params[:user][:avatar][:fileName]
  end
end