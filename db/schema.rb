# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170814144709) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "availability_notifiers", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "notifier_type"
    t.integer "plane_id"
  end

  create_table "membership_applications", force: :cascade do |t|
    t.string "username", limit: 20
    t.string "member_type"
    t.string "full_name"
    t.date "birthday"
    t.string "address"
    t.string "postal_code"
    t.string "city"
    t.string "phone"
    t.string "email"
    t.string "licences"
    t.integer "experience_with_engine"
    t.string "other_experience"
    t.string "other_memberships"
    t.string "join_sil"
    t.string "sil_membership_number"
    t.string "extra_information"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "pending"
    t.integer "user_id"
  end

  create_table "planes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservation_deletion_logs", force: :cascade do |t|
    t.datetime "start"
    t.datetime "end"
    t.integer "user_id"
    t.integer "plane_id"
    t.boolean "deleted_by_admin"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.string "reservation_type"
    t.datetime "start"
    t.datetime "end"
    t.integer "user_id"
    t.integer "plane_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "additional_info"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
