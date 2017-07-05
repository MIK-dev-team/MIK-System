class AuthController < ApplicationController

  def show
    render :login
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_url, notice: 'Logged in!'
    else
      flash.now.notice = 'Email or password is invalid'
      render :login
    end
  end

end
