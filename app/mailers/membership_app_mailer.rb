class MembershipAppMailer < ApplicationMailer
  default from: 'notifications@mik.fi'
  def application_received(app)
    @app = app
    mail(to: @app.email, subject: "Jäsenhakemuksenne liittyä Malmin Ilmailukerhoon on vastaanotettu")
  end

  def application_received_mod(app)
    @app = app
    mail(to: 'yllapito@mik.fi', subject: "Jäsenhakemuksenne liittyä Malmin Ilmailukerhoon on vastaanotettu")
  end
end
