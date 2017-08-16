require 'rails_helper'

RSpec.describe 'Membership Application page', js: true do
  let(:valid_app){ FactoryGirl.build(:membership_application) }

  before :each do
    visit '/liity'
  end


  it 'should have correct static elements' do
    expect(page).to have_content 'Liity jäseneksi!'
    expect(page).to have_content 'Käyttäjätunnus'
    expect(page).to have_content 'Sähköpostiosoite'
    expect(page).to have_content 'Suomen Ilmailuliitto ry - SIL - on urheilu- ja harrasteilmailun'
  end

  it 'saves a new application in the db when form filled with valid fields' do
    fill_form valid_app

    click_button('Lähetä hakemus')

    expect(page).to have_content('Hakemuksenne on lähetetty onnistuneesti')

    expect(MembershipApplication.count).to eq(1)
    expect(MembershipApplication.first.username).to eq(valid_app.username)
    expect(MembershipApplication.first.email).to eq(valid_app.email)

  end

  it 'sends two emails when application is succesfully saved' do
    message_delivery = instance_double(ActionMailer::MessageDelivery)
    allow(message_delivery).to receive(:deliver_later)
    fill_form valid_app

    click_button('Lähetä hakemus')

    expect(Api::V1::MembershipAppMailer).to receive(:application_received).and_return(message_delivery)
    expect(Api::V1::MembershipAppMailer).to receive(:application_received_mod).and_return(message_delivery)
  end

  it 'saves optional detail in the database if given as well' do
    fill_form valid_app
    fill_in 'Nykyiset lupakirjaluokat', with: 'some kinda licences'

    click_button('Lähetä hakemus')

    expect(page).to have_content('Hakemuksenne on lähetetty onnistuneesti')

    expect(MembershipApplication.count).to eq(1)
    expect(MembershipApplication.first.licences).to eq('some kinda licences')
  end

  it 'displays error when a field is not valid' do
    valid_app.username = 'short'
    fill_form valid_app

    click_on('Lähetä hakemus')

    check_filling_error
    expect(page).to have_content('Tarkasta täyttämäsi kentät')
  end

  it 'displays correct error when member_type is not set' do
    valid_app.member_type = '** Valitse jäsenlaji **'
    fill_form valid_app

    click_on('Lähetä hakemus')

    check_filling_error
    expect(page).to have_content 'Valitse jäsenyyden tyyppi'
  end

  it 'displays error when email and repeat email do not match when submitting' do
    fill_in 'Käyttäjätunnus', with: valid_app.username
    fill_in 'Sähköpostiosoite', with: valid_app.email
    fill_in 'Kirjoita sähköpostiosoite uudelleen', with: 'wrong@email.com'
    fill_in 'Koko nimi', with: valid_app.full_name
    fill_in 'Syntymäaika (pp.kk.vvvv)', with: valid_app.birthday.strftime("%d.%m.%Y")
    select valid_app.member_type, from: 'Jäsenlaji'
    fill_in 'Osoite', with: valid_app.address
    fill_in 'Postinumero', with: valid_app.postal_code
    fill_in 'Postitoimipaikka', with: valid_app.city
    fill_in 'Puhelinnumero', with: valid_app.phone

    click_on('Lähetä hakemus')

    check_filling_error
    sleep 1
    expect(page).to have_content('Tarkasta täyttämäsi kentät')
  end

  private

  def fill_form info
    fill_in 'Käyttäjätunnus', with: info.username
    fill_in 'Sähköpostiosoite', with: info.email
    fill_in 'Kirjoita sähköpostiosoite uudelleen', with: info.email
    fill_in 'Koko nimi', with: info.full_name
    fill_in 'Syntymäaika (pp.kk.vvvv)', with: info.birthday.strftime("%d.%m.%Y")
    select info.member_type, from: 'Jäsenlaji'
    fill_in 'Osoite', with: info.address
    fill_in 'Postinumero', with: info.postal_code
    fill_in 'Postitoimipaikka', with: info.city
    fill_in 'Puhelinnumero', with: info.phone
  end

  def check_filling_error
    expect(MembershipApplication.count).to eq(0)
  end
end