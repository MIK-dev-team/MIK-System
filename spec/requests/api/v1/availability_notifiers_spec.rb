require 'rails_helper'

RSpec.describe 'AvailabilityNotifier API' do
  let!(:user){ FactoryGirl.create(:user) }

  context 'when creating' do
    it 'returns 401 if user is not authenticated' do
      post '/api/v1/availability_notifiers', params: {}

      expect(response).to_not be_success
      expect(response).to have_http_status 401
    end

    it 'return created notifier with correct status on successful create when logged in' do
      login
      plane = FactoryGirl.create(:plane)
      post_params = {start: DateTime.now - 1.day, notifier_type: 'any', plane_id: plane.id}

      post '/api/v1/availability_notifiers', params: { availability_notifier: post_params }

      json = JSON.parse(response.body)

      expect(response).to_not be_success
      expect(response).to have_http_status 422

      expect(json.length).to eq(2)
      expect(json[0]).to eq('Loppu ei voi olla sisällötön')
      expect(json[1]).to eq('Alku ei saa olla menneisyydessä')
    end

    it 'returns an array of errors when given object is invalid' do
      login
      new_notifier = FactoryGirl.build(:availability_notifier)

      post '/api/v1/availability_notifiers', params: { availability_notifier: new_notifier.attributes }

    end
  end

  context 'when deleting' do
    it 'returns 401 if user is not authenticated' do
      notifier = FactoryGirl.create(:availability_notifier)
      delete api_v1_availability_notifier_path(notifier)

      expect(response).to_not be_success
      expect(response).to have_http_status 401
    end
  end

  private
  def login
    post api_v1_kirjaudu_path, params: {email: user.email, password: 'salasana1'}
  end
end