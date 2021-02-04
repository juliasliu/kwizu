class AddAppleIdToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :apple_id, :string
  end
end
