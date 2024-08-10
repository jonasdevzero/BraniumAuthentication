<div align="center">
	<h1>Branium</h1>
	<p>The Authentication Micro Service</p>
</div>

## About

This Micro Service is an API responsible to authenticate the users.

## Generate certificates

To run all the Branium projects is necessary generate and config certificates for each project. To generate all necessary certificates follow this steps:

1. Install OpenSSL

2. Run this command

```sh
./generate-certificates.sh
```

### Allow the usage of the CA in the browsers:

Follow these steps when all projects are configured (including certificates) and running

1. Chrome

   Got to `chrome://flags/#allow-insecure-localhost` and enable the option

2. Firefox

- Go to `Settings > Privacy & Security > Certificates`
- Click in the button `View Certificates`
- Open the `Servers` tab
- Click in the button `Add Exception`
- Put the location of messages micro service `https://localhost:{PORT}`
- Click in the button `Get certificate`
- Finally, click in the button `Confirm Security Exception`

## Achitecture

- [Frontend](https://github.com/jonasdevzero/Branium)
- [Keys](https://github.com/jonasdevzero/BraniumKeys)
- [Messages](https://github.com/jonasdevzero/BraniumMessages)



