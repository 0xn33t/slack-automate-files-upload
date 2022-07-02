# Slack-Automate-Files-Upload
A simple Node.js tool that uploads files shared withing your Slack workspace to your Google Drive account using Slack Event Subscriptions.

## Getting Started
**- Create new Slack App within your workspace**
Use the following manifest code to generate your app. Don not forget to update the value of `request_url` to your nodejs application.

```yaml
display_information:
  name: Automate File Upload
features:
  bot_user:
    display_name: Automate File Upload
    always_online: false
oauth_config:
  scopes:
    bot:
      - files:read
settings:
  event_subscriptions:
    request_url: https://your-host/api/v1/slack/event
    bot_events:
      - file_created
      - file_shared
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

**- Create a Google Cloud project**
1. Open the Google Cloud console and create new project. From project dashboard, navigate to APIs & Services and enable Google Drive API.
2. Navigate to Credentials and create new Service Account.
3. Download your service account json file and save it to your nodejs root dir.

**- Create Google Drive Folder**
1. Open your Google Drive account and create new folder which will hold all files shared by slack.
2. Share the newly created folder with the Service Account.

**- Configure your Nodejs Application Environment**
You will need Redis running somewhere.
```
NODE_ENV=development
PORT=
SLACK_SIGNING_SECRET=
SLACK_BOT_TOKEN=
GOOGLE_DRIVE_PARENT=
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```
- `SLACK_SIGNING_SECRET` is used to sign the requests sent by slack to your nodejs application.  Confirm that each request comes from Slack by verifying its unique signature. 
- `SLACK_BOT_TOKEN` is used to authenticate your app.
- `GOOGLE_DRIVE_PARENT` is your Google Drive folder id

