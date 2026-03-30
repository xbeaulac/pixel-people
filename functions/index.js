const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { getAuth } = require("firebase-admin/auth");
const { features } = require("./features");
const path = require("path");
const os = require("os");
const fs = require("fs");

initializeApp();
const db = getFirestore();
const st = getStorage();
const auth = getAuth();

const sharp = require("sharp");

exports.generateDocs = functions.https.onRequest((req, res) => {
  for (const type in features) {
    for (const feature in features[type]) {
      const name = features[type][feature]["name"];
      const dir = features[type][feature]["dir"];
      const docId = `${type}-${dir}`;
      const path = `features/${type}/${docId}.png`;
      const url = st.bucket().file(path).publicUrl();

      db.collection("features").doc(docId).set({
        name: name,
        type: type,
        price: 0.02,
        id: docId,
        url: url,
        path: path,
        stock: 400,
      });
    }
  }
});

exports.tokenFromAddress = functions.https.onCall((data, context) => {
  return auth
    .createCustomToken(data.address)
    .then((customToken) => {
      return customToken;
    })
    .catch((error) => {
      console.log("Error creating custom token:", error);
    });
});

exports.layerImage = functions.https.onCall(async (data, context) => {
  const choices = data.choices; //object of objects with data about each feature the user has chosen
  const shuffle = data.shuffle; //array of objects with data about features to "shuffle" through
  const shuffleOutput = [];

  const layerImage = async () => {
    for (const feature of shuffle) {
      delete choices[feature.type];

      let fileName; //file name with no path (ex. bg-orange.png)
      let tempInputPath; //is argument for sharp()
      let composite; //is an array of arguments for .composite()
      let outputFileName; //file name of the outputted image

      // to determine the file name
      if (feature.type === "bg") {
        fileName = path.basename(feature.path);
      } else if (
        Object.keys(choices).length > 0 &&
        choices.hasOwnProperty("bg")
      ) {
        fileName = path.basename(choices.bg.path);
      }

      // to determine the input path to the sharp function
      if (feature.type === "bg") {
        tempInputPath = path.join(os.tmpdir(), fileName);
        await st
          .bucket()
          .file(feature.path)
          .download({ destination: tempInputPath });
      } else if (
        Object.keys(choices).length > 0 &&
        choices.hasOwnProperty("bg")
      ) {
        tempInputPath = path.join(os.tmpdir(), fileName);
        await st
          .bucket()
          .file(feature.path)
          .download({ destination: tempInputPath });
      } else {
        tempInputPath = "../pixel-people/src/img/features/bg/bg-checker.png";
      }

      // to determine which images to add as composite layers on top of the first image
      if (Object.keys(choices).length > 0) {
        choices[feature.type] = feature;
        const compositePromises = Object.values(choices).map(async (choice) => {
          const choiceFileName = path.basename(choice.path);
          const tempChoicePath = path.join(os.tmpdir(), choiceFileName);
          await st
            .bucket()
            .file(choice.path)
            .download({ destination: tempChoicePath });
          return {
            input: tempChoicePath,
          };
        });
        composite = await Promise.all(compositePromises);
        if (!choices.hasOwnProperty("body") && !feature.type === "body") {
          composite.splice(1, 0, {
            input: "../pixel-people/src/img/features/body/body-grey.png",
          });
        }
        if (!choices.hasOwnProperty("head") && !feature.type === "head") {
          composite.splice(2, 0, {
            input: "../pixel-people/src/img/features/head/head-grey-point.png",
          });
        }
      } else {
        composite = [
          { input: "../pixel-people/src/img/features/body/body-grey.png" },
          {
            input: "../pixel-people/src/img/features/head/head-grey-point.png",
          },
        ];
      }

      //to determine the name of the output file
      if (Object.keys(choices).length === 0) {
        outputFileName = feature.id;
      } else {
        choices[feature.type] = feature;
        outputFileName = Object.values(choices)
          .map((choice) => {
            console.log("choice:", choice);
            return choice.id;
          })
          .join("_");
      }

      //opens stream to add files to firebase storage
      const remoteWriteStream = st
        .bucket()
        .file(`users/${context.auth.uid}/${outputFileName}`)
        .createWriteStream();

      //is the temporary output path of the layered image in the tmpdir directory
      const tempOutputPath = path
        .join(os.tmpdir(), outputFileName)
        .concat(".png");

      //is the  path to the layered image in Firebase Storage
      const storageOutputPath = path.join(
        "users",
        context.auth.uid,
        outputFileName
      );

      await sharp(tempInputPath)
        .composite(composite)
        .toBuffer()
        .then((info) =>
          sharp(info)
            .resize({
              width: 640,
              height: 640,
              kernel: sharp.kernel.nearest,
            })
            .toFile(tempOutputPath)
        )
        .catch((err) => console.log(err));

      await st.bucket().upload(tempOutputPath, {
        destination: storageOutputPath,
        metadata: { contentType: "image/png" },
      });

      feature.url = st.bucket().file(storageOutputPath).publicUrl();
    }
  };

  await layerImage();

  console.log("shuffle:", shuffle);

  return shuffle;
});
