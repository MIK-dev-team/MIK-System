class AddPendingToMembershipApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :membership_applications, :pending, :boolean
  end
end
