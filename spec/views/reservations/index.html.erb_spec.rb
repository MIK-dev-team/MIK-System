require 'rails_helper'

RSpec.describe "reservations/index", type: :view do
  before(:each) do
    assign(:reservations, [
      Reservation.create!(
        :plane => "Plane",
        :resevation_type => "Resevation Type",
        :user_id => 2
      ),
      Reservation.create!(
        :plane => "Plane",
        :resevation_type => "Resevation Type",
        :user_id => 2
      )
    ])
  end

  it "renders a list of reservations" do
    render
    assert_select "tr>td", :text => "Plane".to_s, :count => 2
    assert_select "tr>td", :text => "Resevation Type".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
