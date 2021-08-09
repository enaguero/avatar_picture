"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import cloudinary
import cloudinary.uploader

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/tmp_user', methods=['GET'])
def create_tmp_user():
    user1 = User(email="my_super@email.com", password="my_password", is_active=False)
    db.session.add(user1)
    db.session.commit()

    response_body = {
        "message": "The tmp user was created!"
    }

    return jsonify(response_body), 200

@api.route('/me', methods=['POST', 'PUT'])
def handle_me():
    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    # validate that the front-end request was built correctly
    if 'profile_image' in request.files:
        # upload file to uploadcare
        result = cloudinary.uploader.upload(request.files['profile_image'])

        # fetch for the user
        user1 = User.query.filter_by(email='my_super@email.com').first()

        # update the user with the given cloudinary image URL
        user1.avatar_url = result['secure_url']

        db.session.add(user1)
        db.session.commit()

        return jsonify(user1.serialize()), 200
    else:
        raise APIException('Missing profile_image on the FormData')