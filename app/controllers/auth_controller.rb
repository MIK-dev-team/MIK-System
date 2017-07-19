class AuthController < ApplicationController

  def show
    render :login
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      response = {:success => true}
      render :json => response
    else
      flash.now.notice = 'Email or password is invalid'
      render :json => response, :status => 401
    end
  end
  
end
