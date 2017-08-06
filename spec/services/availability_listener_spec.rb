require 'rails_helper'

RSpec.describe 'AvailabilityListener' do
  let!(:current_time){ DateTime.now }
  let(:message_delivery){ instance_double(ActionMailer::MessageDelivery) }
  let!(:plane){ FactoryGirl.create(:plane) }
  let(:reservation){ FactoryGirl.create(:reservation,
                                        start: current_time + 2.days + 3.hours,
                                        end: current_time + 2.days + 5.hours + 30.minutes,
                                        plane: plane) }
  let(:reservation1){ FactoryGirl.create(:reservation,
                                         start: current_time + 2.days,
                                         end: current_time + 2.days + 2.hours,
                                         plane: plane) }
  let(:reservation2){ FactoryGirl.create(:reservation,
                                         start: current_time + 2.days + 2.hours,
                                         end: current_time + 2.days + 3.hours,
                                         plane: plane) }
  let(:notifier){ FactoryGirl.create(:availability_notifier,
                                     start: current_time + 2.days,
                                     end: current_time + 2.days + 1.hour + 30.minutes,
                                     plane: plane) }
  let(:notifier2){ FactoryGirl.create(:availability_notifier,
                                      start: current_time + 2.days + 5.hours,
                                      end: current_time + 2.days + 7.hours + 30.minutes,
                                      notifier_type: 'any',
                                      plane: plane) }
  let(:notifier3){ FactoryGirl.create(:availability_notifier,
                                      start: current_time + 2.days,
                                      end: current_time + 2.days + 1.hour + 30.minutes,
                                      plane: plane) }

  context 'has public class method reservation_destroyed that' do
    before :each do
      allow(message_delivery).to receive(:deliver_later)
    end

    it 'calls correct private class methods' do
      allow(AvailabilityListener).to receive(:get_appropriate_reservations) { [] }
      allow(AvailabilityListener).to receive(:get_clean_notifiers) { [] }
      expect(AvailabilityListener).to receive(:get_appropriate_reservations).with(reservation.plane_id)
      expect(AvailabilityListener).to receive(:get_clean_notifiers).with(reservation.start, reservation.end)
      expect(AvailabilityListener).to receive(:mail_people).with([])
      expect(AvailabilityListener).to receive(:delete_completed_notifiers).with([])
      AvailabilityListener.reservation_destroyed reservation
    end

    it 'sends correct mails when appropriate on all-type notifiers' do
      reservation
      reservation1 # gonna destroy
      reservation2
      notifier2 # won't proc
      notifier # will proc
      notifier3 # will proc
      expect(AvailabilityNotifier.count).to eq(3)

      expect(Api::V1::AvailabilityNotifierMailer)
          .to receive(:time_available)
                  .twice
                  .and_return(message_delivery)

      AvailabilityListener.reservation_destroyed reservation1
      expect(AvailabilityNotifier.count).to eq(1)
    end

    it 'sends correct mails when appropriate on any-type notifiers' do
      reservation # gonna destroy
      reservation1
      reservation2
      notifier2 # gonna proc
      notifier # won't proc
      notifier3 # won't proc
      expect(AvailabilityNotifier.count).to eq(3)

      expect(Api::V1::AvailabilityNotifierMailer)
          .to receive(:time_available)
                  .with(notifier2)
                  .once
                  .and_return(message_delivery)

      AvailabilityListener.reservation_destroyed reservation
      expect(AvailabilityNotifier.count).to eq(3)
    end

    it 'will not send any mails when reservation is destroyed with nothing observing it' do
      reservation # gonna destroy
      reservation1
      reservation2
      notifier
      notifier3
      expect(AvailabilityNotifier.count).to eq(2)

      expect(Api::V1::AvailabilityNotifierMailer)
          .not_to receive(:time_available)

      AvailabilityListener.reservation_destroyed reservation
      expect(AvailabilityNotifier.count).to eq(2)
    end

    it 'will not send any mails if no notifiers exist' do
      reservation # gonna destroy
      reservation1
      reservation2
      expect(AvailabilityNotifier.count).to eq(0)

      expect(Api::V1::AvailabilityNotifierMailer)
          .not_to receive(:time_available)

      AvailabilityListener.reservation_destroyed reservation
    end
  end

  context 'has private class method get_appropriate_reservations that' do
    it 'calls Reservation model correctly when given a nil plane_id' do
      expect(Reservation).to receive(:where).with('start >= ?', DateTime.now)
      AvailabilityListener.get_appropriate_reservations nil
    end

    it 'calls Reservation model correctly when given existing plane_id' do
      expect(Reservation).to receive(:where).with('start >= ? AND plane_id = ?', DateTime.now, reservation.plane.id)
      AvailabilityListener.get_appropriate_reservations reservation.plane.id
    end
  end

  context 'has private class method get_clean_notifiers that' do
    it 'calls correct methods with correct parameters' do
      allow(AvailabilityListener).to receive(:completely_clean_notifiers) { [] }
      allow(AvailabilityListener).to receive(:notifiers_with_cancelled_reservation) { [] }
      expect(AvailabilityListener).to receive(:completely_clean_notifiers).with(no_args)
      expect(AvailabilityListener).to receive(:notifiers_with_cancelled_reservation).with(reservation.start, reservation.end)
      AvailabilityListener.get_clean_notifiers reservation.start, reservation.end
    end

    it 'returns an array that combines the arrays it gets from other method calls' do
      allow(AvailabilityListener).to receive(:completely_clean_notifiers) { [:one] }
      allow(AvailabilityListener).to receive(:notifiers_with_cancelled_reservation) { [:two] }
      expect(
          AvailabilityListener.get_clean_notifiers reservation.start, reservation.end
      ).to eq([:one, :two])
    end
  end

  context 'has private class method completely_clean_notifiers that' do
    it 'calls correct methods with correct parameters' do
      allow(AvailabilityNotifier).to receive(:where) { [notifier] }

      expect(AvailabilityNotifier).to receive(:where).with('start >= ? AND notifier_type = ?', DateTime.now, 'all')
      expect(AvailabilityListener).to receive(:notifier_has_reservations_during_it?).with(notifier)
      AvailabilityListener.completely_clean_notifiers
    end

    it 'gets correct notifiers from db' do
      notifier1 = notifier
      FactoryGirl.build(:availability_notifier, start: '2016-05-05 12:00:00', plane: plane).save(validate: false)
      FactoryGirl.create(:availability_notifier, notifier_type: 'any', plane: plane)
      allow(AvailabilityListener).to receive(:notifier_has_reservations_during_it?) { false }

      expect(
          AvailabilityListener.completely_clean_notifiers
      ).to eq([notifier1])
    end

    it 'calls notifier_has_reservations_during_it? correct amount of times' do
      allow(AvailabilityNotifier).to receive(:where) { [:one, :two, :three] }
      allow(AvailabilityListener).to receive(:notifier_has_reservations_during_it?) { true }
      expect(AvailabilityListener).to receive(:notifier_has_reservations_during_it?).exactly(3).times
      AvailabilityListener.completely_clean_notifiers
    end
  end

  context 'has private class method notifiers_with_cancelled_reservation that' do
    it 'calls correct methods with correct parameters' do
      deleted_start = 'some start'
      deleted_end = 'some end'
      allow(AvailabilityNotifier).to receive(:where) { [notifier] }

      expect(AvailabilityNotifier).to receive(:where).with('start >= ? AND notifier_type = ?', DateTime.now, 'any')
      expect(AvailabilityListener)
          .to receive(:reservation_was_removed_from_notifier_time_frame?)
                  .with(notifier, deleted_start, deleted_end)
      AvailabilityListener.notifiers_with_cancelled_reservation deleted_start, deleted_end
    end

    it 'gets correct notifiers from db' do
      notifier
      FactoryGirl.build(:availability_notifier, start: '2016-05-05 12:00:00').save(validate: false)
      notifier3 = FactoryGirl.create(:availability_notifier, notifier_type: 'any', plane: plane)
      allow(AvailabilityListener).to receive(:reservation_was_removed_from_notifier_time_frame?) { true }

      expect(
          AvailabilityListener.notifiers_with_cancelled_reservation 'start', 'end'
      ).to eq([notifier3])
    end

    it 'calls reservation_was_removed_from_notifier_time_frame? correct amount of times' do
      allow(AvailabilityNotifier).to receive(:where) { [:one, :two, :three] }
      allow(AvailabilityListener).to receive(:reservation_was_removed_from_notifier_time_frame?) { true }
      expect(AvailabilityListener).to receive(:reservation_was_removed_from_notifier_time_frame?).exactly(3).times
      AvailabilityListener.notifiers_with_cancelled_reservation 'some start', 'some end'
    end
  end

  context 'has private class method notifier_has_reservations_during_it? that' do
    it 'returns false if @reservations is empty' do
      AvailabilityListener.instance_variable_set :@reservations, []
      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(false)
    end

    it 'returns false if @reservations has no reservations that overlap notifier' do
      notifier = FactoryGirl.create(:availability_notifier,
                                    start: current_time + 2.days + 3.hours,
                                    end: current_time + 2.days + 7.hours,
                                    plane: plane)
      AvailabilityListener.instance_variable_set :@reservations, [reservation1, reservation2]

      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(false)
    end

    it 'return true if notifier end overlaps with a reservation' do
      notifier = FactoryGirl.create(:availability_notifier,
                                    start: current_time + 1.day + 22.hours,
                                    end: current_time + 2.days + 1.hour,
                                    plane: plane)
      AvailabilityListener.instance_variable_set :@reservations, [reservation1, reservation2]

      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(true)
    end

    it 'return true if notifier start overlaps with a reservation' do
      notifier = FactoryGirl.create(:availability_notifier,
                                    start: current_time + 2.days + 1.hour,
                                    end: current_time + 2.days + 8.hours,
                                    plane: plane)
      AvailabilityListener.instance_variable_set :@reservations, [reservation1, reservation2]

      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(true)
    end

    it 'return true if notifier start and end overlap with a reservations' do
      notifier = FactoryGirl.create(:availability_notifier,
                                    start: current_time + 2.days + 1.hour,
                                    end: current_time + 2.days + 2.hours + 30.minutes,
                                    plane: plane)
      AvailabilityListener.instance_variable_set :@reservations, [reservation1, reservation2]

      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(true)
    end

    it 'return true if notifier encompasses several reservations' do
      notifier = FactoryGirl.create(:availability_notifier,
                                    start: current_time + 1.day + 22.hours,
                                    end: current_time + 2.days + 22.hours + 30.minutes,
                                    plane: plane)
      AvailabilityListener.instance_variable_set :@reservations, [reservation1, reservation2]

      expect(AvailabilityListener.notifier_has_reservations_during_it? notifier).to be(true)
    end
  end

  context 'has private class method reservation_was_removed_from_notifier_time_frame? that' do
    it 'returns false if notifier time frame does not overlap with given times with notifier end equal to given start' do
      res_start = current_time + 2.days + 1.hour + 30.minutes
      res_end = current_time + 2.days + 3.hours

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(false)
    end

    it 'returns false if notifier time frame does not overlap with given times with notifier start equal to given end' do
      res_start = current_time + 1.day + 22.hours + 30.minutes
      res_end = current_time + 2.days

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(false)
    end

    it 'returns true if notifier end overlaps with given times' do
      res_start = current_time + 2.days + 1.hour
      res_end = current_time + 2.days + 4.hours

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(true)
    end

    it 'returns true if notifier start overlaps with given times' do
      res_start = current_time + 1.day + 22.hours
      res_end = current_time + 2.days + 1.hour

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(true)
    end

    it 'returns true if notifier encompasses given times' do
      res_start = current_time + 2.days + 30.minutes
      res_end = current_time + 2.days + 1.hour

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(true)
    end

    it 'returns true if notifier times equal given times' do
      res_start = current_time + 2.days
      res_end = current_time + 2.days + 1.hour + 30.minutes

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(true)
    end

    it 'returns true if given times encompass notifier times' do
      res_start = current_time + 1.days + 22.hours
      res_end = current_time + 2.days + 6.hours + 30.minutes

      expect(
          AvailabilityListener.reservation_was_removed_from_notifier_time_frame? notifier, res_start, res_end
      ).to be(true)
    end
  end

  context 'has private class method delete_completed_notifiers that' do
    it 'destroys all notifiers with type all' do
      notifier
      notifier2
      notifier3

      expect(AvailabilityNotifier.count).to eq(3)

      AvailabilityListener.delete_completed_notifiers [notifier, notifier2, notifier3]
      expect(AvailabilityNotifier.count).to eq(1)
    end

    it 'destroys notifiers with type any if their end is in the past' do
      any_notifier = FactoryGirl.build(:availability_notifier,
                                       start: current_time - 2.days - 5.hours,
                                       end: current_time - 2.days - 2.hours - 30.minutes,
                                       notifier_type: 'any',
                                       plane: plane)
      any_notifier.save(validate: false)

      expect(AvailabilityNotifier.count).to eq(1)

      AvailabilityListener.delete_completed_notifiers [any_notifier]
      expect(AvailabilityNotifier.count).to eq(0)
    end

    it 'destroys all notifiers with type all and any if any-type notifiers are in the past' do
      notifier
      notifier3
      any_notifier = FactoryGirl.build(:availability_notifier,
                                       start: current_time - 2.days - 5.hours,
                                       end: current_time - 2.days - 2.hours - 30.minutes,
                                       notifier_type: 'any',
                                       plane: plane)
      any_notifier.save(validate: false)

      expect(AvailabilityNotifier.count).to eq(3)

      AvailabilityListener.delete_completed_notifiers [notifier, notifier3, any_notifier]
      expect(AvailabilityNotifier.count).to eq(0)
    end
  end

  context 'has private class method mail_people that' do

    before :each do
      allow(message_delivery).to receive(:deliver_later)
    end

    it 'sends a mail for each notifier' do
      expect(Api::V1::AvailabilityNotifierMailer)
          .to receive(:time_available)
                  .exactly(3).times
                  .and_return(message_delivery)

      AvailabilityListener.mail_people [notifier, notifier2, notifier3]
    end

    it 'sends a mail with correct parameter' do
      expect(Api::V1::AvailabilityNotifierMailer)
          .to receive(:time_available)
                  .with(notifier)
                  .once
                  .and_return(message_delivery)

      AvailabilityListener.mail_people [notifier]
    end
  end
end