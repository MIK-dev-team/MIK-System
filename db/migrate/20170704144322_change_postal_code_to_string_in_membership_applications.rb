class ChangePostalCodeToStringInMembershipApplications < ActiveRecord::Migration[5.1]
  def change
    change_column :membership_applications, :postal_code, :string
  end
end
