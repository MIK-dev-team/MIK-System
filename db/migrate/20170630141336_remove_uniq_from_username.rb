class RemoveUniqFromUsername < ActiveRecord::Migration[5.1]
  def change
    remove_index :membership_applications, :username
  end
end
