require 'rails_helper'

RSpec.describe 'Welcome', js: true do
  it 'to capybara' do
    visit '/'
    expect(page).to have_content 'Varaukset'
  end
end