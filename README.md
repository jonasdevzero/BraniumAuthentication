## Generate certificates

1. Install OpenSSL

2. Got to `ssl` folder

```sh
cd ssl
```

3. Create a Certificate Authority (CA)

```sh
openssl genpkey -algorithm RSA -out ca-key.pem

openssl req -x509 -new -nodes -key ca-key.pem -subj "/CN=branium" -days 3650 -out ca-cert.pem
```

4. Create a [Server, Frontend] Key and Certificate Signing Request (CSR)

```sh
openssl genpkey -algorithm RSA -out server-key.pem
openssl genpkey -algorithm RSA -out frontend/key.pem

openssl req -new -key server-key.pem -subj "/CN=localhost" -out server-req.pem
openssl req -new -key frontend/key.pem -subj "/CN=localhost" -out frontend/req.pem
```

5. Sign the [Server, Frontend] CSR with the CA to Generate the Certificate for [Server, Frontend]

```sh
openssl x509 -req -in server-req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 3650
openssl x509 -req -in frontend/req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out frontend/cert.pem -days 3650
```
