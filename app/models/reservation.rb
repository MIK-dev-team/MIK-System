class Reservation < ApplicationRecord
  include Wisper::Publisher
  belongs_to :plane

  after_destroy :publish_reservation_destroyed, on: :destroy

  validates :start, :end, :plane_id, :reservation_type, :user_id, presence: true
  validate :start_date_before_end_date
  validate :cannot_overlap_another_reservation


  scope :in_range, -> range {
    where("(start BETWEEN ? AND ? OR \"end\" BETWEEN ? AND ?) OR (start < ? AND \"end\" > ?)", range.first, range.last, range.first, range.last, range.first, range.last)
  }

  scope :exclude_self, -> id { where.not(id: id) }

  def cannot_overlap_another_reservation
    range = Range.new self.start, self.end
    overlaps = Reservation.exclude_self(id).in_range(range)
    overlap_error unless overlaps.empty?
  end

  def overlap_error
    errors.add(:overlap_error, 'Kyseinen aika on jo varattu')
  end

  def start_date_before_end_date
    if self.start > self.end
      errors.add(:start_date_before_end_date, 'Lopetuksen pitää olla aloituksen jälkeen')
    end
  end

  def as_json(options={})
    super(only: [:id, :start, :end, :reservation_type],
          include: {
              plane: {only: [:id, :name]},
              # user: {only: [:id, :full_name]}
          }
    )
  end

  private
    def publish_reservation_destroyed
      broadcast(:reservation_destroyed)
    end
end
