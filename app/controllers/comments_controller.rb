class CommentsController < ApplicationController
  # GET /comments
  # GET /comments.json
	before_filter :authenticate_user!
	
  respond_to :json
  def index
    puts params.inspect
    post = Post.find(params[:id])
		puts "########################################index"
		puts post
		puts post.comments
    respond_with(@comments = post.comments)
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
		@post = Post.find(params[:id])
		puts "########################################"
		puts @post.id
		puts @post.comments.size
    #@comment = Comment.find(params[:id])
    respond_with(@post.comments)
  end

  
  # POST /comments
  # POST /comments.json
  def create
		puts params.inspect
    @comment = Comment.new()
    @comment.comment = params[:comment]
    @comment.post_id = params[:post_id]
    @comment.save
    post = Post.find(@comment.post_id)
		@comments = post.comments.all
		puts @comments.inspect
    respond_with(post)
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end
end
