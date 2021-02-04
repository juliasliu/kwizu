class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4 }
  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :caption, length: { maximum: 100 }
  
  has_many :quizzes
  has_many :quizzings
  has_many :taken_quizzes, through: :quizzings, source: :quiz
  
  has_and_belongs_to_many :friends, class_name: 'User', join_table: :friendships, foreign_key: :user_id, association_foreign_key: :friend_user_id
  has_many :requests_as_requestor, class_name: 'FriendRequest', foreign_key: :requestor_id
  has_many :friends_requested, through: :requests_as_requestor, source: :receiver
  has_many :requests_as_receiver, class_name: 'FriendRequest', foreign_key: :receiver_id
  has_many :friends_received, through: :requests_as_receiver, source: :requestor
  
  has_and_belongs_to_many :chats
  
  has_many :tickets
  has_many :reported_tickets, class_name: 'Ticket', foreign_key: :reported_user_id
  
  has_one_attached :avatar
  
  def avatar_url
    if avatar.attached?
      Rails.application.routes.url_helpers.url_for(avatar)
    end
  end
end
