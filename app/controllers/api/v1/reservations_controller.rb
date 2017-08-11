class Api::V1::ReservationsController < ApiController
  before_action :set_reservation, only: [:destroy]

  def index
    reservations = Reservation.all
    render json: reservations
  end

  def all_my_reservations
    if current_user
      reservations = current_user.reservations
      render json: reservations
    else
      render json: { status: :unauthorized }
    end
  end

  def create
    unless current_user
      render json: { status: :unauthorized }
      return
    end
    @reservation = Reservation.new(reservation_params)
    @reservation.user_id = current_user.id

    if @reservation.save
      render json: @reservation, status: :created
    else
      render json: @reservation.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    # TODO: adjust when admin role exists
    if @reservation.user_id == current_user.id
      @reservation.destroy
      render json: { status: :no_content }
    else
      render json: { status: :unauthorized }
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