class AddResultToQuizzing < ActiveRecord::Migration[5.2]
  def change
    add_reference :quizzings, :result, foreign_key: true
  end
end
