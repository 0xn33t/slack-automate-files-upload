const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');

const googleAuth = () => {
  return new GoogleAuth({
    keyFile: `${global.__basedir}/google-drive-service-account.json`,
    scopes: 'https://www.googleapis.com/auth/drive',
  });
};

const uploadToGoogleDrive = async (metadata, media) => {
  try {
    const auth = googleAuth();
    const service = google.drive({ version: 'v3', auth });
    const response = await service.files.create({
      requestBody: metadata,
      media: media,
      fields: 'id',
    });
    return response.status == 200;
  } catch (error) {
    console.log(error);
  }
  return false;
};

module.exports = { uploadToGoogleDrive }