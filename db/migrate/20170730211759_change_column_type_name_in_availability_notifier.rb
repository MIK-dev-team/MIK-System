class ChangeColumnTypeNameInAvailabilityNotifier < ActiveRecord::Migration[5.1]
  def change
    rename_column :availability_notifiers, :type, :notifier_type
  end
end
