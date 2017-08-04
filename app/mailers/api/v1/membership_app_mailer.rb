class Api::V1::MembershipAppMailer < ApplicationMailer
  default from: 'notifications@mik.fi'

  def application_received(app)
    @app = app
    mail(to: @app.email, subject: "Jäsenhakemuksenne Malmin Ilmailukerhoon on vastaanotettu")
  end

  def application_received_mod(app)
    @app = app
    mail(to: 'yllapito@mik.fi', subject: "Jäsenhakemus saapunut")
  end
end
