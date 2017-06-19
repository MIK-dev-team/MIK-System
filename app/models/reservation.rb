class Reservation < ApplicationRecord
  belongs_to :plane

  validate :start_date_before_end_date
  validate :cannot_overlap_another_reservation

  def cannot_overlap_another_reservation
    range = Range.new start, end_at
    overlaps = Reservation.exclude_self(id).in_range(range)
    errors.add("Joku muu on jo varannut valitun ajan") unless overlaps.empty?
  end

  scope :in_range, -> range {
    where('(start, end_at OVERLAPS ?, ?)', range.first, range.last)
  }
  scope :exclude_self, -> id { where.not(id: id) }

  def start_date_before_end_date
    if self.start > self.finish
      errors.add("Lopetus ennen aloitusta")
    end
  end
end
