class Website::MembershipApplicationsController < ApplicationController
  before_action :set_membership_application, only: [:show]

  def join
  end

  def show
  end

  # private
  #   def set_membership_application
  #     @membership_application = MembershipApplication.find(params[:id])
  #   end
end
