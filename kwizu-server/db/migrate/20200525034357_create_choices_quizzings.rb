class CreateChoicesQuizzings < ActiveRecord::Migration[5.2]
  def change
    create_table :choices_quizzings do |t|
      t.references :choice, foreign_key: true
      t.references :quizzing, foreign_key: true
    end
  end
end
