class Api::V1::AvailabilityNotifierMailer < ApplicationMailer
  default from: 'notifications@mik.fi'

  def time_available(notifier)
    @notifier = notifier
    # mail(to: @notifier.user.email, subject: "Tarkkailemanne aika on vapautunut")
    # As a placeholder (use the above when users exist):
    puts @notifier
    mail(to: "user@email.address", subject: "Tarkkailemanne aika on vapautunut")
  end
end