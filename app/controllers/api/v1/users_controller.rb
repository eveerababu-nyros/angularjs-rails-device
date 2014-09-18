class Api::V1::UsersController < Api::V1::BaseController
  before_filter :authenticate_user!, :except => [:create, :show]

  def show
    render :json => {:info => "Current User", :user => current_user}, :status => 200
  end

  def create
    @user = User.new()
		@user.email = params[:user][:email]
		@user.password = params[:user][:password]
		@user.save
    if @user.valid?
      sign_in(@user)
      respond_with @user, :location => api_users_path
    else
      respond_with @user.errors, :location => api_users_path
    end
  end

  def update
    respond_with :api, User.update(current_user.id, user_params)
  end

  def destroy
    respond_with :api, User.find(current_user.id).destroy
  end

end
