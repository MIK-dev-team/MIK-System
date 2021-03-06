class Website::PlanesController < ApplicationController
  before_action :set_plane, only: [:show, :reservations]
  # TODO: possibly a completely useless controller atm, consider deleting

  # def reservations
  #   @reservations = @plane.reservations
  # end

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
