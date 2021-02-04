if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_kwizu', domain: '' # change domain later
else
  Rails.application.config.session_store :cookie_store, key: '__kwizu' 
end