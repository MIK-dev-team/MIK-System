require 'rails_helper'

RSpec.describe "reservations/edit", type: :view do
  before(:each) do
    @reservation = assign(:reservation, Reservation.create!(
      :plane => "MyString",
      :resevation_type => "MyString",
      :user_id => 1
    ))
  end

  it "renders the edit reservation form" do
    render

    assert_select "form[action=?][method=?]", reservation_path(@reservation), "post" do

      assert_select "input[name=?]", "reservation[plane]"

      assert_select "input[name=?]", "reservation[resevation_type]"

      assert_select "input[name=?]", "reservation[user_id]"
    end
  end
end
