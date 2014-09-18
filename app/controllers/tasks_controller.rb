class TasksController < ApplicationController
  # GET /tasks
  # GET /tasks.json
	respond_to :json

  def index
		project = Project.find(params[:id])
    @tasks = project.tasks.all
    respond_with(@tasks)
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    @task = Task.find(params[:id])
		respond_with(@task)
  end

  # POST /tasks
  # POST /tasks.json
  def create
		puts params.inspect
		@task = Task.new(params[:task])
		@task.save
    respond_with(@task)
  end

  # PUT /tasks/1
  # PUT /tasks/1.json
  def update
    @task = Task.find(params[:id])

    respond_to do |format|
      if @task.update_attributes(params[:task])
        format.html { redirect_to @task, notice: 'Task was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url }
      format.json { head :no_content }
    end
  end
end
