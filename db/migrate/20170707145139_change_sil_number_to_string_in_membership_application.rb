class ChangeSilNumberToStringInMembershipApplication < ActiveRecord::Migration[5.1]
  def change
    change_column :membership_applications, :sil_membership_number, :string
  end
end
