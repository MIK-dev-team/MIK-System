class CreateAvailabilityNotifiers < ActiveRecord::Migration[5.1]
  def change
    create_table :availability_notifiers do |t|
      t.datetime :start
      t.datetime :end
      t.integer :user_id

      t.timestamps
    end
  end
end
