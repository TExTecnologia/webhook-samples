# Webhook TELEPORT Samples

Exemplos de APIs


## Usage

Faça o download ou um clone do projeto e siga as instruções abaixo


### Node

Exemplo utilizando [Koa](http://koajs.com/)

```shell
cd node
npm i
npm start
```

### Ruby

Exemplo utilizando [Sinatra](http://www.sinatrarb.com/)

```shell
cd ruby
bundle install
ruby server.rb
```

### ngrok (para testes)

Você pode utilizar o [ngrok](https://ngrok.com/download) para expor sua maquina local para a internet

```shell
./ngrok http 3000
```

#### Exemplo utilizando o ngrok

Via **curl**

```shell
curl -v 'http://{hash-hex-gerado}.ngrok.io/payload-secure' \
-H "Content-Type: application/json" \
-H "X-Teleport-Signature: sha1=95ae2a828b424366bd65f856d37ec9571f559098" \
-d '{"test":"teleport_webhook"}'
```

## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Thiago Lagden" width="100">](http://lagden.in) 


## Copyright

[TEx Tecnologia](https://www.textecnologia.com.br/)
