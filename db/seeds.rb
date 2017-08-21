# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



1.upto(5) do |i|
  Plane.create(:name => "Kone #{i}")
end

# Reservation.create reservation_type: "1", start: "2017-06-07 15:42:00+03:00", end: "2017-06-08 15:42:00+03:00", user_id: 1, plane_id: 1
# Reservation.create reservation_type: "1", start: "2017-06-09 15:42:00+03:00", end: "2017-06-10 15:42:00+03:00", user_id: 3, plane_id: 2
# Reservation.create reservation_type: "1", start: "2017-06-11 15:42:00+03:00", end: "2017-06-12 15:42:00+03:00", user_id: 1, plane_id: 3
# Reservation.create reservation_type: "1", start: "2017-06-13 15:42:00+03:00", end: "2017-06-14 15:42:00+03:00", user_id: 2, plane_id: 2
# Reservation.create reservation_type: "1", start: "2017-06-15 15:42:00+03:00", end: "2017-06-16 15:42:00+03:00", user_id: 2, plane_id: 3
# Reservation.create reservation_type: "1", start: "2017-06-17 15:42:00+03:00", end: "2017-06-18 15:42:00+03:00", user_id: 3, plane_id: 3
# Reservation.create reservation_type: "1", start: "2017-06-19 15:42:00+03:00", end: "2017-06-20 15:42:00+03:00", user_id: 2, plane_id: 1
# pw: robinsucks
User.create email: "batman@waynecorp.com", password_digest: "$2a$06$4RZIyWX9mJh8KKIofYRT.ObMjddsrGQPkwMjeLoGEWG2SXL4sn9d.", username: "batman"
