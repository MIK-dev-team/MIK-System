class Api::V1::PlanesController < ApiController
  before_action :ensure_that_signed_in, only: [:my_reservations]

  def reservations
    reservations = Plane.find(params[:id]).reservations
    render json: reservations
  end

  def my_reservations
    reservations = Plane.find(params[:id]).reservations.where(user_id: current_user.id)
    render json: reservations
  end
end