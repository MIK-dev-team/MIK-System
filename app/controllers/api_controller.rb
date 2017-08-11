class ApiController < ActionController::API

  def current_user
    return nil if session[:user_id].nil?
    User.find(session[:user_id])
  end
end