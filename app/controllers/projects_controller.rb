class ProjectsController < ApplicationController
  # GET /projects
  # GET /projects.json
	before_filter :authenticate_user!

	respond_to :json 

  def index
    @projects = current_user.projects.all
    respond_with(@projects)
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])
    respond_with(@project)
  end

  # POST /projects
  # POST /projects.json
  def create
		puts "#############################################"
		puts params.inspect
    @project = Project.new(params[:project])
		#@project.description = params[:proejct][:description]
		#@project.name = params[:project][:name]
		@project.user_id = current_user.id
		@project.save
		respond_with(@project)
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :no_content }
    end
  end
end
