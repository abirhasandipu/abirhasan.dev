# abirhasan.dev

Static personal website for Abir Hasan.

## Deploy

1. Push your latest changes to GitHub.
2. Copy `deploy.local.sh.example` to `deploy.local.sh`.
3. Replace `YOUR_XCLOUD_DEPLOY_URL` with your private xCloud deploy webhook.
4. Run `./deploy.local.sh` from the project root.

`deploy.local.sh` is ignored by Git so the real webhook URL does not get committed to the public repository.

## First-time setup

```sh
cp deploy.local.sh.example deploy.local.sh
chmod +x deploy.local.sh
```
