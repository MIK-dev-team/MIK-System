require 'rails_helper'

RSpec.describe 'Welcome', js: true do
  it 'to capybara' do
    visit '/varaukset'
    expect(page).to have_content 'Varaukset'
  end
end