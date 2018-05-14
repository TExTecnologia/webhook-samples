require 'json'
require 'sinatra'
require 'sinatra/cross_origin'

set :port, ENV['PORT'] || 3000

configure do
	enable :cross_origin
end

set :allow_origin, :any
set :allow_methods, [:post, :options]
set :allow_credentials, true
set :max_age, '1728000'
set :expose_headers, ['Content-Type, Accept, X-Teleport-Signature']

before do
	response.headers['Access-Control-Allow-Origin'] = '*'
end

def verify_signature(payload_body)
	signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), 'segredo', payload_body)
	return halt 401, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_TELEPORT_SIGNATURE'])
end

post '/payload' do
	request.body.rewind
	content_type :json
	{
		:success => true,
		:data => JSON.parse(request.body.read)
	}.to_json
end

post '/payload-secure' do
	request.body.rewind
	payload_body = request.body.read
	verify_signature(payload_body)
	content_type :json
	{
		:success => true,
		:data => JSON.parse(payload_body)
	}.to_json
end

options '*' do
	response.headers['Allow'] = 'POST, OPTIONS'
	response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept, X-Teleport-Signature'
	response.headers['Access-Control-Allow-Origin'] = '*'
	200
end
