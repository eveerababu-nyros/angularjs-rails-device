class PostsController < ApplicationController
  # GET /posts
  # GET /posts.json
	before_filter :authenticate_user!

   respond_to :json 
  def index
    respond_with(@posts = Post.all)
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])
		@comments = @post.comments
    respond_with(@post)
  end

  
  # POST /posts
  # POST /posts.json
  def create
		puts "#########################################"
		puts params[:name].inspect
		@post_find = Post.find_by_name(params[:name])
		if @post_find.nil?
	    @post = Post.new(params[:post])
  	  @post.save
  	  respond_with(@post)
		else
			respond_with(@post_find)
		end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])

    respond_to do |format|
      if @post.update_attributes(params[:post])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end
end
