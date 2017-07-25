class Api::V1::PlanesController < ApiController
  def reservations
    reservations = Plane.find(params[:id]).reservations
    render json: reservations
  end
end