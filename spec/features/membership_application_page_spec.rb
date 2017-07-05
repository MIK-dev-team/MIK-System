require 'rails_helper'

RSpec.describe 'Membership Application page', js: true do
  let(:valid_app){ FactoryGirl.build(:membership_application) }



  it 'should have correct static elements' do
    visit '/liity'
    expect(page).to have_content 'Liity jäseneksi!'
    expect(page).to have_content 'Käyttäjätunnus'
    expect(page).to have_content 'Sähköpostiosoite'
    expect(page).to have_content 'Suomen Ilmailuliitto ry - SIL - on urheilu- ja harrasteilmailun'
  end

  # it 'saves a new application in the db when form filled with valid fields' do
  #   visit '/liity'
  #   fill_in 'Käyttäjätunnus', with: valid_app.username
  #   fill_in 'Sähköpostiosoite', with: valid_app.email
  #   fill_in 'Kirjoita sähköpostiosoite uudelleen', with: valid_app.email
  #   fill_in 'Koko nimi', with: valid_app.full_name
  #   fill_in 'Syntymäaika (pp.kk.vvvv)', with: '10.10.1998'
  #   select valid_app.member_type, from: 'Jäsenlaji'
  #   fill_in 'Osoite', with: valid_app.address
  #   fill_in 'Postinumero', with: valid_app.postal_code
  #   fill_in 'Postitoimipaikka', with: valid_app.city
  #   fill_in 'Puhelinnumero', with: valid_app.phone
  #
  #   click_on('Lähetä hakemus')
  #   sleep 60
  #
  #   expect(page).to have_content('Hakemuksenne on onnistuneesti lähetetty')
  #
  #   # expect(MembershipApplication.count).to eq(1)
  #   # expect(MembershipApplication.first.username).to eq(valid_app.username)
  #   # expect(MembershipApplication.first.email).to eq(valid_app.email)
  # end
end