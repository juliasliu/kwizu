class CreateQuizzings < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzings do |t|
      t.references :quiz, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
