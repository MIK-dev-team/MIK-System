class Api::V1::AvailabilityNotifiersController < ApplicationController
  def create
    @notifier = AvailabilityNotifier.create(availability_notifier_params)
  end

  def destroy
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def availability_notifier_params
      params.require(:availability_notifier).permit(:user_id, :start, :end)
    end
end
