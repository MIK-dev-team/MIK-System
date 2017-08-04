class AvailabilityNotifier < ApplicationRecord
  # belongs_to :user
  belongs_to :plane
  validates :user_id, :start, :end, :notifier_type, presence: true
  validates :notifier_type, inclusion: { in: ['all', 'any'] }
  validate :not_in_the_past

  def not_in_the_past
    if self.start < DateTime.now
      errors.add(:observing_the_past, 'Älä tarkkaile menneisyyttä')
    end
  end
end
