#!/bin/bash

# Create directories if they don't exist
mkdir -p certificates/frontend certificates/messages certificates/keys

# Navigate to the certificates directory
cd certificates

# Generate Certificate Authority (CA) key and certificate
openssl genpkey -algorithm RSA -out ca-key.pem
openssl req -x509 -new -nodes -key ca-key.pem -subj "/CN=branium" -days 3650 -out ca-cert.pem

# Generate server key and CSR
openssl genpkey -algorithm RSA -out server-key.pem
openssl req -new -key server-key.pem -subj "/CN=localhost" -out server-req.pem

# Generate frontend key and CSR
openssl genpkey -algorithm RSA -out frontend/key.pem
openssl req -new -key frontend/key.pem -subj "/CN=localhost" -out frontend/req.pem

# Generate messages key and CSR
openssl genpkey -algorithm RSA -out messages/key.pem
openssl req -new -key messages/key.pem -subj "/CN=localhost" -out messages/req.pem

# Generate keys key and CSR
openssl genpkey -algorithm RSA -out keys/key.pem
openssl req -new -key keys/key.pem -subj "/CN=localhost" -out keys/req.pem

# Sign server CSR with the CA
openssl x509 -req -in server-req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out server-cert.pem -days 3650

# Sign frontend CSR with the CA
openssl x509 -req -in frontend/req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out frontend/cert.pem -days 3650

# Sign messages CSR with the CA
openssl x509 -req -in messages/req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out messages/cert.pem -days 3650

# Sign keys CSR with the CA
openssl x509 -req -in keys/req.pem -CA ca-cert.pem -CAkey ca-key.pem -CAcreateserial -out keys/cert.pem -days 3650

echo "Certificates generated successfully."
