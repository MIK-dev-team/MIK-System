require 'rails_helper'

RSpec.describe Reservation, type: :model do
  it "Is saved with proper information" do
    reservation = Reservation.create start reservation_type: "1", start: "2017-06-07 12:42:00", end_at: "2017-06-08 12:42:00", user_id: 1, plane_id: 1

    expect(reservation).to be_valid
    expect(reservation.count).to eq(1)
  end

  it "Is not saved when end time is before start time" do
    reservation = Reservation.create start reservation_type: "1", start: "2017-06-07 12:42:00", end_at: "2017-06-08 12:42:00", user_id: 1, plane_id: 1

    expect(reservation).not_to be_valid
    expect(reservation.count).to eq(1)
  end

  it "Is not saved when start and end time overlap with existing reservation" do
    oldreservation = Reservation.create start reservation_type: "1", start: "2017-06-07 12:42:00", end_at: "2017-05-08 12:42:00", user_id: 1, plane_id: 1
    reservation = Reservation.create start reservation_type: "1", start: "2017-06-07 12:42:00", end_at: "2017-05-08 12:42:00", user_id: 1, plane_id: 1

    expect(reservation).not_to be_valid
    expect(reservation.count).to eq(1)
  end
end
