class Chat < ApplicationRecord
#  validates :title, presence: true
  has_many :messages
  has_and_belongs_to_many :users
  
  def updated_at_localtime
    return updated_at.localtime
  end
end
