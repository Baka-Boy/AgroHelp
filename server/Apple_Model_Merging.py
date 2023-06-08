import efficientnet.tfkeras as enet
import tensorflow as tf

from keras.models import Model


# from model import final_model as m
# model = keras.models.Sequential()
# model.built = True
# model.build(input_shape = (7,7,3))
def configure_model():
  inputs_1 = tf.keras.Input(shape=(260, 260, 3))
  mymodel=enet.EfficientNetB2(input_shape = (260, 260, 3), include_top = False, weights = 'imagenet')
  x = tf.keras.layers.AveragePooling2D(pool_size=(7, 7))(mymodel.output)
  x = tf.keras.layers.Flatten()(x)
  predictors = tf.keras.layers.Dense(4,activation='softmax',name='Predictions')(x)
  final_model = Model(mymodel.input, outputs=predictors)
  return final_model
final_model=configure_model()

def model(new_model=final_model,layers_num=1,trainable=False):
    for layer in new_model.layers[:layers_num]:
        layer.trainable=trainable
    return new_model
final_model=model(final_model)
final_model.load_weights('Fruit_Model.h5')


# Saving the model as a savedModel
final_model.save('Fruit_Model', save_format='tf')