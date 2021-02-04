class CreateResults < ActiveRecord::Migration[5.2]
  def change
    create_table :results do |t|
      t.string :title
      t.string :description
      t.integer :weight

      t.timestamps
    end
  end
end
