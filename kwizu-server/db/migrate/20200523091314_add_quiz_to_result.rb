class AddQuizToResult < ActiveRecord::Migration[5.2]
  def change
    add_reference :results, :quiz, foreign_key: true
  end
end
