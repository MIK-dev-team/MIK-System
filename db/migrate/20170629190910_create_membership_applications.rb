class CreateMembershipApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :membership_applications do |t|
      t.string :username, limit: 20
      t.string :member_type
      t.string :full_name
      t.date :birthday
      t.string :address
      t.integer :postal_code, limit: 5
      t.string :city
      t.string :phone
      t.string :email
      t.string :licences
      t.integer :experience_with_engine
      t.integer :other_experience
      t.string :other_memberships
      t.string :join_sil
      t.integer :sil_membership_number
      t.string :extra_information

      t.timestamps
    end
    add_index :membership_applications, :username, unique: true
  end
end
