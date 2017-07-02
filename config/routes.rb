Rails.application.routes.draw do
  resources :users
  resources :reservations
  resources :planes, only: [:show]
  get '/planes/:id/reservations.json', to: 'planes#reservations'
  get 'hello/index'
  root 'hello#index'
  get '/login', to: 'auth#show'
  post '/login', to: 'auth#login'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
