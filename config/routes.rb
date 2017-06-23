Rails.application.routes.draw do
  resources :reservations
  resources :planes, only: [:show]
  get '/planes/:id/reservations.json', to: 'planes#reservations'
  get 'hello/index'
  root 'hello#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
