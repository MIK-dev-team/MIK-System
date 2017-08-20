require 'rails_helper'

RSpec.describe 'ReservationDeletionLogListener' do

  it 'should save a log entry in db with correct parameters' do
    reservation = FactoryGirl.create(:reservation)

    ReservationDeletionLogListener.reservation_destroyed_for_log reservation, false

    expect(ReservationDeletionLog.count).to eq(1)
    expect(ReservationDeletionLog.first.start).to eq(reservation.start)
    expect(ReservationDeletionLog.first.user_id).to eq(reservation.user_id)
    expect(ReservationDeletionLog.first.plane_id).to eq(reservation.plane_id)
  end
end