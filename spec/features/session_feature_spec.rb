require 'rails_helper'

RSpec.describe 'Session action', js: true do
  let!(:user){ FactoryGirl.create(:user) }
  context 'login' do
    it 'can be accessed by anyone' do
      visit '/'
      expect(page).to have_content 'Kirjaudu'
      expect(page).to have_content 'Liity!'
      click_on 'Kirjaudu'
      expect(page).to have_current_path '/kirjaudu'
      expect(page).to have_content 'Kirjaudu sisään'
    end

    it 'displays error when logging with wrong password' do
      visit '/kirjaudu'
      find('input[name="email"]').set(user.email)
      find('input[name="password"]').set('salasana2')
      click_button 'Kirjaudu'
      expect(page).to have_content 'Kirjautumistiedoissa on virhe'
    end

    it 'displays error when logging with wrong non-existent email' do
      visit '/kirjaudu'
      find('input[name="email"]').set('wrong@email.fu')
      find('input[name="password"]').set('salasana1')
      click_button 'Kirjaudu'
      expect(page).to have_content 'Kirjautumistiedoissa on virhe'
    end


    it 'hides login NavItem when logged in' do
      visit '/kirjaudu'
      find('input[name="email"]').set(user.email)
      find('input[name="password"]').set('salasana1')
      click_button 'Kirjaudu'
      expect(page).to have_content 'Olet kirjautunut sisään'

      visit '/'
      expect(page).to have_content 'Kirjaudu ulos'
      expect(page).to_not have_selector 'a[href="/kirjaudu"]'
    end
  end

  context 'logout' do
    it 'shows correct message when successfully logged out' do
      login user.email, 'salasana1'
      visit '/'
      click_on 'Kirjaudu ulos'
      expect(page).to have_content 'Olet kirjautunut ulos'
    end

    it 'shows login button after logout and redirect' do
      login user.email, 'salasana1'
      visit '/'
      click_on 'Kirjaudu ulos'
      visit '/'
      expect(page).to have_selector 'a[href="/kirjaudu"]'
    end
  end
end