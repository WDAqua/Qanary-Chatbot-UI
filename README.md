# Chatbot Frontend

Diese Anwendung diente ursprünglich als Übergangsfrontend für den Coronabot. Inzwischen wurde es zu einem verallgemeinerten Chatbot-Frontend umgebaut. Weiterhin dient es als Beispiel für Studierende für eine vollständige und dokumentierte Anwendung, anhand derer man die Modellierung und das Testen größerer Anwendungen exemplarisch lernen kann.

Die Anwendung ist einfach zu starten und zu konfigurieren. Lediglich ein Chatbot-Backend wird benötigt, um sie vollumfänglich zu nutzen. Es wird zu einem späteren Zeitpunkt noch ein Beispiel dafür in der Default-Konfiguration bereitgestellt werden.

Zur Konfiguration muss nur in der `config.json` der Wert von `"chatbot-backend-url"` zu der URL des Chatbot-Backend angepasst werden. Weiterhin sollte die URL von `"chatbot-frontend-url"` zu der URL der Anwendung geändert werden. Diese ist normalerweise einfach `http://localhost:3000` (wenn sie per `npm start` gestartet wird) oder `http://localhost:41387` (wenn sie per `docker-compose up` gestartet wird).

Um die Anwendung zu starten, müssen folgende Schritte durchgeführt werden:

1. Die Anwendung per `docker-compose up` (Windows, Docker und docker-compose müssen installiert sein) bzw. `sudo docker-compose up` (Linux, Docker und docker-compose müssen installiert sein) oder einfach `npm start` im Verzeichnis `corona-chatbot` starten.
2. Die Anwendung unter der passenden URL aufrufen. Das ist normalerweise entweder [`npm start`](http://localhost:3000) oder [`docker-compose up`](http://localhost:41387).

Wenn Sie die Tests ausführen wollen, geben Sie `npm test` in die Konsole ein, während Sie sich im Verzeichnis `corona-chatbot` befinden.
