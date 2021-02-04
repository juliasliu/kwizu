class Question < ApplicationRecord
  validates :title, presence: true, length: { maximum: 150 }
#  validates :quiz_id, presence: true
  
  belongs_to :quiz
  has_many :choices
end
