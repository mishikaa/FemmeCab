import cv2
import numpy as np
import mediapipe as mp
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import Flask, render_template, Response,  request, jsonify
import base64
import os

app = Flask(__name__)

# Initialize mediapipe
mpHands = mp.solutions.hands
hands = mpHands.Hands(max_num_hands=1, min_detection_confidence=0.7)
mpDraw = mp.solutions.drawing_utils

# Load the gesture recognizer model
model = load_model('mp_hand_gesture')

# Load class names
with open('gesture.names', 'r') as f:
    classNames = f.read().split('\n')


# @app.route('/process_stream', methods=['POST'])
def process_stream(data):
    data = request.json
    frame_base64 = data.get('frame')

    # Convert base64 image to numpy array
    frame_data = base64.b64decode(frame_base64)
    np_arr = np.frombuffer(frame_data, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    x, y, c = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(frame_rgb)
    # gesture_result = ''

    if result.multi_hand_landmarks:
        landmarks = []
        for handslms in result.multi_hand_landmarks:
            for lm in handslms.landmark:
                lmx = int(lm.x * x)
                lmy = int(lm.y * y)
                landmarks.append([lmx, lmy])
            
    gesture_result = ''
    if landmarks:
        landmarks_response = landmarks
        prediction = model.predict([landmarks])
        classID = np.argmax(prediction)
        gesture_result = classNames[classID]

    response = {'landmarks': landmarks_response, 'gesture_result': gesture_result}
    return jsonify(response)

def handler(request):
    if request.method == 'POST':
        data = request.json
        response = process_stream(data)
        return {
            "statusCode": 200,
            "headers": { "Content-Type": "application/json" },
            "body": json.dumps(response)
        }
    else:
        return {
            "statusCode": 405,
            "headers": { "Content-Type": "text/plain" },
            "body": "Method Not Allowed"
        }
    
# if __name__ == '__main__':
app.run(debug=True)