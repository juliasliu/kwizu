class MessagesController < ApplicationController
  def create
    @user = current_user
    @chat = Chat.find(params[:chat_id])
    @message = @chat.messages.build(message_params)
    @message.user = @user
    if @message.save
      @chat.users.each do |user|
        if user.id != @user.id and user.notification_token
          send_notification({
            "token" => user.notification_token, 
            "title" => @user.name + " has sent you a message", 
            "body" => message_filter(@message.text)
          })
        end
      end
                
      ActionCable.server.broadcast(
      "chat_#{@chat.id}",
      @message.as_json(include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime)
      )
      render json: {
        chat: @chat.as_json(include: [ { messages: { include: { user: { methods: :avatar_url } }, methods: :updated_at_localtime } }, { users: { methods: :avatar_url } } ], methods: :updated_at_localtime)
      }
    else
      render json: {
        status: 500,
        errors: @message.errors.full_messages
      }
    end
  end

  private

  def message_params
    params.require(:message).permit(:text)
  end
  
  def message_filter(message)
    regex = /kwizu:\/\/quizzes\/(\d*)/
    matches = message.match(regex)
    unless matches.nil?
      return "Sent a kwiz"
    end
    regex = /kwizu:\/\/quizzings\/(\d*)\/(\d*)/
    matches = message.match(regex)
    unless matches.nil?
      return "Sent a kwiz result"
    end
    return message
  end
end
