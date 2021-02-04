class AddReferencesToTicket < ActiveRecord::Migration[6.0]
  def change
    add_reference :tickets, :reported_user, null: true
    add_reference :tickets, :reported_quiz, null: true
  end
end
