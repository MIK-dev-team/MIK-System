module TestHelpers
  module Features
    def login(login, password)
      visit '/kirjaudu'
      fill_in 'Käyttäjätunnus/Sähköposti', with: login
      fill_in 'Salasana', with: password
      click_button 'Kirjaudu'
      expect(page).to have_content 'Olet kirjautunut sisään!'
    end
  end

  module Requests
    def login(login, password)
      post api_v1_kirjaudu_path, params: {email: login, password: password}
    end
  end
end