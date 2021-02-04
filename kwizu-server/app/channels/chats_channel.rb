class ChatsChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber to this channel.
  def subscribed
    stream_from "chat_#{params[:id]}"
  end

  def receive(data)
    ActionCable.server.broadcast("chat_#{params[:id]}", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
