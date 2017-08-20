class ReservationDeletionLogListener
  def self.reservation_destroyed_for_log (res, by_admin)
    log_entry = ReservationDeletionLog.new start:res.start, end:res.end, user_id:res.user_id, plane_id:res.plane_id, deleted_by_admin:by_admin

    log_entry.save
  end
end