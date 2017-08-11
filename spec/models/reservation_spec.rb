require 'rails_helper'

RSpec.describe Reservation, type: :model do
  describe "with a existing plane" do
    let(:plane){ FactoryGirl.create(:plane) }

    it "Is saved with proper information" do
      reservation = FactoryGirl.create(:reservation)
      expect(reservation).to be_valid
      expect(Reservation.count).to eq(1)
    end

    it "Is not saved when end time is before start time" do
      reservation = Reservation.create reservation_type: "1", start: "2017-06-07 12:42:00", end: "2017-06-07 12:12:00", user_id: 1, plane_id: 1

      expect(reservation).not_to be_valid
      expect(Reservation.count).to eq(0)
    end

    it "Is not saved when start and end time overlap with existing reservation" do
      FactoryGirl.create :reservation, plane: plane
      reservation = FactoryGirl.build(:reservation,
                                      start: DateTime.now + 2.days + 1.hour,
                                      end: DateTime.now + 2.days + 2.hours,
                                      plane: plane)

      expect(reservation).not_to be_valid
      expect(Reservation.count).to eq(1)
    end

    it 'calls publishing method when destroyed' do
      reservation = Reservation.create reservation_type: 'opetus',
                                       start: '2017-05-05 12:00:00',
                                       end: '2017-05-05 14:00:00',
                                       user_id: 1,
                                       plane: plane
      expect(reservation).to receive(:publish_reservation_destroyed).with(no_args)
      reservation.destroy
    end
  end
end
