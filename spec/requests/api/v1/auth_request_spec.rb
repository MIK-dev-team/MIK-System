require 'rails_helper'

RSpec.describe 'Auth API' do
  let!(:user){ FactoryGirl.create(:user) }

  context 'accepts POST to /api/v1/kirjaudu' do
    it 'that returns 200 when successfully logging in with email' do
      post '/api/v1/kirjaudu', params: {email: user.email, password: 'salasana1'}
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'that returns 200 when successfully logging in with username' do
      post '/api/v1/kirjaudu', params: {email: user.username, password: 'salasana1'}
      expect(response).to be_success
      expect(response).to have_http_status(200)
    end

    it 'that returns 401 when given wrong password' do
      post '/api/v1/kirjaudu', params: {email: user.email, password: 'salasana2'}
      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end

    it 'that returns 401 when given non-existent emails' do
      post '/api/v1/kirjaudu', params: {email: 'some@email.fu', password: 'salasana2'}
      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end
  end

  context 'that accepts DELETE to /api/v1/logout' do
    it 'returns 204' do
      delete '/api/v1/logout'

      expect(response).to be_success
      expect(response).to have_http_status(204)
      expect(session[:user_id]).to be nil
    end

    it 'that deletes user_id from session' do
      post '/api/v1/kirjaudu', params: {email: user.username, password: 'salasana1'}
      expect(session[:user_id]).to eq user.id

      delete '/api/v1/logout'
      expect(session[:user_id]).to be nil
    end
  end
end