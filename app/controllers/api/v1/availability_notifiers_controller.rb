class Api::V1::AvailabilityNotifiersController < ApiController
  def create
    @notifier = AvailabilityNotifier.new(availability_notifier_params)

    @notifier.user_id = 1
    if @notifier.save
      # MAILER HERE?

      render json: @notifier, status: :created
    else
      render json: @notifier.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def availability_notifier_params
      params.require(:availability_notifier).permit(:user_id, :start, :end, :plane_id, :notifier_type)
    end
end
