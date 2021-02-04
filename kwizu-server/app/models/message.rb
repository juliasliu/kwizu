class Message < ApplicationRecord
  validates :text, presence: true
  validates :chat_id, presence: true
  validates :user_id, presence: true
  
  belongs_to :chat
  belongs_to :user
  
  def updated_at_localtime
    return updated_at.localtime
  end
end
