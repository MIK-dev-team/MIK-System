class CreateReservations < ActiveRecord::Migration[5.1]
  def change
    create_table :reservations do |t|
      t.string :plane
      t.string :resevation_type
      t.datetime :start
      t.datetime :finish
      t.integer :user_id

      t.timestamps
    end
  end
end
