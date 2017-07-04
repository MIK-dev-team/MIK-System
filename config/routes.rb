Rails.application.routes.draw do
  get 'membership_applications/show'

  get 'liity', to: 'membership_applications#join'


  resources :membership_applications, only: [:create, :show]
  resources :reservations
  resources :planes, only: [:show]
  get '/planes/:id/reservations.json', to: 'planes#reservations'
  get 'hello/index'
  root 'hello#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
