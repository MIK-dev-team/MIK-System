require 'rails_helper'

RSpec.describe "reservations/new", type: :view do
  before(:each) do
    assign(:reservation, Reservation.new(
      :plane => "MyString",
      :resevation_type => "MyString",
      :user_id => 1
    ))
  end

  it "renders new reservation form" do
    render

    assert_select "form[action=?][method=?]", reservations_path, "post" do

      assert_select "input[name=?]", "reservation[plane]"

      assert_select "input[name=?]", "reservation[resevation_type]"

      assert_select "input[name=?]", "reservation[user_id]"
    end
  end
end
