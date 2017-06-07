class Reservation < ApplicationRecord
  belongs_to :plane

  validate :start_date_before_end_date

  def start_date_before_end_date
    if self.start > self.finish
      errors.add("Lopetus ennen aloitusta")
<<<<<<< HEAD

=======
>>>>>>> afdf936923cb4b55b110694f46287f5f0e81d94f
    end
  end
end
