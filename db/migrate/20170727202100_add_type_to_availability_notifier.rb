class AddTypeToAvailabilityNotifier < ActiveRecord::Migration[5.1]
  def change
    add_column :availability_notifiers, :type, :string
  end
end
