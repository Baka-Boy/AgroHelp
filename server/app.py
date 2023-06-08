from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
from flask import Flask,request, url_for, redirect, render_template
from infer import MaizeInferrer, PotatoInferrer, AppleInferrer
import cv2
from PIL import Image
import pickle

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'
Maize_inferrer = MaizeInferrer()
Potato_inferrer = PotatoInferrer()
Apple_inferrer = AppleInferrer()
prediction1=0
prediction2=0
prediction=0

@app.route("/")
def welcome():
    return "<p>Welcome to this flask backend!</p>"

@app.route("/predict/maize", methods=["POST"])
def predict_Maize():
    data = request.get_json()
    data = np.asarray(data, dtype=np.uint8)
    data = cv2.resize(data, (224, 224), interpolation=cv2.INTER_CUBIC)
    data = np.expand_dims(data, axis=0)
    prediction = Maize_inferrer.infer(data)
    return jsonify(prediction)

@app.route("/predict/potato", methods=["POST"])
def predict_Potato():
    data = request.get_json()
    data = np.asarray(data, dtype=np.uint8)
    data = cv2.resize(data, (224, 224), interpolation=cv2.INTER_CUBIC)
    data = np.expand_dims(data, axis=0)
    prediction = Potato_inferrer.infer(data)
    return jsonify(prediction)

@app.route("/predict/apple", methods=["POST"])
def predict_Apple():
    data = request.get_json()
    data = np.asarray(data, dtype=np.uint8)
    data = cv2.resize(data, (224, 224), interpolation=cv2.INTER_CUBIC)
    data = np.expand_dims(data, axis=0)
    prediction = Apple_inferrer.infer(data)
    return jsonify(prediction)

Crop_Recommendation_model=pickle.load(open('Crop_Recommendation.pkl','rb'))
@app.route('/classify',methods=['POST','GET'])
def classify():
    data = request.json
    inputValue = data['inputValue']
    result = Crop_Recommendation_model.predict(inputValue)
    print(result)
    # return jsonify({'result': result})
    return result.tolist()

if __name__ == '__main__':
    app.run(debug=True)


# with open('model.pkl', 'rb') as f:
#     model = pickle.load(f)

