require 'rails_helper'

RSpec.describe 'Updating reservation', js: true do
  let!(:user){ FactoryGirl.create(:user) }
  let(:plane){ FactoryGirl.create(:plane, name: 'OTHR2') }
  let(:plane2){ FactoryGirl.create(:plane, name: 'REST45') }
  let!(:reservation){ FactoryGirl.create(:reservation, user: user) }
  let!(:reservation2){ FactoryGirl.create(:reservation, plane: plane2) }

  it 'should redirect to login page when trying to go to edit page without logging' do
    visit "/varaukset/#{reservation.id}/muokkaa"

    expect(page).to have_content 'Kirjaudu sisään'
    expect(page).to have_content 'Sähköposti'
    expect(page).to have_content 'Salasana'
  end

  it 'should redirect to login page when trying to modify someone elses reservation' do
    log_in
    visit "/varaukset/#{reservation2.id}/muokkaa"

    expect(page).to have_content 'Kirjaudu sisään'
    expect(page).to have_content 'Sähköposti'
    expect(page).to have_content 'Salasana'
  end

  it 'should show current details of a reservation when logged and editing own reservation' do
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"

    expect(page).to have_content 'Muokkaa varausta'
    expect(page).to have_content 'Tallenna varaus'
    expect(page).to have_selector "input[value='#{reservation.start.strftime("%d.%m.%Y")}']"
    expect(page).to have_selector "input[value='#{reservation.end.strftime("%d.%m.%Y")}']"
    expect(page).to have_select('reservation_type', selected: 'opetus')
  end

  it 'saves changed reservation to db when additional_info is changed' do
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"

    expect(Reservation.find(reservation.id).additional_info).to eq(nil)
    fill_in 'additional_info', with: 'Lisää dataaa'
    click_button 'Tallenna varaus'
    expect(page).to have_content 'Varaus muokattu!'
    expect(Reservation.find(reservation.id).additional_info).to eq('Lisää dataaa')
  end

  it 'saves changed reservation to db when start time and end time are changed' do
    original_start = Reservation.find(reservation.id).start
    original_end = Reservation.find(reservation.id).end
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"

    select '18:30', from: 'start'
    select '19:30', from: 'end'

    click_button 'Tallenna varaus'
    expect(page).to have_content 'Varaus muokattu!'
    expect(Reservation.find(reservation.id).start.strftime("%H:%M")).to eq '18:30'
    expect(Reservation.find(reservation.id).end.strftime("%H:%M")).to eq '19:30'
    expect(Reservation.find(reservation.id).start).to_not eq original_start
    expect(Reservation.find(reservation.id).end).to_not eq original_end
  end

  it 'saves changed reservation to db when plane and type are changed' do
    expect(Reservation.find(reservation.id).reservation_type).to eq 'opetus'
    expect(Reservation.find(reservation.id).plane.name).to eq 'EH123'
    plane
    log_in

    visit "/varaukset/#{reservation.id}/muokkaa"

    select 'harraste', from: 'reservation_type'
    select plane.name, from: 'plane'

    click_button 'Tallenna varaus'
    expect(page).to have_content 'Varaus muokattu!'

    expect(Reservation.find(reservation.id).reservation_type).to eq 'harraste'
    expect(Reservation.find(reservation.id).plane_id).to eq plane.id
  end

  it 'displays error correctly given start time that is in the past' do
    orig_start = reservation.start
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"
    page.all(:xpath, "//input[@value='#{reservation.start.strftime('%d.%m.%Y')}']")[0].set("19.08.2017")

    click_button 'Tallenna varaus'
    expect(page).to have_content 'Varauksen alku ei voi olla menneisyydessä'
    expect(Reservation.find(reservation.id).start.strftime('%c')).to eq orig_start.strftime('%c')
  end

  it 'displays error correctly when given end time that is before start' do
    orig_start = reservation.start
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"
    page.all(:xpath,
             "//input[@value='#{reservation.start.strftime('%d.%m.%Y')}']")[0].set(3.days.from_now.strftime('%d.%m.%Y'))

    click_button 'Tallenna varaus'
    expect(page).to have_content 'Varauksen loppu ei voi olla ennen sen alkua'
    expect(Reservation.find(reservation.id).start.strftime('%c')).to eq orig_start.strftime('%c')
  end

  it 'displays error correctly when trying to change reservation in a way that it would overlap with another reservation' do
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"
    select reservation2.plane.name, from: 'plane'

    click_button 'Tallenna varaus'
    expect(page).to have_content 'Aika on jo varattu'
  end

  it 'deletes reservation when Poista button is pressed' do
    expect(Reservation.count).to eq(2)
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"

    click_button 'Poista'
    expect(page).to have_content 'Oletko varma, että haluat poistaa tämän varauksen?'
    find_all('button')[3].trigger('click')
    expect(page).to have_content 'Varaus poistettu'
    expect(Reservation.count).to eq(1)
  end

  it 'can cancel reservation deletion before executing it' do
    expect(Reservation.count).to eq(2)
    log_in
    visit "/varaukset/#{reservation.id}/muokkaa"

    click_button 'Poista'
    expect(page).to have_content 'Oletko varma, että haluat poistaa tämän varauksen?'
    find('button', text: 'Peruuta').trigger('click')
    expect(page).to_not have_content 'Varaus poistettu'
    expect(Reservation.count).to eq(2)
  end

  private
  def log_in
    visit '/kirjaudu'
    fill_in 'Sähköposti', with: 'asdf@asdf.fi'
    fill_in 'Salasana', with: 'salasana1'
    click_button 'Kirjaudu'
    expect(page).to have_content 'Olet kirjautunut sisään!'
  end
end