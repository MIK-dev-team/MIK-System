class AddAdditionalInfoToReservations < ActiveRecord::Migration[5.1]
  def change
    add_column :reservations, :additional_info, :string
  end
end
