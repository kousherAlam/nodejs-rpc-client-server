## gRPC with Protocol Buffer in transport layer

- Creating secure connection 
- Receiving Metadata
- RPC Calls 
    - Unary Messages 
    - Server Streaming 
    - Client Streaming 
    - Bidirectional Streaming 


### Metadata 
it located under `call.metadata` property

### Request Data
all the request is is located under `call.request` property 



## Need to learn about openSSL 
It's a opensource command line tool to generate ssl / TSL certificate. 

In order to generate the key pair we need to run this command 
`openssl genrsa -out <name>.key <key-size | 2048>`


extract public key form key pair
`openssl rsa -in <inputfile>.key -pubout --out <name>.pub`


Generate CSR
`openssl req -new -key <name>.key -out <name>.csr`

verify 
`openssl req -text -in <name>.csr -noout -verify`


Self Signing Certificate
`openssl x509 -in <name>.csr -out <name>.crt -req -singkey <keyname>.key -days <day in number>`


Generate key pair 
Extrackt Publick Key

CA = Certification Authoritiy 
CSR = Certificate Singining Request

Generate Selfsing Certificate

GUI tools : http://portecle.sourceforge.net/

https://www.youtube.com/watch?v=d8OpUcHzTeg
