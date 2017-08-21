class ApiController < ActionController::API

  def current_user
    return nil if session[:user_id].nil?
    User.find(session[:user_id])
  end

  def ensure_that_signed_in
    unless current_user
      render json: {}, status: :unauthorized
    end
  end
end