class UserController < ApplicationController

  def index
  end

  def edit
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  def update
  end


  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end



