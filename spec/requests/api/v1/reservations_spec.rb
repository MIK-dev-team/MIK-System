require 'rails_helper'

RSpec.describe 'Reservations API' do
  let!(:user){ FactoryGirl.create(:user) }
  let(:res1){ FactoryGirl.create(:reservation, user: user) }
  let(:res2){ FactoryGirl.create(:reservation,
                                 reservation_type: 'harraste',
                                 start: DateTime.now + 3.days + 3.hours,
                                 end: DateTime.now + 3.days + 5.hours) }
  let(:res3) { FactoryGirl.create(:reservation,
                                  user: user,
                                  start: DateTime.now + 2.days + 4.hours,
                                  end: DateTime.now + 2.days + 5.hours) }

  it 'returns all reservations on GET to /api/v1/reservations' do
    res1
    res2
    res3
    get '/api/v1/reservations'

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json.length).to eq(3)
    expect(json[1]['reservation_type']).to eq('harraste')
  end

  it 'returns 401 when trying to get all_my_reservations without logging' do
    res1
    res2
    res3

    get '/api/v1/all_my_reservations'

    expect(response).to_not be_success
    expect(response).to have_http_status(401)
  end

  it 'returns current_user reservations when logged in and calling all_my_reservations' do
    res1
    res2
    res3
    login

    get '/api/v1/all_my_reservations'

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json.length).to eq(2)
    expect(json[0]['reservation_type']).to eq('opetus')
    expect(json[1]['reservation_type']).to eq('opetus')
    expect(json[0]['user']['id']).to eq(user.id)
    expect(json[1]['user']['id']).to eq(user.id)
  end

  it 'returns 401 when trying to create a reservation without logging' do
    res1
    res2
    res3

    post '/api/v1/reservations', params: { something: {} }

    expect(response).to_not be_success
    expect(response).to have_http_status(401)
  end

  it 'returns 201 status and created reservation when logged user creates a reservation' do
    login
    new_res = FactoryGirl.build(:reservation)

    expect(Reservation.count).to eq(0)
    post '/api/v1/reservations', params: { reservation: new_res.attributes }

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(:created)

    expect(json['user']['id']).to eq(user.id)
    expect(Reservation.count).to eq(1)
  end

  it 'returns 422 and list of errors when trying to create with bad parameters' do
    login
    new_res = { start: DateTime.now + 2.days + 3.hours, end: DateTime.now + 2.days }

    post '/api/v1/reservations', params: { reservation: new_res }

    json = JSON.parse(response.body)

    expect(response).to_not be_success
    expect(response).to have_http_status(422)

    expect(json.length).to eq(4)
    expect(json[0]).to eq('Lentokone ei voi olla tyhjä')
    expect(json[1]).to eq('Plane ei voi olla sisällötön')
    expect(json[2]).to eq('Varauksen tyyppi ei voi olla sisällötön')
    expect(json[3]).to eq('Loppu tulee olla aloituksen jälkeen')
  end

  it 'returns 401 when trying to destroy a reservation without logging' do
    res1

    delete "/api/v1/reservations/#{res1.id}"

    expect(response).to_not be_success
    expect(response).to have_http_status(401)
  end

  it 'returns 203 status when logged user destroys their reservation' do
    login
    res1

    expect(Reservation.count).to eq(1)
    delete "/api/v1/reservations/#{res1.id}"

    expect(response).to be_success
    expect(response).to have_http_status(204)

    expect(Reservation.count).to eq(0)
  end

  it 'returns 403 status when logged user destroys someone elses reservation' do
    login
    res2

    expect(Reservation.count).to eq(1)
    delete "/api/v1/reservations/#{res2.id}"

    expect(response).to_not be_success
    expect(response).to have_http_status(403)

    expect(Reservation.count).to eq(1)
  end

  it 'returns 401 when trying to update a reservation without logging' do
    res1

    patch "/api/v1/reservations/#{res1.id}", params: { reservation: {} }

    expect(response).to_not be_success
    expect(response).to have_http_status(401)
  end

  it 'returns 403 status when logged user updates someone elses reservation' do
    login
    res2

    patch "/api/v1/reservations/#{res2.id}", params: { reservation: {} }

    expect(response).to_not be_success
    expect(response).to have_http_status(403)
  end

  it 'returns 204 status and updated reservation when logged user updates a reservation' do
    login
    res1
    res1.reservation_type = 'harraste'

    expect(Reservation.first.reservation_type).to eq('opetus')
    patch "/api/v1/reservations/#{res1.id}", params: { reservation: res1.attributes }
    expect(Reservation.first.reservation_type).to eq('harraste')

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(200)

    expect(json['user']['id']).to eq(user.id)
    expect(json['reservation_type']).to eq('harraste')
  end

  it 'returns 422 and list of errors when trying to update with bad parameters' do
    login
    res1
    new_res = { start: DateTime.now + 2.days + 3.hours, end: DateTime.now + 2.days }

    patch "/api/v1/reservations/#{res1.id}", params: { reservation: new_res }

    json = JSON.parse(response.body)

    expect(response).to_not be_success
    expect(response).to have_http_status(422)

    expect(json.length).to eq(1)
    expect(json[0]).to eq('Loppu tulee olla aloituksen jälkeen')
  end

  private
  def login
    post api_v1_kirjaudu_path, params: {email: user.email, password: 'salasana1'}
  end
end