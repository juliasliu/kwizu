class Quiz < ApplicationRecord
  validates :title, presence: true, length: { maximum: 100 }
  validates :public, inclusion: { in: [ true, false ] }
  validates :user_id, presence: true
  
  belongs_to :user
  
  has_many :questions
  has_many :results
  has_many :quizzings
  has_many :taken_users, through: :quizzings, source: :user
  has_one_attached :image

  has_many :reported_tickets, class_name: 'Ticket', foreign_key: :reported_quiz_id
  
  def image_url
    if image.attached?
      Rails.application.routes.url_helpers.url_for(image)
    end
  end
end
