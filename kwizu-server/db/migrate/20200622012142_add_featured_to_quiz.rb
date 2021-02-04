class AddFeaturedToQuiz < ActiveRecord::Migration[6.0]
  def change
    add_column :quizzes, :featured, :boolean
  end
end
