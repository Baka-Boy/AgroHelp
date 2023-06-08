import tensorflow as tf
from keras.applications.mobilenet_v2 import preprocess_input

class MaizeInferrer:
    def __init__(self):
        self.saved_path = 'server/Maize_Model'
        self.model = tf.saved_model.load(self.saved_path)
        self.predict = self.model.signatures['serving_default']

    def infer(self, image=None):
        image = preprocess_input(image)
        image = tf.convert_to_tensor(image, dtype=tf.float32)
        prediction = self.predict(image)
        prediction = prediction["Predictions"].numpy()
        print(prediction)
        percentage = prediction.max()
        prediction = prediction.argmax()
        print(prediction)
        print(percentage)
        return [int(prediction), float(percentage)]

class PotatoInferrer:
    def __init__(self):
        self.saved_path = 'server/Potato_Model'
        self.model = tf.saved_model.load(self.saved_path)
        self.predict = self.model.signatures['serving_default']

    def infer(self, image=None):
        image = preprocess_input(image)
        image = tf.convert_to_tensor(image, dtype=tf.float32)
        prediction = self.predict(image)
        prediction = prediction["Predictions"].numpy()
        print(prediction)
        percentage = prediction.max()
        prediction = prediction.argmax()
        print(prediction)
        print(percentage)
        return [int(prediction), float(percentage)]

class AppleInferrer:
    def __init__(self):
        self.saved_path = 'server/Apple_Model'
        self.model = tf.saved_model.load(self.saved_path)
        self.predict = self.model.signatures['serving_default']

    def infer(self, image=None):
        image = preprocess_input(image)
        image = tf.convert_to_tensor(image, dtype=tf.float32)
        prediction = self.predict(image)
        prediction = prediction["Predictions"].numpy()
        print(prediction)
        percentage = prediction.max()
        prediction = prediction.argmax()
        print(prediction)
        print(percentage)
        return [int(prediction), float(percentage)]

