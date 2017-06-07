class PlanesController < ApplicationController
  before_action :set_plane, only: [:show]

  # GET /reservations/1
  # GET /reservations/1.json
  def show
    @resevations = @plane.reservations
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_plane
      @plane = Plane.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def plane_params
      params.require(:plane).permit(:name)
    end
end
