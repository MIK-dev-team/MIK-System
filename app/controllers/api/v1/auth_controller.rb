class Api::V1::AuthController < ApiController
  def login
    user = User.find_by('email = ? OR username = ?', params[:email], params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      response = {:success => false}
      render :json => response, :status => 401
    end
  end

  def logout
    session[:user_id] = nil
    render json: {}, status: :no_content
  end
end
