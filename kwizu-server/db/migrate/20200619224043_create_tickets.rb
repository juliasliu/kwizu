class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :category
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
