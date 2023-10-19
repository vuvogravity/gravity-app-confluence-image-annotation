var AWS = require("aws-sdk");

module.exports.upload = async (event) => {
  console.log("receive request");
  const S3 = new AWS.S3({ signatureVersion: "v4", region: "us-east-2" });

  const fileName =
    event.headers && event.headers["x-amz-meta-filekey"]
      ? event.headers["x-amz-meta-filekey"]
      : undefined;

  console.log(fileName);

  if (!fileName) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        message: "Missing x-amz-meta-filekey in the header of the request.",
      }),
    };
  }

  const params = {
    Bucket: process.env.BUCKET,
    Key: process.env.PREFIX_FOLDER + fileName,
    Expires: 300,
    ACL: "public-read",
  };

  try {
    const url = await S3.getSignedUrl("putObject", params);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        signed: url,
        url: "https://9w-tool.s3.us-east-2.amazonaws.com/confluence/gravity-image-annotation/files/" + fileName
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(error),
    };
  }
};
