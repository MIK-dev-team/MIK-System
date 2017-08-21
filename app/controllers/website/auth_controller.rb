class Website::AuthController < ApplicationController

  def show
  end

  def index
  end
  def logout
    session[:user_id] = nil

    redirect_to root_path
  end

end
