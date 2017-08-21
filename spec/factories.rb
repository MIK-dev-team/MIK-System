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

  factory :user do
    email 'asdf@asdf.fi'
    password 'salasana1'
  end

  factory :reservation do
    reservation_type "opetus"
    start DateTime.now + 2.days
    self.end DateTime.now + 2.days + 3.hours
    user
    plane
  end

  factory :availability_notifier do
    start DateTime.now + 2.days
    self.end DateTime.now + 2.days + 3.hours
    notifier_type 'all'
    user
    plane
  end
end