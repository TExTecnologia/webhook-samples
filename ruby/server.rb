require 'json'
require 'sinatra'

set :port, 3000

def verify_signature(payload_body)
	signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), 'segredo', payload_body)
	return halt 500, "Signatures didn't match!" unless Rack::Utils.secure_compare(signature, request.env['HTTP_X_TELEPORT_SIGNATURE'])
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
