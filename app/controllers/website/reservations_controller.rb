class Website::ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit]

  # GET /reservations
  # GET /reservations.json
  def index
    @planes = Plane.all
  end

  # GET /reservations/1
  # GET /reservations/1.json
  def show
  end

  # GET /reservations/1/edit
  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reservation_params
      params.require(:reservation).permit(:reservation_type, :start, :end, :user_id, :plane_id)
    end
end
