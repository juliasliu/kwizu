Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
 default_url_options :host => 'http://192.168.0.19:3001'
  # default_url_options :host => 'http://kwizu.herokuapp.com'
  
  resources :users, only: [:index, :create, :show, :update]
  resources :quizzes
  resources :chats, only: [:index, :create, :show, :update]
  resources :messages, only: [:create]

  post '/quizzes/save', to: 'quizzes#save'
  get '/quizzes/:id/leader', to: 'quizzes#leader'
  get '/quizzes/:id/recommend', to: 'quizzes#recommend'
  get '/quizzes/search/:keyword', to: 'quizzes#search'
  
  get '/quizzings/:quiz_id/:user_id', to: 'quizzes#quizzing'
  
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
  put '/apple_token', to: 'sessions#apple_token'
  
  put '/users/:id/send_request', to: 'users#send_request'
  delete '/users/:id/undo_request', to: 'users#undo_request'
  put '/users/:id/accept_request', to: 'users#accept_request'

  put '/users/:id/points', to: 'users#points'
  put '/users/:id/submit_ticket', to: 'users#submit_ticket'
  put '/users/:id/change_password', to: 'users#change_password'
  put '/users/:id/connect_facebook', to: 'users#connect_facebook'
  put '/users/:id/notification_token', to: 'users#notification_token'
  put '/users/:id/facebook_friends', to: 'users#facebook_friends'
  
  get '/users/search/:keyword', to: 'users#search'
  
  get '/chats/user/:id', to: 'chats#find'
  
  mount ActionCable.server => '/cable'
end
