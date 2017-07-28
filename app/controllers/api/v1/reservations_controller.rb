class Api::V1::ReservationsController < ApiController

  def index
    reservations = Reservation.all
    render json: reservations
  end

  def create
    @reservation = Reservation.new(reservation_params)

    # This has to be changed when we get an actual user control system. Taken from current_user mnost likely
    @reservation.user_id = 1

    if @reservation.save
      render json: @reservation, status: :created
    else
      render json: @reservation.errors, status: :unprocessable_entity
    end
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