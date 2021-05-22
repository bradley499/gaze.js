# Gaze.js
Detect the direction of a person's gaze with a simple to use asynchronous API.

## How to use
Make sure that you include the script into the head of your document:

	<script src="./gaze.min.js" type="text/javascript"></script>

Once the script loads it will start to fetch other scripts, and resources that are required for the model.

To get an estimated gaze of an image, you must pass an image object (with a fully loaded image), into the `gazeDetection` object's `direction` method.

	await gazeDetection.direction(document.getElementById("image"));

This will return either a `1`, or a `0`.
|Number|Representation|
|-|-|
|`1`|Left|
|`0`|Right / Default / Unknown|

However, if you require the value of the default value to be anything other than `0`, you can change this simply by setting the `default` value of the `gazeDetection` object, this can simply be done, take a look at this example:

	gazeDetection.default = 2;

Please note, that the default value is returned if the model has not completed downloading the required files, or if the model is incorrect.

## How the model was made
The model was created with the help of the Google tool *[Teachable Machine](https://teachablemachine.withgoogle.com)*, as well as a large collection of collected sample images, which were used in order to train the *[tensorflow.js](https://www.tensorflow.org/js)* PoseNet model to recognize the gaze direction of the images.