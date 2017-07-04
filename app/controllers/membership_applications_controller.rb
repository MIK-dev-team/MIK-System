class MembershipApplicationsController < ApplicationController
  def join
  end

  def create
    @membership_application = MembershipApplication.new(application_params)

    respond_to do |format|
      if @membership_application.save
        format.html { redirect_to root_path, notice: 'Application was successfully created.' }
        format.json { render @membership_application, status: :created }
      else
        format.html { render :new }
        format.json { render json: @membership_application.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def application_params
      params.require(:membership_application).permit(:username, :email, :birthday, :member_type, :full_name, :address,
                                                     :phone, :postal_code, :city, :licences, :experience_with_engine,
                                                     :other_experience, :other_memberships, :join_sil, :sil_membership_number,
                                                     :extra_information)
    end
end
