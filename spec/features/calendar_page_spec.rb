require 'rails_helper'

RSpec.describe 'Calendar page', js: true do
  let(:last_date_of_month){ DateTime.new(Date.today.year, Date.today.month, -1) }
  let!(:plane){ FactoryGirl.create(:plane, name: 'OTHR12') }
  let!(:reservation) do
    res = FactoryGirl.build(:reservation,
                            plane: plane,
                            start: DateTime.now.change({ hour: 13 }),
                            end: DateTime.now.change({ hour: 15 }),
                            additional_info: 'Some extra info')
    res.save(validate: false)
    res
  end

  it 'shows reservation in calendar' do
    visit '/varauskalenteri'
    expect(page).to have_content 'Näytä kaikki'
    expect(page).to have_content 'opetus'
    expect(page).to have_content '13.00 — 15.00'
  end

  it 'shows reservations with different planes in calendar initially' do
    anotherPlane = FactoryGirl.create(:plane, name: 'PLN123')
    anotherRes = FactoryGirl.build(:reservation, plane: anotherPlane,
                                   start: DateTime.now.change({ hour: 15 }),
                                   end: DateTime.now.change({ hour: 17 }),
                                   reservation_type: 'harraste')
    anotherRes.save(validate: false)

    visit '/varauskalenteri'
    expect(page).to have_content 'Näytä kaikki'
    expect(page).to have_content 'opetus'
    expect(page).to have_content '13.00 — 15.00'
    expect(page).to have_content 'harraste'
    expect(page).to have_content '15.00 — 17.00'
  end

  it 'does not show reservations that have different planes when clicking on one plane' do
    anotherPlane = FactoryGirl.create(:plane, name: 'PLN123')
    anotherRes = FactoryGirl.build(:reservation, plane: anotherPlane,
                                   start: DateTime.now.change({ hour: 15 }),
                                   end: DateTime.now.change({ hour: 17 }),
                                   reservation_type: 'harraste')
    anotherRes.save(validate: false)

    visit '/varauskalenteri'
    click_button 'OTHR12'
    expect(page).to have_content 'Näytä kaikki'
    expect(page).to have_content 'opetus'
    expect(page).to have_content '13.00 — 15.00'
    expect(page).to_not have_content 'harraste'
    expect(page).to_not have_content '15.00 — 17.00'
  end

  it 'shows all reservation information when clicking reservation in calendar' do
    visit '/varauskalenteri'
    expect(page).to_not have_content 'Some extra info'
    find(:xpath, "//div[@title='13.00 — 15.00: opetus']").click
    expect(page).to have_content 'Varauksen tiedot'
    expect(page).to have_content 'Some extra info'
  end

  it 'does not have a button to edit reservation when clicking on reservation' do
    visit '/varauskalenteri'
    expect(page).to_not have_content 'Some extra info'
    find(:xpath, "//div[@title='13.00 — 15.00: opetus']").click
    expect(page).to have_content 'Varauksen tiedot'
    expect(page).to_not have_button 'Muokkaa'
  end

  it 'has a disabled button below calendar that expands reservation form when not logged' do
    visit '/varauskalenteri'
    expect(page).to have_button 'Näytä varauksesi tiedot', disabled: true
  end

  context 'while logged in' do
    let!(:user){ FactoryGirl.create(:user) }

    before :each do
      login user.email, 'salasana1'
    end

    it 'has button to show reservation form that is not disabled' do
      visit '/varauskalenteri'
      expect(page).to have_button 'Näytä varauksesi tiedot', disabled: false
    end

    it 'should be able to see reservation form when clicking button to show it' do
      visit '/varauskalenteri'
      expect(page).to_not have_content 'Lennon alkupäivä'
      expect(page).to_not have_content 'Lennon alkuaika'
      click_button 'Näytä varauksesi tiedot'
      expect(page).to have_content 'Alkupäivämäärä'
      expect(page).to have_content 'Alkuaika'
      expect(page).to have_content 'Loppupäivämäärä'
      expect(page).to have_content 'Loppuaika'
      expect(page).to have_content 'Tyyppi'
      expect(page).to have_content 'Lisätiedot'
    end

    it 'has a button to edit reservation when clicking on reservation' do
      visit '/varauskalenteri'
      expect(page).to_not have_content 'Some extra info'
      find(:xpath, "//div[@title='13.00 — 15.00: opetus']").click
      expect(page).to have_content 'Varauksen tiedot'
      expect(page).to have_button 'Muokkaa'
    end

    it 'does not have button to edit reservation when clicking on reservation when reservation not own' do
      res = FactoryGirl.build(:reservation,
                              plane: plane,
                              start: DateTime.now.change({ hour: 16 }),
                              end: DateTime.now.change({ hour: 17 }),
                              additional_info: 'Some other info')
      res.save(validate: false)
      visit '/varauskalenteri'
      find(:xpath, "//div[@title='16.00 — 17.00: opetus']").click
      expect(page).to have_content 'Varauksen tiedot'
      expect(page).to have_content 'Some other info'
      expect(page).to_not have_button 'Muokkaa'
    end

    # TODO: this will not work if you run it on the last day of the month after 18:00. Could not figure out how to
    # get capybara to click datepicker to next month and then find the date.
    it 'saves new reservation in database when form filled correctly' do
      visit '/varauskalenteri'
      click_button 'Näytä varauksesi tiedot'

      fill_date_picker 'res-start-date', last_date_of_month.day
      fill_date_picker 'res-end-date', last_date_of_month.day
      select '18:00', from: 'start'
      select '20:30', from: 'end'
      select 'OTHR12', from: 'plane_id'
      click_button 'Tallenna varaus'
      expect(page).to have_content 'Varaus tallennettu'
      expect(Reservation.last.reservation_type).to eq 'harraste'
      expect(Reservation.last.end).to eq last_date_of_month.strftime("%F 20:30:00.000000000 +0000")
      expect(Reservation.last.start).to eq last_date_of_month.strftime("%F 18:00:00.000000000 +0000")
    end

    it 'shows error message when end before start' do
      visit '/varauskalenteri'
      click_button 'Näytä varauksesi tiedot'

      fill_date_picker 'res-start-date', last_date_of_month.day
      fill_date_picker 'res-end-date', last_date_of_month.day
      select '20:00', from: 'start'
      select '18:30', from: 'end'
      select 'OTHR12', from: 'plane_id'
      click_button 'Tallenna varaus'
      expect(page).to have_content 'Lähetysvirhe'
      expect(page).to have_content 'Loppu tulee olla aloituksen jälkeen'
      expect(page).to_not have_content 'Varaus tallennettu'
    end

    context 'using mass-destruction' do
      it 'shows correct elements when selecting mass-destruction' do
        visit '/varauskalenteri'
        click_button 'Näytä varauksesi tiedot'
        click_on 'Joukkoperuminen'

        expect(page).to have_content 'Poista varaukset'
        expect(page).to have_content 'Peru varaukset'
        expect(page).to have_content 'Perumisen syy'
        expect(page).to_not have_content 'Tyyppi'
      end

      it 'destroys one reservation when its within given destruction time' do
        visit '/varauskalenteri'
        click_button 'Näytä varauksesi tiedot'
        click_on 'Joukkoperuminen'

        fill_date_picker 'res-start-date', Date.today.day
        fill_date_picker 'res-end-date', Date.today.day
        select '12:00', from: 'start'
        select '15:30', from: 'end'
        select 'OTHR12', from: 'plane_id'
        expect(Reservation.count).to eq 1
        click_button 'Poista varaukset'
        expect(page).to have_content 'Varaukset poistettu'
        expect(Reservation.count).to eq 0
      end

      it 'destroys several reservations when they are within given destruction time' do
        anotherRes = FactoryGirl.build(:reservation, plane: plane,
                           start: DateTime.now.change({ hour: 15 }),
                                       end: DateTime.now.change({ hour: 17 }))
        anotherRes.save(validate: false)
        visit '/varauskalenteri'
        click_button 'Näytä varauksesi tiedot'
        click_on 'Joukkoperuminen'

        fill_date_picker 'res-start-date', Date.today.day
        fill_date_picker 'res-end-date', Date.today.day
        select '12:00', from: 'start'
        select '18:30', from: 'end'
        select 'OTHR12', from: 'plane_id'
        expect(Reservation.count).to eq 2
        click_button 'Poista varaukset'
        expect(page).to have_content 'Varaukset poistettu'
        expect(Reservation.count).to eq 0
      end

      it 'destroys only reservation with appropriate plane when it is within given destruction time' do
        anotherPlane = FactoryGirl.create(:plane, name: 'PLN123')
        anotherRes = FactoryGirl.build(:reservation, plane: anotherPlane,
                                       start: DateTime.now.change({ hour: 15 }),
                                       end: DateTime.now.change({ hour: 17 }))
        anotherRes.save(validate: false)
        visit '/varauskalenteri'
        click_button 'Näytä varauksesi tiedot'
        click_on 'Joukkoperuminen'

        fill_date_picker 'res-start-date', Date.today.day
        fill_date_picker 'res-end-date', Date.today.day
        select '12:00', from: 'start'
        select '18:30', from: 'end'
        select 'OTHR12', from: 'plane_id'
        expect(Reservation.count).to eq 2
        click_button 'Poista varaukset'
        expect(page).to have_content 'Varaukset poistettu'
        expect(Reservation.count).to eq 1
        expect(Reservation.first.plane.name).to eq 'PLN123'
      end

      it 'shows error when trying to delete non-existent times' do
        visit '/varauskalenteri'
        click_button 'Näytä varauksesi tiedot'
        click_on 'Joukkoperuminen'

        fill_date_picker 'res-start-date', Date.today.day
        fill_date_picker 'res-end-date', Date.today.day
        select '22:00', from: 'start'
        select '23:00', from: 'end'
        select 'OTHR12', from: 'plane_id'
        expect(Reservation.count).to eq 1
        click_button 'Poista varaukset'
        expect(page).to have_content 'Poistovirhe'
        expect(page).to have_content 'Yhtään varausta ei löytynyt'
        expect(Reservation.count).to eq 1
      end
    end
  end

  private

  def fill_date_picker(id, day)
    find(:xpath, "//form/div[@id='#{id}']/span/input").click
    find_all('td', text: day.to_s)[0].click
  end
end