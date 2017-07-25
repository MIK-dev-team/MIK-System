require 'rails_helper'

RSpec.describe MembershipApplication, type: :model do
  let(:app){ FactoryGirl.build(:membership_application) }
  it "is saved in db when valid" do
    app.save
    expect(app).to be_valid
    expect(MembershipApplication.count).to eq(1)
  end

  it 'is saved in db even if username is not given' do
    app.username = nil
    app.save
    expect(app).to be_valid
    expect(MembershipApplication.count).to eq(1)
  end

  it 'is not valid when username too short' do
    app.username = 'lyhyt'
    expect(app).to_not be_valid
  end

  it 'is not valid when username is too long' do
    app.username = 'asdfasdfasdfasdfasdfasdfas'
    expect(app).to_not be_valid
  end

  it 'is not valid without email' do
    app.email = nil
    expect(app).to_not be_valid
  end

  it 'is not valid without phone number' do
    app.phone = nil
    expect(app).to_not be_valid
  end

  it 'is not valid if email already exists' do
    app.save
    app2 = FactoryGirl.build(:membership_application2, email: "asdf@asdf.fi")
    expect(app2).to_not be_valid
  end

  it 'is not valid if username already exists' do
    app.save
    app2 = FactoryGirl.build(:membership_application2, username: "Käyttis1")
    expect(app2).to_not be_valid
  end

  it 'is not valid if postal_code is wrong length' do
    app.postal_code = "1234"
    expect(app).to_not be_valid
    app.postal_code = "123456"
    expect(app).to_not be_valid
  end

  it 'is not valid if postal_code has something other than numbers' do
    app.postal_code = "1234r"
    expect(app).to_not be_valid
  end

  it 'is not valid if member_type is not among accepted types' do
    app.member_type = "Superjäsen"
    expect(app).to_not be_valid
  end

  it 'is valid with sil_number set' do
    app.sil_membership_number = "12345"
    expect(app).to be_valid
  end

  it 'is not valid if sil_number has letters in it' do
    app.sil_membership_number = "asdf"
    expect(app).to_not be_valid
  end

  it 'is not valid if sil_number has dash in it' do
    app.sil_membership_number = "12345-12345"
    expect(app).to_not be_valid
  end

  it 'is not valid if join_sil has wrong value' do
    app.join_sil = 'wrongValue'
    expect(app).to_not be_valid
  end

  it 'is valid with correct join_sil values' do
    app.join_sil = 'willJoin'
    expect(app).to be_valid
    app.join_sil = 'willNotJoin'
    expect(app).to be_valid
    app.join_sil = 'alreadyMember'
    expect(app).to be_valid
  end
end
