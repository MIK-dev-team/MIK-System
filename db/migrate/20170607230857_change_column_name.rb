class ChangeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column :reservations, :finish, :end_at
  end
end
