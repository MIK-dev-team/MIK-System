require 'rails_helper'

RSpec.describe 'Reservation listing page', js: true do
  let(:all_notifier){ FactoryGirl.build(:availability_notifier) }
  let!(:user){ FactoryGirl.create(:user) }
  let!(:reservation){ FactoryGirl.build(:reservation, user: user, additional_info: 'Something really special') }

  it 'is accessible to a logged user from the frontpage' do
    login user.email, 'salasana1'
    visit '/'
    expect(page).to have_content 'Näytä varauksesi tiedot'
    click_on 'Varaukset'
    expect(page).to have_current_path '/varaukset'
  end

  it 'is not accessible to a user that is not logged it' do
    visit '/varaukset'
    expect(page).to have_current_path '/kirjaudu'
  end

  it 'has correct static content' do
    login user.email, 'salasana1'
    visit '/varaukset'
    expect(page).to have_content 'Varaukset'
    expect(page).to have_content 'Alkamisaika'
    expect(page).to have_content 'Loppumisaika'
  end

  it 'shows reservation information' do
    reservation.save
    login user.email, 'salasana1'
    visit '/varaukset'
    expect(page).to have_content 'opetus'
    expect(page).to have_content 'klo'
    expect(page).to have_content "#{reservation.start.hour}."
    expect(page).to have_content "#{reservation.end.hour}."
    expect(page).to have_content reservation.start.day
    expect(page).to have_content reservation.start.year
    expect(page).to have_content reservation.end.day
    expect(page).to have_content reservation.end.year
  end

  it "does not show reservation information of someone else's reservation" do
    reservation.save
    not_shown_reservation = FactoryGirl.create(:reservation, reservation_type: 'harraste')
    expect(not_shown_reservation.user_id).not_to eq(reservation.user_id)
    login user.email, 'salasana1'
    visit '/varaukset'
    expect(page).to have_content 'opetus'
    expect(page).to_not have_content 'harraste'
    expect(page.all('tbody tr').count).to eq 1
    expect(Reservation.count).to eq(2)
  end

  it 'has option to delete reservations' do
    reservation.save
    expect(Reservation.count).to eq(1)
    login user.email, 'salasana1'
    visit '/varaukset'
    expect(page).to have_content 'Poista'
    expect(page.all('tbody tr').count).to eq 1
    click_button 'Poista'
    expect(page).to_not have_content 'opetus'
    expect(page.find('tbody tr', text: ''))
    expect(Reservation.count).to eq(0)
  end

  it 'redirects to to login page when not logged in' do
    visit '/varaukset'
    expect(page).to have_current_path kirjaudu_path
    expect(page).to have_content 'Kirjaudu sisään'
  end

  it 'shows detailed reservation information when clicking on a reservation' do
    reservation.save
    login user.email, 'salasana1'
    visit '/varaukset'
    find_all('tbody td')[0].click
    expect(page).to have_content 'Something really special'
    expect(page).to have_button 'Muokkaa'
  end
end