Rails.application.routes.draw do
  namespace :api, constraints: { format: 'json' } do
    namespace :v1 do
      resources :membership_applications, only: [:create, :show]
      resources :reservations, only: [:create, :index, :destroy, :update]
      resources :availability_notifiers, only: [:create, :destroy]
      # TODO: clean up these, streamline
      get 'planes/:id/reservations', to: 'planes#reservations'
      get 'planes/:id/my_reservations', to: 'planes#my_reservations'
      get 'all_my_reservations', to: 'reservations#all_my_reservations'
      post 'kirjaudu', to: 'auth#login'
      delete 'logout', to: 'auth#logout'
      post 'joukkoperu', to: 'reservations#mass_destroy'
    end
  end

  scope module: 'website' do
    resources :auth, only: [:show]

    root 'reservations#index'

    get 'varaukset', to: 'reservations#list'
    get 'varaukset/:id/muokkaa', to: 'reservations#edit'
    get 'varauskalenteri', to: 'reservations#index'
    get 'liity', to: 'membership_applications#join'
    get 'kirjaudu', to: 'auth#show'

  end
end
