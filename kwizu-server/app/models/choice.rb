class Choice < ApplicationRecord
  validates :content, presence: true, length: { maximum: 100 }
  validates :weight, presence: true
#  validates :question_id, presence: true
  has_one_attached :image
  belongs_to :question
  has_and_belongs_to_many :quizzings
  
  def image_url
        if image.attached?
          Rails.application.routes.url_helpers.url_for(image)
        end
      end
end
