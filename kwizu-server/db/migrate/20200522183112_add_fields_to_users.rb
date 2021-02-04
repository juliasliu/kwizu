class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :caption, :string, default: ""
    add_column :users, :points, :integer, default: 0
  end
end
