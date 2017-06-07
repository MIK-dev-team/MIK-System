json.extract! reservation, :id, :reservation_type, :start, :finish, :user_id, :plane_id, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
