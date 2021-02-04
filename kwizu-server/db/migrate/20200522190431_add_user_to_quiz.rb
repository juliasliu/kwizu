class AddUserToQuiz < ActiveRecord::Migration[5.2]
  def change
    add_reference :quizzes, :user, foreign_key: true
  end
end
