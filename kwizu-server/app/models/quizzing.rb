class Quizzing < ApplicationRecord
  validates :user_id, presence: true
  validates :quiz_id, presence: true
  validates :result_id, presence: true

  belongs_to :quiz
  belongs_to :user
  belongs_to :result
  has_and_belongs_to_many :choices
end
