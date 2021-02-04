# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_29_044611) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "chats", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "chats_users", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "chat_id"
    t.index ["chat_id"], name: "index_chats_users_on_chat_id"
    t.index ["user_id"], name: "index_chats_users_on_user_id"
  end

  create_table "choices", force: :cascade do |t|
    t.string "content"
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "question_id"
    t.index ["question_id"], name: "index_choices_on_question_id"
  end

  create_table "choices_quizzings", force: :cascade do |t|
    t.bigint "choice_id"
    t.bigint "quizzing_id"
    t.index ["choice_id"], name: "index_choices_quizzings_on_choice_id"
    t.index ["quizzing_id"], name: "index_choices_quizzings_on_quizzing_id"
  end

  create_table "friend_requests", force: :cascade do |t|
    t.bigint "requestor_id"
    t.bigint "receiver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["receiver_id"], name: "index_friend_requests_on_receiver_id"
    t.index ["requestor_id"], name: "index_friend_requests_on_requestor_id"
  end

  create_table "friendships", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "friend_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_user_id", "user_id"], name: "index_friendships_on_friend_user_id_and_user_id", unique: true
    t.index ["user_id", "friend_user_id"], name: "index_friendships_on_user_id_and_friend_user_id", unique: true
  end

  create_table "messages", force: :cascade do |t|
    t.string "text"
    t.bigint "chat_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["chat_id"], name: "index_messages_on_chat_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quiz_id"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "title"
    t.boolean "public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.boolean "featured"
    t.index ["user_id"], name: "index_quizzes_on_user_id"
  end

  create_table "quizzings", force: :cascade do |t|
    t.bigint "quiz_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "result_id"
    t.index ["quiz_id"], name: "index_quizzings_on_quiz_id"
    t.index ["result_id"], name: "index_quizzings_on_result_id"
    t.index ["user_id"], name: "index_quizzings_on_user_id"
  end

  create_table "results", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "weight"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quiz_id"
    t.index ["quiz_id"], name: "index_results_on_quiz_id"
  end

  create_table "tickets", force: :cascade do |t|
    t.string "category"
    t.string "title"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.bigint "reported_user_id"
    t.bigint "reported_quiz_id"
    t.index ["reported_quiz_id"], name: "index_tickets_on_reported_quiz_id"
    t.index ["reported_user_id"], name: "index_tickets_on_reported_user_id"
    t.index ["user_id"], name: "index_tickets_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "caption", default: ""
    t.integer "points", default: 0
    t.bigint "facebook_id"
    t.string "notification_token"
    t.string "apple_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "chats_users", "chats"
  add_foreign_key "chats_users", "users"
  add_foreign_key "choices", "questions"
  add_foreign_key "choices_quizzings", "choices"
  add_foreign_key "choices_quizzings", "quizzings"
  add_foreign_key "messages", "chats"
  add_foreign_key "messages", "users"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quizzes", "users"
  add_foreign_key "quizzings", "quizzes"
  add_foreign_key "quizzings", "results"
  add_foreign_key "quizzings", "users"
  add_foreign_key "results", "quizzes"
  add_foreign_key "tickets", "users"
end
