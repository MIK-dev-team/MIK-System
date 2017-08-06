class AddPlaneIdToAvailabilityNotifiers < ActiveRecord::Migration[5.1]
  def change
    add_column :availability_notifiers, :plane_id, :integer
  end
end
