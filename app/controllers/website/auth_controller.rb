class Website::AuthController < ApplicationController

  def show
  end

  def index
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      response = {:success => true, :id => user.id}
      render :json => response
    else
      response = {:success => false}
      render :json => response, :status => 401
    end
  end

  def logout
    session[:user_id] = nil

    redirect_to root_path
  end

end
