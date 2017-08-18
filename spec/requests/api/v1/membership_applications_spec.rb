require 'rails_helper'

RSpec.describe 'Membership Applications' do
  let!(:user){ FactoryGirl.create(:user) }

  it 'should succeed and return correct code on succesful creation' do
    new_app = FactoryGirl.build(:membership_application)

    post api_v1_membership_applications_path, params: { membership_application: new_app.attributes }

    json = JSON.parse(response.body)

    expect(response).to be_success
    expect(response).to have_http_status(:created)
    expect(json["username"]).to eq('Käyttis1')
  end

  it 'should return 422 and list of errors when given a non-valid object' do
    new_app = { full_name: 'Minä itse',
                postal_code: 'o12345',
                member_type: 'something wrong',
                birthday: Date.new(1980, 12, 12),
                city: 'Helsinki',
                address: 'Coolstreet, 5 A'
    }

    post api_v1_membership_applications_path, params: { membership_application: new_app }

    json = JSON.parse(response.body)

    expect(response).to_not be_success
    expect(response).to have_http_status(:unprocessable_entity)

    expect(json.length).to eq(5)
    expect(json[0]).to eq('Sähköpostiosoite ei voi olla sisällötön')
    expect(json[1]).to eq('Puhelinnumero ei voi olla sisällötön')
    expect(json[2]).to eq('Postinumero on väärän pituinen (täytyy olla täsmälleen 5 merkkiä)')
    expect(json[3]).to eq('Postinumero ei ole luku')
    expect(json[4]).to eq('Jäsenyyden tyyppi pitää olla valittu')
  end
end