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

  context 'accepts GET to /api/v1/reservations'do
    it 'that returns all reservations on GET to /api/v1/reservations' do
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
  end

  context 'accepts GET to /api/v1/all_my_reservations' do
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
      login user.email, 'salasana1'

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
  end

  context 'accepts POST to /api/v1/reservations' do
    it 'returns 401 when trying to create a reservation without logging' do
      res1
      res2
      res3

      post '/api/v1/reservations', params: { something: {} }

      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end

    it 'returns 201 status and created reservation when logged user creates a reservation' do
      login user.email, 'salasana1'
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
      login user.email, 'salasana1'
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
  end

  context 'accepts DELETE to /api/v1/reservations/:id' do
    it 'returns 401 when trying to destroy a reservation without logging' do
      res1

      delete "/api/v1/reservations/#{res1.id}"

      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end

    it 'returns 203 status when logged user destroys their reservation' do
      login user.email, 'salasana1'
      res1

      expect(Reservation.count).to eq(1)
      delete "/api/v1/reservations/#{res1.id}"

      expect(response).to be_success
      expect(response).to have_http_status(204)

      expect(Reservation.count).to eq(0)
    end

    it 'returns 403 status when logged user destroys someone elses reservation' do
      login user.email, 'salasana1'
      res2

      expect(Reservation.count).to eq(1)
      delete "/api/v1/reservations/#{res2.id}"

      expect(response).to_not be_success
      expect(response).to have_http_status(403)

      expect(Reservation.count).to eq(1)
    end
  end

  context 'accepts PATCH to /api/v1/reservations/:id' do
    it 'returns 401 when trying to update a reservation without logging' do
      res1

      patch "/api/v1/reservations/#{res1.id}", params: { reservation: {} }

      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end

    it 'returns 403 status when logged user updates someone elses reservation' do
      login user.email, 'salasana1'
      res2

      patch "/api/v1/reservations/#{res2.id}", params: { reservation: {} }

      expect(response).to_not be_success
      expect(response).to have_http_status(403)
    end

    it 'returns 204 status and updated reservation when logged user updates a reservation' do
      login user.email, 'salasana1'
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
      login user.email, 'salasana1'
      res1
      new_res = { start: DateTime.now + 2.days + 3.hours, end: DateTime.now + 2.days }

      patch "/api/v1/reservations/#{res1.id}", params: { reservation: new_res }

      json = JSON.parse(response.body)

      expect(response).to_not be_success
      expect(response).to have_http_status(422)

      expect(json.length).to eq(1)
      expect(json[0]).to eq('Loppu tulee olla aloituksen jälkeen')
    end
  end

  context 'accepts POST to /api/v1/joukkoperu' do
    it 'returns 401 when trying to mass_destroy without logging in' do
      post '/api/v1/joukkoperu', params: {}

      expect(response).to_not be_success
      expect(response).to have_http_status(401)
    end

    it 'should delete one reservation when one reservation is during given times' do
      res3
      expect(Reservation.count).to eq 1
      login user.email, 'salasana1'
      post '/api/v1/joukkoperu', params: { start: DateTime.now + 2.days, end: DateTime.now + 2.days + 6.hours, plane_id: res3.plane.id }

      expect(response).to be_success
      expect(response).to have_http_status(204)
      expect(Reservation.count).to eq 0
    end

    it 'should delete all reservations during given times' do
      res3
      FactoryGirl.create(:reservation, plane: res3.plane, start: DateTime.now + 2.days + 1.hour, end: res3.start)
      expect(Reservation.count).to eq 2
      login user.email, 'salasana1'
      post '/api/v1/joukkoperu', params: { start: DateTime.now + 2.days, end: DateTime.now + 2.days + 6.hours, plane_id: res3.plane.id }

      expect(response).to be_success
      expect(response).to have_http_status(204)
      expect(Reservation.count).to eq 0
    end

    it 'gives an error when no reservations are found to be deleted' do
      res1
      res2
      res3
      login user.email, 'salasana1'
      post '/api/v1/joukkoperu', params: { start: DateTime.now + 5.days, end: DateTime.now + 5.days + 6.hours, plane_id: res3.plane.id }


      expect(response).to_not be_success
      expect(response).to have_http_status(404)
      expect(Reservation.count).to eq 3
    end

    it 'only deletes only reservations with given plane_id' do
      res1
      res2
      res3
      login user.email, 'salasana1'
      expect(Reservation.count).to eq 3
      post '/api/v1/joukkoperu', params: { start: DateTime.now + 2.days, end: DateTime.now + 2.days + 6.hours, plane_id: res3.plane.id }

      expect(response).to be_success
      expect(response).to have_http_status(204)
      expect(Reservation.count).to eq 2
    end
  end
end