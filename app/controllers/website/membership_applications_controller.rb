class Website::MembershipApplicationsController < ApplicationController
  before_action :set_membership_application, only: [:show]

  def join
  end

  def show
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
