class AvailabilityListener
  # TODO: put this somewhere more approriate instead of models
  def self.reservation_destroyed (deleted_start, deleted_end)
    @reservations = Reservation.where("start >= ?", DateTime.now)
    # using push here because it does not create a new array so it works better in case there are larger arrays
    clean_notifiers_from_all = all_reservations_cancelled_during_notifier_time_frame
    clean_notifiers_from_any = any_reservation_cancelled_during_notifier_time_frame deleted_start, deleted_end
    clean_notifiers = clean_notifiers_from_all.push(*clean_notifiers_from_any)
    clean_notifiers_from_any.unshift(*clean_notifiers_from_all)

    # MAIL clean_notifiers
    clean_notifiers.each do |noti|
      puts "mailing to #{noti.user_id} whose notifier_type is #{noti.notifier_type}"
    end

    delete_clean_notifiers_with_type_all clean_notifiers_from_all
    delete_clean_notifiers_with_type_any clean_notifiers_from_any
  end

  private
  def self.all_reservations_cancelled_during_notifier_time_frame
    notifiers = AvailabilityNotifier.where("start >= ? AND notifier_type = ?", DateTime.now, 'all')
    clean_notifiers = Array.new

    notifiers.each do |notifier|
      unless self.notifier_has_reservations_during_it? (notifier)
        clean_notifiers.push(notifier)
      end
    end
    clean_notifiers
  end

  def self.any_reservation_cancelled_during_notifier_time_frame (deleted_start, deleted_end)
    notifiers = AvailabilityNotifier.where("start >= ? AND notifier_type = ?", DateTime.now, 'any')
    clean_notifiers = Array.new

    notifiers.each do |notifier|
      if self.reservation_was_removed_from_notifier_time_frame? notifier, deleted_start, deleted_end
        clean_notifiers.push(notifier)
      end
    end
    clean_notifiers
  end

  def self.notifier_has_reservations_during_it? (notifier)
    @reservations.each do |res|
      if (notifier.start >= res.start and notifier.start <= res.end) or
          (notifier.end >= res.start and notifier.end <= res.end)
        true
      end
    end
    false
  end

  def self.reservation_was_removed_from_notifier_time_frame? (notifier, res_start, res_end)
    if (notifier.start >= res_start and notifier.start <= res_end) or
        (notifier.end >= res_start and notifier.end <= res_end)
      true
    else
      false
    end
  end

  def self.delete_clean_notifiers_with_type_all notifiers
    # Maybe do like this: notifiers.destroy_all
    notifiers.each{ |noti| puts "gonna delete notifier for all: #{noti}" }
  end

  def self.delete_clean_notifiers_with_type_any notifiers
    # Mayve do like this: notifiers.where("end <= ?", DateTime.now).destroy_all
    notifiers.each do |noti|
      if noti.end < DateTime.now
        puts "gonna delete notifier for any: #{noti}"
      end
    end
  end
end