# Qanary Chatbot UI

This easy-to-use Chatbot UI application provides easy access to a Question Answering (QA) system built using the [Qanary framework](https://github.com/WDAqua/Qanary) (or another system that implements the required JSON-producing RESTful web service interface). You can host your own Chatbot Web UI or just use our [demo installation](https://webengineering.ins.hs-anhalt.de:43712/).

Of course, you can connect also to your own Qanary-driven QA system. The Web UI contains an easy-to-use configuration (see the upper right corner of the screenshot) where you can connect instantly to the/your Qanary service and define on-the-fly the Qanary QA components you would like to use.

![qanary-chatbot-ui](https://user-images.githubusercontent.com/6186824/120986221-a438f380-c77c-11eb-8078-5e19d51a0874.png)

## How To Configure

### Deployment Configuration

#### Port

To change the port, simply edit the [`.env`](./.env) file and change `QANARY_UI_PORT`'s value to the desired port.

Example for running the application on port `8000`:

```
QANARY_UI_PORT=8000
```

#### TLS Certificates

Certificates are disabled by by default, but you may add your own due to higher security. You might configure them following the instructions:

1. Edit the [`nginx.conf`](docker/nginx/nginx.conf) file.
2. Comment lines 10 to 17 of the configuration back in.
   * Before:

      ```nginx
      #ssl_certificate path-to-file-on-your-system.cert;
      #ssl_certificate_key path-to-file-on-your-system.key;
      #
      #sl_protocols TLSv1.2 TLSv1.3;
      #ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
      #ssl_prefer_server_ciphers on;
      #ssl_ecdh_curve secp384r1;
      ```

   * After:

      ```nginx
      ssl_certificate path-to-file-on-your-system.cert;
      ssl_certificate_key path-to-file-on-your-system.key;
    
      ssl_protocols TLSv1.2 TLSv1.3;
      ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
      ssl_prefer_server_ciphers on;
      ssl_ecdh_curve secp384r1;
      ```

3. In line 9, change `listen 443;` to `listen 443 ssl;`
4. If it does not yet exist, create a directory called `certs` inside the existing directory `docker`.
5. Copy your certificate to the folder `docker/certs` and name the files "`MY.DOMAIN`.cert" and "`MY.DOMAIN`.key" respectively. Replace `MY.DOMAIN` with whatever you wish.
6. In the [`nginx.conf`](docker/nginx/nginx.conf) file, replace "webengineering.ins.hs-anhalt.de" in lines 11 to 12 with the name(s) you chose for your files.
7. Open the file [`Dockerfile`](Dockerfile) in an editor.
8. Remove the comment in line 15:
   * Before:

      ```Dockerfile
      #COPY ./docker/certs /etc/nginx/certs
      ```

   * After:

      ```Dockerfile
      COPY ./docker/certs /etc/nginx/certs
      ```

#### Server Name

This is the name of the server which accepts the request. [See here](https://nginx.org/en/docs/http/server_names.html) for further details.

Simply change "webengineering.ins.hs-anhalt.de" in lines 3 and 10 to whatever your domain name is.

### Application Configuration

The application itself can be handily configured using the [`.env`](./.env) file. Its keys and values must be valid for JavaScript objects because they're injected as JavaScript code when the container starts. Example:

```text
ENV_VAR_STRING="value"
ENV_VAR_OBJECT={key: "value"}
ENV_VAR_ARRAY=["value1", "value2"]
```

Becomes:

```js
{
  ENV_VAR_STRING: "value",
  ENV_VAR_OBJECT: {key: "value"},
  ENV_VAR_ARRAY: ["value1", "value2"],
}
```

It offers the following fields:

* `DEFAULT_CHATBOT_BACKEND_URL`
  * Explanation: The default Qanary backend to which requests are sent. It should feature the protocol, domain and port. This can also be configured at run-time.
  * Example (here a demo server we provided for testing your local Chatbot UI deployment):

  ```text
  DEFAULT_CHATBOT_BACKEND_URL="https://webengineering.ins.hs-anhalt.de:43740" 
  ```

* `DEFAULT_CHATBOT_COMPONENTS`
  * Explanation: The default Qanary components which will be used to handle requests. This can also be configured at run-time.
  * Example (here a component configuration we provided on our demo for testing your local Chatbot UI deployment):

  ```text
  DEFAULT_CHATBOT_COMPONENTS=["NED-DBpediaSpotlight","QueryBuilderSimpleRealNameOfSuperHero","SparqlExecuter","OpenTapiocaNED","BirthDataQueryBuilder","WikidataQueryExecuter"]
  ```

* `DEFAULT_CHATBOT_FRONTEND_URL`
  * Explanation: The external URL of your own Qanary frontend that your page header links will point to.
  * Example (here the configuration of our demo Chatbot UI):

  ```text
  DEFAULT_CHATBOT_FRONTEND_URL="https://webengineering.ins.hs-anhalt.de:43712/"
  ```

* `DEFAULT_LANGUAGE`
  * Explanation: The application's default language. Only supported languages can be used here. The currently supported languages are English (en) and German (de). You might add new languages in the folder [`src/texts`](../main/src/texts)  A user can change the languages at run-time by clicking on the flag icon.
  * Example:

  ```text
  DEFAULT_LANGUAGE="de"
  ```

* `INITIAL_QUESTION_PARAMETER_NAME`
  * Explanation: The name of the query parameter for the initial question. The initial question is immediately sent to the specified backend upon page load. This query parameter is updated with every question and allows sharing specific queries. It is recommended to use something that's easily understandable, e.g., `"question"` or `"query"`.
  * Example:

  ```text
  INITIAL_QUESTION_PARAMETER_NAME="question"
  ```

## How To Deploy  using `docker-compose`

The chatbot UI can easily be deployed by using the existing Docker set-up or by simply [pulling the official image from Dockerhub](#how-to-deploy-via-docker-image-from-dockerhub). The images are available as [`qanary/qanary-ui` at Docker Hub](https://hub.docker.com/r/qanary/qanary-ui/tags).

### Prerequisites

1. If not yet installed, get the [Docker Engine](https://docs.docker.com/engine/install/).
2. If not yet installed, get [Docker Compose](https://docs.docker.com/compose/install/).

### Running `docker-compose`

1. Open a terminal
2. Navigate to the project directory.
3. Type `docker-compose up --build -d` into the terminal and press `⏎ enter`.

The chatbot UI will now be accessible on the [configured address](#how-to-configure).

## How To Deploy Via Docker Image From Dockerhub

The [prerequisites for regular Docker deployment](#prerequisites) also apply here.

### Pulling and Running

To simply pull the application from Dockerhub and run it as is, follow these steps:

1. Open a terminal.
2. Execute the following command. Hereby, replace `QANARY_UI_PORT` with the port the application should run on your system.

```shell
docker run -p QANARY_UI_PORT:443 -d --restart on-failure:1 qanary/qanary-ui:latest
```

To configure the application, you need to overwrite environment variables in the container on start-up. Only the environment variables specified in the existing [`.env`](./.env) file can be overwritten. Simply modify the previously described steps to include one or both of the following methods.

* Individual variables by example of `DEFAULT_LANGUAGE` and `INITIAL_QUESTION_PARAMETER_NAME`:

  ```sh
  docker run -e "DEFAULT_LANGUAGE=\"en\"" -e "INITIAL_QUESTION_PARAMETER_NAME=\"query\"" -p 8000:443 -d --restart on-failure:1 qanary/qanary-ui:latest
  ```
  * Remark: Please check also the parameters `-p` (mapped ports) and `--restart` which are set to typical values. However, they might not fit to your setting.

* It might be convienient to use a `.env` file to store your configuration (parameter: `--env-file`). Example for using a `.env` file:
  
  ```sh
  docker run --env-file prod.env -p 8000:443 -d --restart on-failure:1 qanary/qanary-ui:latest
  ```

For more information, see [the official documentation](https://docs.docker.com/engine/reference/commandline/run/#set-environment-variables--e---env---env-file)
