class Website::ReservationsController < ApplicationController
  before_action :set_reservation, only: [:show, :edit]
  before_action :ensure_that_signed_in, only: [:list, :show, :edit]

  # GET /varauskalenteri
  def index
    @planes = Plane.all
  end

  # GET /varaukset
  def list
  end

  # GET /reservations/1
  def show
  end

  # GET /varaukset/1/muokkaa
  def edit
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def reservation_params
      params.require(:reservation).permit(:reservation_type, :start, :end, :user_id, :plane_id, :additional_info)
    end
end
