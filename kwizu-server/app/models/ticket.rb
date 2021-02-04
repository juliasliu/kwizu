class Ticket < ApplicationRecord
  validates :category, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :user_id, presence: true
  
  belongs_to :user
  
  belongs_to :reported_user, class_name: 'User', optional: true
  belongs_to :reported_quiz, class_name: 'Quiz', optional: true
end
