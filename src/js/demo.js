import { fabric } from "fabric";
import { dataURLtoFile, uploadImageFile } from "./fileHandle";
import { getDataJson } from "./service";
import { getUrlParameter } from "./utils";

const idInstance = getUrlParameter("id");

const initCanvas = async () => {
  const canvas = new fabric.Canvas("canvas");
  window.canvas = canvas;

  let oldData = await getDataJson(`https://9w-tool.s3.us-east-2.amazonaws.com/confluence/gravity-image-annotation/files/${idInstance}.json`);
  console.log(oldData, "oldData");
  // canvas.setBackgroundImage('images/content/header.png', function () {
  canvas.setBackgroundImage(
    'images/content/header.png',
    // "https://9w-tool.s3.us-east-2.amazonaws.com/confluence/gravity-image-annotation/files/header.png",
    canvas.renderAll.bind(canvas), {
      // opacity: 0.5,
      // angle: 45,
      // left: 400,
      // top: 400,
      originX: 'left',
      originY: 'top',
      crossOrigin: 'anonymous'
    }
  );
  // canvas.setDimensions({width: width, height: height});

  if(oldData) {
    canvas.loadFromJSON(oldData, canvas.renderAll.bind(canvas));
  }else{
    const rect = new fabric.Rect({
      top: 100,
      left: 100,
      width: 60,
      height: 70,
      fill: "red",
    });
    canvas.add(rect);
  }

  // trigger button  id btnSave to save canvas as image
  document.getElementById("btnSave").addEventListener("click", function () {
    $('#btnSave').prop('disabled', true);
    // get canvas data
    var image = canvas.toDataURL({
      format: "jpeg",
      quality: 0.8,
    });

    // Upload image to S3
    const jsonBlob = new Blob([JSON.stringify(canvas.toJSON())], {
      type: "application/json",
    });
    const fileJson = new File([jsonBlob], `${idInstance}.json`, {
      type: "application/json",
    });
    uploadImageFile(fileJson, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data, "dataJson");
    });

    // Upload image to S3
    const file = dataURLtoFile(image, `${idInstance}.jpg`);
    console.log(file, "file");
    uploadImageFile(file, (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(data, "data");
      $('#btnSave').prop('disabled', false);
      window.history.go(-1);
    });
  });
};

initCanvas();
