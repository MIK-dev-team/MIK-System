require 'rails_helper'

RSpec.describe 'Calendar page', js: true do
  # let!(:plane){ FactoryGirl.create(:plane) }
  # let!(:reservation){
  #   res = FactoryGirl.build(:reservation,
  #                           start: DateTime.now.change({ hour: 13 }),
  #                           end: DateTime.now.change({ hour: 15 }))
  #   res.save(validate: false)
  #   res
  # }
  #
  # it 'should have should reservation in calendar' do
  #   visit '/varauskalenteri'
  #   sleep 3
  #   print page.html
  #   expect(page).to have_content 'Näytä kaikki'
  #   expect(page).to have_content 'opetus'
  #   expect(page).to have_content '13:00-15:00'
  # end
end