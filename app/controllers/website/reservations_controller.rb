class Website::ReservationsController < ApplicationController
  before_action :set_reservation, only: [:edit]
  before_action :ensure_that_signed_in, only: [:list, :edit]

  # GET /varauskalenteri
  def index
    @planes = Plane.all
  end

  # GET /varaukset
  def list
  end

  # GET /varaukset/1/muokkaa
  def edit
    if @reservation.user.id == current_user.id
      @planes = Plane.all
    else
      redirect_to kirjaudu_path
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_reservation
      @reservation = Reservation.find(params[:id])
    end
end
