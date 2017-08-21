require 'rails_helper'

RSpec.describe 'Reservation listing page', js: true do
  let(:all_notifier){ FactoryGirl.build(:availability_notifier) }
  let!(:user){ FactoryGirl.create(:user) }
  let!(:reservation){ FactoryGirl.build(:reservation, user: user) }

  it 'should have correct static content' do
    log_in
    visit '/varaukset'
    expect(page).to have_content 'Varaukset'
    expect(page).to have_content 'Alkamisaika'
    expect(page).to have_content 'Loppumisaika'
  end

  it 'should show reservation information' do
    reservation.save
    log_in
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

  it "should not show reservation information of someone else's reservation" do
    not_shown_reservation = FactoryGirl.create(:reservation)
    expect(not_shown_reservation.user_id).not_to eq(reservation.user_id)
    log_in
    visit '/varaukset'
    expect(page).not_to have_content 'opetus'
    expect(page).not_to have_content 'klo'
    expect(page).not_to have_content "#{reservation.start.hour}."
    expect(page).not_to have_content "#{reservation.end.hour}."
    expect(page).not_to have_content reservation.start.day
    expect(page).not_to have_content reservation.start.year
    expect(page).not_to have_content reservation.end.day
    expect(page).not_to have_content reservation.end.year
    expect(Reservation.count).to eq(1)
  end

  it 'has option to delete reservations' do
    reservation.save
    expect(Reservation.count).to eq(1)
    log_in
    visit '/varaukset'
    expect(page).to have_content 'Poista'
    click_button 'Poista'
    expect(page).not_to have_content 'opetus'
    expect(page).not_to have_content 'klo'
    expect(page).not_to have_content "#{reservation.start.hour}."
    expect(page).not_to have_content "#{reservation.end.hour}."
    expect(page).not_to have_content reservation.start.day
    expect(page).not_to have_content reservation.start.year
    expect(page).not_to have_content reservation.end.day
    expect(page).not_to have_content reservation.end.year
    expect(Reservation.count).to eq(0)
  end

  it 'should redirect to to login page when not logged in' do
    visit '/varaukset'
    expect(page).to have_current_path kirjaudu_path
    expect(page).to have_content 'Kirjaudu sisään'
  end

  private
  def log_in
    visit '/kirjaudu'
    fill_in 'Käyttäjätunnus/Sähköposti', with: 'asdf@asdf.fi'
    fill_in 'Salasana', with: 'salasana1'
    click_button 'Kirjaudu'
    expect(page).to have_content 'Olet kirjautunut sisään!'
  end
end