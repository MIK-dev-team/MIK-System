class CreateReservationDeletionLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :reservation_deletion_logs do |t|
      t.datetime :start
      t.datetime :end
      t.integer :user_id
      t.integer :plane_id
      t.boolean :deleted_by_admin

      t.timestamps
    end
  end
end
