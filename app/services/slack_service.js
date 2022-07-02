const { SLACK_FILES_INFO } = require('../common/endpoints');
const { uploadToGoogleDrive } = require('../services/google_drive_service');
const config = require('../common/config');
const axios = require('axios');
const fs = require('fs');

const processEvent = async (event) => {
    if (canProcessEvent(event)) {
        if(event['type'] === 'file_shared'){
            return await processSlackFile(event.file_id);
        }
    }
}

const canProcessEvent = (event) => {
    const canProcessEvent = event != null && event != undefined && config.events.includes(event['type']);
    const canProcessUser = !config.users.length || config.users.includes(event['userId']);
    const canProcessChannel = !config.channels.length || config.channels.includes(event['channel_id']);
    return canProcessEvent && canProcessUser && canProcessChannel;
}

const processSlackFile = async (fileId) => {
    const fileData = await getSlackFileInfo(fileId);
    const file = fileData['file'];
    if (canProcessFile(file)) {
        const name = file['name'];
        const link = file['url_private'];
        const mimeType = file['mimetype'];
        const dir = `temp/${fileId}`;
        const tempPath = `${dir}/${name}`;
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        const downloadResponse = await downloadSlackFile(link, tempPath);
        if (downloadResponse) {
            const uploadResponse = await uploadToGoogleDrive({
                name: name,
                parents: config.googleDriveParents,
            }, {
                mimeType: mimeType,
                body: fs.createReadStream(tempPath)
            });
            fs.rmSync(dir, { recursive: true, force: true });
            return uploadResponse;
        }
    }
    return false;
}

const canProcessFile = (file) => {
    return file && config.mimetypes.includes(file['mimetype']) && config.extensions.includes(file['filetype']);
}

const getSlackFileInfo = async (fileId) => {
    if (fileId) {
        try {
            const response = await axios.get(SLACK_FILES_INFO(fileId), {
                headers: { 'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}` }
            });
            if (response.status === 200) {
                const data = response.data;
                if (data['ok'] === true) {
                    return data;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return null;
}

const downloadSlackFile = async (link, path) => {
    try {
        const imageResponse = await axios.get(link, {
            headers: { 'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}` },
            responseType: 'stream'
        });
        if (imageResponse.status === 200) {
            return await writeFileStream(imageResponse.data, path);
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

const writeFileStream = async (stream, path) => {
    const fileStream = fs.createWriteStream(path);
    return new Promise((resolve, reject) => {
        stream.pipe(fileStream)
        .on('finish', () => {
            fileStream.close();
            resolve(true);
        })
        .on('error', (e) => {
            console.log(e);
            reject(e);
        });
    });
}

module.exports = { processEvent }