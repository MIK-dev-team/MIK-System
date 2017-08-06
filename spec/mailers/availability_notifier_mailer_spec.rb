require 'rails_helper'

RSpec.describe Api::V1::AvailabilityNotifierMailer, type: :mailer do
  describe 'time_available' do
    let(:notifier){ FactoryGirl.create(:availability_notifier) }
    let(:mail){ described_class.time_available(notifier).deliver_now }

    it 'renders subject' do
      expect(mail.subject).to eq('Tarkkailemanne aika on vapautunut')
    end

    it 'renders receiver address' do
      expect(mail.to).to eq(['user@email.address'])
    end

    it 'renders sender address' do
      expect(mail.from).to eq(['notifications@mik.fi'])
    end

    it 'contains notifiers time frame' do
      expect(mail.body).to have_content(notifier.start.to_s + '-' + notifier.end.to_s)
    end
  end
end