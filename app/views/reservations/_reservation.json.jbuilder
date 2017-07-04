json.extract! reservation, :id, :reservation_type, :start, :end, :user_id, :plane_id, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
json.title reservation.reservation_type
