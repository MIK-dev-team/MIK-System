class MembershipApplicationsController < ApplicationController
  before_action :set_membership_application, only: [:show]

  def join
  end

  def show
  end

  def create
    @membership_application = MembershipApplication.new(application_params)
    @membership_application.user_id = 1
    @membership_application.pending = true

    respond_to do |format|
      if @membership_application.save
        MembershipAppMailer.application_received(@membership_application).deliver_later
        MembershipAppMailer.application_received_mod(@membership_application).deliver_later

        format.html { redirect_to root_path, notice: 'Application was successfully created.' }
        format.json { render @membership_application, status: :created }
      else
        format.html { render :new }
        format.json { render json: @membership_application.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  private
    def set_membership_application
      @membership_application = MembershipApplication.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def application_params
      params.require(:membership_application).permit(:username, :email, :birthday, :member_type, :full_name, :address,
                                                     :phone, :postal_code, :city, :licences, :experience_with_engine,
                                                     :other_experience, :other_memberships, :join_sil, :sil_membership_number,
                                                     :extra_information)
    end
end
