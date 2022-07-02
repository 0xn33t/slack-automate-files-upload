// List of allowed mimetypes
const mimetypes = [
    'image/jpeg',
    'image/gif',
    'image/png',
    'video/mp4',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.rar',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// List of allowed extensions
const extensions = ['jpeg', 'jpg', 'gif', 'png', 'mp4', 'pdf', 'ppt', 'pptx', 'rar', 'txt', 'xls', 'xlsx', 'zip', 'doc', 'docx'];

// List of allowed users ids - empty for all users
const users = [];

// List of allowed channels ids - empty for all channels
const channels = [];

// List of allowed slack events
const events = ['file_shared'];

// Google Drive parent dir
const googleDriveParents = [`${process.env.GOOGLE_DRIVE_PARENT}`];

module.exports = { mimetypes, extensions, users, channels, events, googleDriveParents }