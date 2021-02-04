class Result < ApplicationRecord
  validates :title, presence: true, length: { maximum: 150 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :weight, presence: true
#  validates :quiz_id, presence: true
  
  belongs_to :quiz
  has_many :quizzings
  has_one_attached :image
  
  def image_url
      if image.attached?
        Rails.application.routes.url_helpers.url_for(image)
      end
    end
end
