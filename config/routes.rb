Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :membership_applications, only: [:create, :show]
      resources :reservations, only: [:create, :index, :destroy]
      resources :availability_notifiers, only: [:create, :destroy]
      get 'planes/:id/reservations', to: 'planes#reservations'
    end
  end

  scope module: 'website' do
    resources :membership_applications, only: [:show]
    resources :reservations, only: [:index]
    resources :planes, only: [:show]

    root 'reservations#index'

    get 'varaukset', to: 'hello#index'
    get 'varauskalenteri', to: 'reservations#index'
    get 'liity', to: 'membership_applications#join'
  end
end
