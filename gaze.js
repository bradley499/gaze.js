const gazeDetection = {
	private: {
		scripts: [document.createElement("script"), document.createElement("script")],
		model: undefined,
		gotScripts: false,
		retrievingScripts: false,
		canvas: document.createElement('canvas'),
		init: async function () {
			if (!gazeDetection.private.gotScripts) {
				return false;
			}
			if (gazeDetection.ready) {
				return true;
			}
			const URL = "https://teachablemachine.withgoogle.com/models/o8Yg3DnRZ/";
			const modelURL = URL + "model.json";
			const metadataURL = URL + "metadata.json";
			try {
				gazeDetection.private.model = await tmPose.load(modelURL, metadataURL);
				gazeDetection.ready = true;
				gazeDetection.ready = true;
			} catch { }
			return gazeDetection.ready;
		},
		setup: function () {
			if (gazeDetection.private.retrievingScripts || !gazeDetection.private.gotScripts) {
				gazeDetection.private.retrievingScripts = true;
				const hostPath = "https://cdn.jsdelivr.net/npm/@te";
				gazeDetection.private.scripts[0].src = hostPath + "nsorflow/tfjs@1.3.1/dist/tf.min.js";
				gazeDetection.private.scripts[1].src = hostPath + "achablemachine/pose@0.8/dist/teachablemachine-pose.min.js";
				document.head.appendChild(gazeDetection.private.scripts[0]);
				gazeDetection.private.scripts[0].addEventListener("load", function () {
					document.head.appendChild(gazeDetection.private.scripts[1]);
					gazeDetection.private.scripts[1].addEventListener("load", function () {
						gazeDetection.private.gotScripts = true;
						gazeDetection.private.init();
					});
				});
				return false;
			}
			return true;
		}
	},
	ready: false,
	default: 0, // Right - default
	direction: async function (img) {
		if ((await gazeDetection.private.init()) == false || gazeDetection.private.model == undefined) {
			return gazeDetection.default;
		}
		if (gazeDetection.private.model.getTotalClasses() != 2) {
			return gazeDetection.default;
		}
		const ctx = gazeDetection.private.canvas.getContext('2d');
		gazeDetection.private.canvas.width = img.width;
		gazeDetection.private.canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		let gazeDirection = 1;  // Left
		try {
			const { posenetOutput } = await gazeDetection.private.model.estimatePose(gazeDetection.private.canvas);
			const prediction = await gazeDetection.private.model.predict(posenetOutput);
			if (prediction[1].probability > prediction[0].probability) {
				gazeDirection = 0; // Right
			}
		} catch { }
		gazeDetection.private.canvas.width = 0;
		gazeDetection.private.canvas.height = 0;
		return gazeDirection;
	}
};
gazeDetection.private.setup();