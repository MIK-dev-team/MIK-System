json.extract! reservation, :id, :plane, :resevation_type, :start, :finish, :user_id, :created_at, :updated_at
json.url reservation_url(reservation, format: :json)
