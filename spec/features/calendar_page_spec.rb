require 'rails_helper'

RSpec.describe 'Calendar page', js: true do
  let!(:plane){ FactoryGirl.create(:plane, name: 'OTHR12') }
  let!(:reservation) do
    res = FactoryGirl.build(:reservation,
                            start: DateTime.now.change({ hour: 13 }),
                            end: DateTime.now.change({ hour: 15 }),
                            additional_info: 'Some extra info')
    res.save(validate: false)
    res
  end

  it 'should have should reservation in calendar' do
    visit '/varauskalenteri'
    expect(page).to have_content 'Näytä kaikki'
    expect(page).to have_content 'opetus'
    expect(page).to have_content '13.00 — 15.00'
  end

  it 'should show all reservation information when clicking reservation in calendar' do
    visit '/varauskalenteri'
    expect(page).to_not have_content 'Some extra info'
    find(:xpath, "//div[@title='13.00 — 15.00: opetus']").click
    expect(page).to have_content 'Varauksen tiedot'
    expect(page).to have_content 'Some extra info'
  end

  it 'should have a disabled button below calendar that expands reservation form when not logged' do
    visit '/varauskalenteri'
    expect(page).to have_button 'Näytä varauksesi tiedot', disabled: true
  end

  context 'while logged in' do
    let!(:user){ FactoryGirl.create(:user) }

    before :each do
      log_in
    end

    it 'should have button to show reservation form that is not disabled' do
      visit '/varauskalenteri'
      expect(page).to have_button 'Näytä varauksesi tiedot', disabled: false
    end

    it 'should be able to see reservation form when clicking button to show it' do
      visit '/varauskalenteri'
      expect(page).to_not have_content 'Lennon alkupäivä'
      expect(page).to_not have_content 'Lennon alkuaika'
      click_button 'Näytä varauksesi tiedot'
      expect(page).to have_content 'Lennon alkupäivä'
      expect(page).to have_content 'Lennon alkuaika'
      expect(page).to have_content 'Lennon loppupäivä'
      expect(page).to have_content 'Lennon loppuaika'
      expect(page).to have_content 'Lennon tyyppi'
      expect(page).to have_content 'Lisätietoja'
    end
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