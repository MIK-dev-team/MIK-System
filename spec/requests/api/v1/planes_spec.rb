require 'rails_helper'

RSpec.describe 'Planes API' do
  let!(:user){ FactoryGirl.create(:user) }
  let(:plane){ FactoryGirl.create(:plane) }
  let(:res1){ FactoryGirl.create(:reservation, plane: plane, user: user) }
  let(:res2){ FactoryGirl.create(:reservation,
                                 reservation_type: 'harraste',
                                 plane: plane,
                                 start: DateTime.now + 3.days + 3.hours,
                                 end: DateTime.now + 3.days + 5.hours) }

  it 'should return array of reservations on /api/v1/plane/:id/reservations' do
    res1
    res2

    get "/api/v1/planes/#{plane.id}/reservations"

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json.length).to eq(2)
    expect(json[1]['user']['id']).to eq(res2.user.id)
    expect(json[1]['reservation_type']).to eq(res2.reservation_type)
  end

  it 'should return 401 when trying to get my_reservations when not logged in' do
    res1
    res2

    get "/api/v1/planes/#{plane.id}/my_reservations"

    expect(response).to_not be_success
    expect(response).to have_http_status(401)
  end

  it 'should return users reservations when logged in and calling my_reservations' do
    res1
    res2
    login

    get "/api/v1/planes/#{plane.id}/my_reservations"

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json.length).to eq(1)
    expect(json[0]['user']['id']).to eq(user.id)
    expect(json[0]['reservation_type']).to eq(res1.reservation_type)
  end

  private
  def login
    post kirjaudu_path, params: {email: user.email, password: 'salasana1'}
  end
end