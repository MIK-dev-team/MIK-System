class AddUserIdToMembershipApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :membership_applications, :user_id, :integer
  end
end
