class ChatsController < ApplicationController
  def index
    @user = current_user
    @chats = @user.chats
    if @chats
      render json: {
        chats: @chats.order("updated_at DESC").map { |q|
          q.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
        }
      }
    else
      render json: {
        status: 500,
        errors: ['no chats found']
      }
    end
  end

  def show
    @chat = Chat.find(params[:id])
    if @chat
      ActionCable.server.broadcast(
      "chat_#{@chat.id}",
      @chat
      )
      render json: {
        chat: @chat.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
      }
    else
      render json: {
        status: 500,
        errors: @chat.errors.full_messages
      }
    end
  end
  
  def find
    @user = current_user
    @chat = Chat.select { |chat| chat.user_ids.include?(@user.id) and chat.user_ids.include?(params[:id].to_i) and chat.user_ids.length == 2 }.first
    if @chat
      ActionCable.server.broadcast(
      "chat_#{@chat.id}",
      @chat
      )
      render json: {
        chat: @chat.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
      }
    else
      render json: {
        status: 500,
        errors: ["chat not found"]
      }
    end
  end

  def create
    @user = current_user
    if params[:chat][:title]
      @chat = Chat.new(chat_params)
    end
    @chat = Chat.new()
    
    # add all users in this chat as well
    params[:users].each do |user|
      @chat.users << User.find_by(id: user[:id])
    end
    @chat.users << @user

    if @chat.save
#      ChatsChannel.broadcast_to(@chat.id, @chat)
      ActionCable.server.broadcast(
        "chat_#{@chat.id}",
        @chat
      )
      render json: {
        chat: @chat.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
      }
    else
      render json: {
        status: 500,
        errors: @chat.errors.full_messages
      }
    end
  end
  
  # PUT /chats/1
    def update
      @chat = Chat.find_by(id: params[:id])
      if @chat.update(title: params[:title])
        render json: {
          status: :updated,
          chat: @chat.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
        }
      else
        render json: {
          status: 500,
          errors: @chat.errors.full_messages
        }
      end
    end

  private

  def chat_params
    params.require(:chat).permit(:title)
  end
end
