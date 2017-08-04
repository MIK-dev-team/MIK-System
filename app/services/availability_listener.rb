class AvailabilityListener
  def self.reservation_destroyed (reservation)
    @reservations = get_appropriate_reservations reservation.plane_id
    clean_notifiers = get_clean_notifiers reservation.start, reservation.end

    mail_people clean_notifiers
    delete_completed_notifiers clean_notifiers
  end


  private
  def self.get_appropriate_reservations (plane_id)
    if plane_id == nil
      Reservation.where("start >= ?", DateTime.now)
    else
      Reservation.where("start >= ? AND plane_id = ?", DateTime.now, plane_id)
    end
  end

  def self.get_clean_notifiers(res_start, res_end)
    clean_notifiers_from_all = completely_clean_notifiers
    clean_notifiers_from_any = notifiers_with_cancelled_reservation res_start, res_end
    clean_notifiers_from_all.push(*clean_notifiers_from_any)
  end


  def self.completely_clean_notifiers
    notifiers = AvailabilityNotifier.where("start >= ? AND notifier_type = ?", DateTime.now, 'all')
    clean_notifiers = Array.new

    notifiers.each do |notifier|
      unless self.notifier_has_reservations_during_it? (notifier)
        clean_notifiers.push(notifier)
      end
    end
    clean_notifiers
  end

  def self.notifiers_with_cancelled_reservation (deleted_start, deleted_end)
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
        return true
      end
    end
    false
  end

  def self.reservation_was_removed_from_notifier_time_frame? (notifier, res_start, res_end)
    (notifier.start >= res_start and notifier.start <= res_end) or
        (notifier.end >= res_start and notifier.end <= res_end)
  end

  def self.delete_completed_notifiers (notifiers)
    notifiers.each do |noti|
      if noti.notifier_type == 'all'
        puts "gonna delete notifier for all: #{noti}"
        noti.destroy
      elsif noti.end < DateTime.now
        puts "gonna delete notifier for any: #{noti}"
        noti.destroy
      end
    end
  end

  def self.mail_people(notifiers)
    notifiers.each do |noti|
      puts "mailing to #{noti.user_id} whose notifier_type is #{noti.notifier_type}"
      Api::V1::AvailabilityNotifierMailer.time_available(noti).deliver_later
    end
  end
end