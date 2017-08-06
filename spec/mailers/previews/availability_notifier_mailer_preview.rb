# Preview all emails at http://localhost:3000/rails/mailers/availability_notifier_mailer
class Api::V1::AvailabilityNotifierMailerPreview < ActionMailer::Preview

  def time_available
    AvailabilityNotifierMailer.time_available(AvailabilityNotifier.first)
  end
end