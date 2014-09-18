class PageNotFoundError < StandardError; end

class ApplicationController < ActionController::Base
  protect_from_forgery

	unless Rails.application.config.consider_all_requests_local
    rescue_from Exception, with: :render_500
    rescue_from ActionController::RoutingError, with: :render_404
    rescue_from ActionController::UnknownController, with: :render_404
    rescue_from ActionController::UnknownAction, with: :render_404
    rescue_from ActiveRecord::RecordNotFound, with: :render_404
    rescue_from PageNotFoundError, with: :render_404
  end

	protected
	def render_404
		puts "#############################################"
		render 'errors/not_found', status: 404
  end

  def render_500(exception)
    logger.info exception.backtrace.join("\n")
    respond_to do |format|
      format.html do
        render template: 'errors/internal_server_error', status: 500
      end
      format.all { render nothing: true, status: 500}
    end
  end

  def routing_error
    raise ActionController::RoutingError.new(params[:path])
  end


end
