# Webhook TELEPORT Sample 

[![XO code style][xo-img]][xo]

[xo-img]:        https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:            https://github.com/sindresorhus/xo

Exemplos de payloads

## Usage

Faça o download ou um clone do projeto e siga as instruções da linguagem que deseja testar

### Node

Exemplo utilizando Koa + WebSocket para debug

```shell
cd node
npm i
npm start
```

### ngrok

Você pode utilizar o [ngrok](https://ngrok.com/download) para expor seu localhost para a internet

```shell
./ngrok http 3000
```

#### Teste

Podemos testar via `curl`

```shell
curl -v -X POST \
'http://2740d34a.ngrok.io/payload-secure' \
-H "Content-Type: application/json" \
-H "X-Teleport-Signature: sha1=95ae2a828b424366bd65f856d37ec9571f559098" \
-d '{"test":"teleport_webhook"}'
```

## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Thiago Lagden" width="100">](http://lagden.in) 
[<img src="https://avatars.githubusercontent.com/u/16941680?s=390" alt="Rafael Jung Vilanova" width="100">](https://github.com/rafajv)
[<img src="https://avatars.githubusercontent.com/u/16021345?s=390" alt="Marcelo Poletti" width="100">](https://github.com/PolettiTex)


## Copyright

[TEx Tecnologia](https://www.textecnologia.com.br/)
