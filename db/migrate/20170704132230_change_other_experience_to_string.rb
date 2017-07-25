class ChangeOtherExperienceToString < ActiveRecord::Migration[5.1]
  def change
    change_column :membership_applications, :other_experience, :string
  end
end
