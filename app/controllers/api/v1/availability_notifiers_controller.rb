class Api::V1::AvailabilityNotifiersController < ApiController
  before_action :ensure_that_signed_in, only: [:create, :destroy]

  def create
    @notifier = AvailabilityNotifier.new(availability_notifier_params)

    @notifier.user_id = current_user.id
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
      params.require(:availability_notifier).permit(:start, :end, :plane_id, :notifier_type)
    end
end
