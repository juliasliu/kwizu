class CreateChatsUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :chats_users do |t|
      t.references :user, foreign_key: true
      t.references :chat, foreign_key: true
    end
  end
end
