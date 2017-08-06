FactoryGirl.define do
  factory :membership_application do
    username "Käyttis1"
    email "asdf@asdf.fi"
    full_name "John Johnson"
    birthday Date.new(1990, 12, 12)
    member_type "Täysjäsen"
    address "Coolstreet 12, A5"
    postal_code "12345"
    city "Helsinki"
    phone "+358501234567"
    pending 'false'
  end

  factory :membership_application2, class: MembershipApplication do
    username "Käyttis2"
    email "asdf@asdf.com"
    full_name "John Jackson"
    birthday Date.new(1990, 12, 12)
    member_type "Täysjäsen"
    address "Coolstreet 13, A5"
    postal_code "12349"
    city "Vantaa"
    phone "+358501234569"
    pending 'true'
  end

  factory :plane do
    name "EH123"
  end

  factory :reservation do
    reservation_type "opetus"
    start "2018-06-07 15:42:00+03:00"
    self.end "2018-06-07 17:42:00+03:00"
    user_id 1
    plane
  end

  factory :availability_notifier do
    start "2018-06-07 12:00:00+03:00"
    self.end "2018-06-07 18:00:00+03:00"
    user_id 1
    notifier_type 'all'
    plane
  end
end