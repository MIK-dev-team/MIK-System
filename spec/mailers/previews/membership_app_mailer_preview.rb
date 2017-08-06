# Preview all emails at http://localhost:3000/rails/mailers/membership_app_mailer
class Api::V1::MembershipAppMailerPreview < ActionMailer::Preview

  def application_received
    MembershipAppMailer.application_received(MembershipApplication.first)
  end
end
