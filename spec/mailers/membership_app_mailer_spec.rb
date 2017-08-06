require 'rails_helper'

RSpec.describe Api::V1::MembershipAppMailer, type: :mailer do
  describe 'application_received' do
    let(:app){ FactoryGirl.create(:membership_application) }
    let(:mail){ described_class.application_received(app).deliver_now }

    it 'renders subject' do
      expect(mail.subject).to eq('Jäsenhakemuksenne Malmin Ilmailukerhoon on vastaanotettu')
    end

    it 'renders receiver address' do
      expect(mail.to).to eq([app.email])
    end

    it 'renders sender address' do
      expect(mail.from).to eq(['notifications@mik.fi'])
    end

    it 'contains applicants full nam' do
      expect(mail.body).to have_content(app.full_name)
    end
  end

  describe 'application_received_mod' do
    let(:app){ FactoryGirl.create(:membership_application) }
    let(:mail){ described_class.application_received_mod(app).deliver_now }

    it 'renders subject' do
      expect(mail.subject).to eq('Jäsenhakemus saapunut')
    end

    it 'renders receiver address' do
      expect(mail.to).to eq(['yllapito@mik.fi'])
    end

    it 'renders sender address' do
      expect(mail.from).to eq(['notifications@mik.fi'])
    end

    it 'contains applicants full name' do
      expect(mail.body).to have_content(app.full_name)
    end

    it 'contains applicants created_at date' do
      expect(mail.body).to have_content(app.created_at)
    end
  end
end
