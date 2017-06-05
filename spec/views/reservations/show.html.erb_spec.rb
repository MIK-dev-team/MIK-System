require 'rails_helper'

RSpec.describe "reservations/show", type: :view do
  before(:each) do
    @reservation = assign(:reservation, Reservation.create!(
      :plane => "Plane",
      :resevation_type => "Resevation Type",
      :user_id => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Plane/)
    expect(rendered).to match(/Resevation Type/)
    expect(rendered).to match(/2/)
  end
end
