## Generate certificates

1. Install OpenSSL

2. Run this command

```sh
./generate-certificates.sh
```

### Allow the usage of the CA in the browsers:

1. Chrome

   Got to `chrome://flags/#allow-insecure-localhost` and enable the option

2. Firefox

- Go to `Settings > Privacy & Security > Certificates`
- Click in the button `View Certificates`
- Open the `Servers` tab
- Click in the button `Add Exception`
- Put the location `https://localhost:{PORT}`
- Click in the button `Get certificate`
- Finally, click in the button `Confirm Security Exception`
