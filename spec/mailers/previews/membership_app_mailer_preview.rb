# Preview all emails at http://localhost:3000/rails/mailers/membership_app_mailer
class MembershipAppMailerPreview < ActionMailer::Preview

  def application_received
    MembershipAppMailer.application_received(MembershipApplication.first)
  end

  def application_received_mod
    MembershipAppMailer.application_received_mod(MembershipApplication.first)
  end
end
