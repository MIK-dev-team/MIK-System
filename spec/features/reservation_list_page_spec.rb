require 'rails_helper'

RSpec.describe 'Reservation listing page', js: true do
  let(:all_notifier){ FactoryGirl.build(:availability_notifier) }
  let(:reservation){ FactoryGirl.build(:reservation) }

  # before :each do
  #   visit '/varaukset'
  # end

  it 'should have correct static content' do
    visit '/varaukset'
    expect(page).to have_content 'Varaukset'
    expect(page).to have_content 'Alkamisaika'
    expect(page).to have_content 'Loppumisaika'
  end

  it 'should show reservation information' do
    reservation.save
    visit '/varaukset'
    expect(page).to have_content 'opetus'
    expect(page).to have_content '7. kesä 2018, klo 12.42'
    expect(page).to have_content '7. kesä 2018, klo 14.42'
  end

  it 'has option to delete reservations' do
    reservation.save
    expect(Reservation.count).to eq(1)
    visit '/varaukset'
    click_button 'Poista'
    sleep 5
    expect(Reservation.count).to eq(0)
    expect(page).to_not have_content 'opetus'
    expect(page).to_not have_content '7. kesä 2018, klo 12.42'
    expect(page).to_not have_content '7. kesä 2018, klo 14.42'
  end
end