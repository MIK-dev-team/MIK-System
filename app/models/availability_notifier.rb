class AvailabilityNotifier < ApplicationRecord
  belongs_to :user
  belongs_to :plane
  validates :user_id, :start, :end, :notifier_type, :plane_id, presence: true
  validates :notifier_type, inclusion: { in: ['all', 'any'] }
  validate :not_in_the_past

  def not_in_the_past
    if not self.start.nil? and self.start < DateTime.now
      errors.add(:start, 'ei saa olla menneisyydessä')
    end
  end
end
