import { getImageUpoad } from "./service";

/**
 *    Func convert data to File or Blob
 */
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  try {
    return new File([u8arr], filename, { type: mime });
  } catch (error) {
    return {
      blob: new Blob([u8arr], { type: mime }),
      name: filename,
      type: mime,
    };
  }
};

const getSignedUrl = async (fileName, callback) => {
  try {
    let headers = { "x-amz-meta-filekey": fileName };
    const data = await getImageUpoad(headers);
    callback(null, data);
  } catch (err) {
    callback(err, null);
  }
};

const uploadFile = (urlSigned, file, callback) => {
  $.ajax({
    url: urlSigned,
    type: "PUT",
    data: file.blob || file,
    processData: false,
    contentType: file.type,
  })
    .done((data) => callback(null, data))
    .fail((error) => callback(error, null));
};

export const uploadImageFile = (file, callback) => {
  getSignedUrl(file.name, (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    uploadFile(data.signed, file, (err_) => {
      if (err_) {
        callback(err, null);
        return;
      }
      callback(null, data);
    });
  });
};
