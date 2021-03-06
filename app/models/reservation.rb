class Reservation < ApplicationRecord
  include Wisper::Publisher
  belongs_to :plane
  belongs_to :user

  after_destroy :publish_reservation_destroyed, on: :destroy

  validates :start, :end, :plane_id, :reservation_type, :user_id, presence: true
  validate :start_date_before_end_date
  validate :cannot_overlap_another_reservation


  scope :in_range, -> range do
    where("(start >= ? AND start < ?) OR (\"end\" > ? AND \"end\" <= ?) OR (start <= ? AND \"end\" >= ?)", range.first, range.last, range.first, range.last, range.first, range.last)
  end

  scope :same_plane, -> plane do
    where(plane: plane)
  end

  scope :exclude_self, -> id { where.not(id: id) }

  def cannot_overlap_another_reservation
    range = Range.new self.start, self.end
    overlaps = Reservation.exclude_self(id).same_plane(plane).in_range(range)
    overlap_error unless overlaps.empty?
  end

  def overlap_error
    errors.add(:aika, 'on jo varattu')
  end

  def start_date_before_end_date
    if not self.start.nil? and not self.end.nil? and self.start > self.end
      errors.add(:end, 'tulee olla aloituksen jälkeen')
    end
  end

  def as_json(options={})
    super(only: [:id, :start, :end, :reservation_type, :additional_info],
          include: {
              plane: {only: [:id, :name]},
              user: {only: [:id, :full_name]}
          }
    )
  end

  private
    def publish_reservation_destroyed
      broadcast(:reservation_destroyed, self)
      broadcast(:reservation_destroyed_for_log, self, false)
    end
end
