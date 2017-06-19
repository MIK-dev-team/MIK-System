class Reservation < ApplicationRecord
  belongs_to :plane

  validate :start_date_before_end_date
  validate :cannot_overlap_another_event

  def cannot_overlap_another_event
    range = Range.new start_at, end_at
    overlaps = Event.exclude_self(id).in_range(range)
    overlap_error unless overlaps.empty?
  end

  scope :in_range, -> range {
    where('(start_at BETWEEN ? AND ?)', range.first, range.last)
  }
  scope :exclude_self, -> id { where.not(id: id) }
  
  def start_date_before_end_date
    if self.start > self.finish
      errors.add("Lopetus ennen aloitusta")
    end
  end
end
