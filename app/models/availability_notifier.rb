class AvailabilityNotifier < ApplicationRecord
  # belongs_to :user

  def self.reservation_destroyed
    @reservations = Reservation.where("start >= ?", DateTime.now)
    notifiers = AvailabilityNotifier.where("start >= ?", DateTime.now)
    clean_notifiers = Array.new

    notifiers.each do |notifier|
      unless notifier_has_reservations_during_it? (notifier)
        clean_notifiers.push(notifier)
      end
    end
    # MAIL clean_notifiers
    puts "#{clean_notifiers}"
  end

  private
    def notifier_has_reservations_during_it? (notifier)
      @reservations.each do |res|
        if (notifier.start >= res.start and notifier.start <= res.end) or
            (notifier.end >= res.start and notifier.end <= res.end)
          return true
        end
      end
      return false
    end
end
