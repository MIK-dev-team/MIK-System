class Reservation < ApplicationRecord
  belongs_to :plane

  validate :start_date_before_end_date
  validate :cannot_overlap_another_event

  def start_date_before_end_date
    if self.start > self.finish
      errors.add("Lopetus ennen aloitusta")
    end
  end
end
