import os
import hmac
import hashlib
from flask import Flask, jsonify, request, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def _verify_signature():
	h = hmac.new(b'segredo', msg = request.data, digestmod = hashlib.sha1)
	signature = "sha1=" + h.hexdigest()
	return hmac.compare_digest(signature, request.headers["X-Teleport-Signature"])

@app.route("/payload", methods=["POST"])
def payload():
	if not request.is_json:
		abort(400)

	_payload = request.get_json()
	body = {
		'success': True,
		'data': _payload
	}
	res = jsonify(body)
	res.status_code = 200
	return res

@app.route("/payload-secure", methods=["POST"])
def payload_secure():
	if not request.is_json:
		abort(400)

	_payload = request.get_json()
	if _verify_signature:
		body = {
			'success': True,
			'data': _payload
		}
		res = jsonify(body)
		res.status_code = 200
		return res

	abort(401)

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=os.getenv('PORT', 80), debug=True)
