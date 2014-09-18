PostComment::Application.routes.draw do
  resources :tasks


  resources :projects
  resources :comments
  resources :posts

  resources :home, only: [:index]
  root :to => "home#index"
  devise_for :users

  namespace :api, defaults: {format: :json} do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: :true) do

      devise_scope :user do
        match '/sessions' => 'sessions#create', :via => :post
        match '/sessions' => 'sessions#destroy', :via => :delete
      end

      resources :record

      resources :users, only: [:create]
      match '/users' => 'users#show', :via => :get
      match '/users' => 'users#update', :via => :put
      match '/users' => 'users#destroy', :via => :delete
    end
  end

	#match "*path", to: "application#routing_error"

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id))(.:format)'
end