# Prima
Repository for the module "Prototyping interactive media-applications and games" at Furtwangen University

[Pages-Version](https://jirkadelloro.github.io/Prima/)


## Meine Abgabe
* Meine Abgabe ist ein Golf-Spiel basierend auf dem erfolgreichen Spiel "Golf with your friends" und ist [HIER](https://github.com/tobifischer/PRIMA_AbgabeSoSe21) zu finden.
* Eine [PDF](https://github.com/tobifischer/PRIMA_AbgabeSoSe21/blob/main/GolfWithYourFudge.pdf) mit der Chackliste und Konzept ist hochgeladen unter dem Titel "GolfWithYorFudge" 

## How to play
*   [HIER](https://tobifischer.github.io/PRIMA_AbgabeSoSe21/Golf/Golf.html) kann man das Spiel ausprobieren

## - Spielanleitung -
* Steuerung:

* W - Schlag aufladen
* Maus - Umgucken + Zielen
* (die Steuerung ist aber auch nochmal im Spiel selber sichtbar)

## Ziel:
* Ziel des Spiels ist es mit so wenig Schlaegen wie moeglich das Ziel zu erreichen.

## Checkliste für Leistungsnachweis
© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU

| Nr | Bezeichnung           | Inhalt                                                                                                                                                                                                                                                                         |
|---:|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    | Titel                 | Golf
|    | Name                  | Fischer, Tobias
|    | Matrikelnummer        | 262145
|  1 | Nutzerinteraktion     | Der Nutzer kann mit der Applikation via Maus und Tastatur interagieren. Die Kamerarotation erfolgt durch das Bewegen der Maus und die Schusskraft lädt sich durch das Drücken der W-Taste auf.                                                                                                                                                 |
|  2 | Objektinteraktion     | Mit Hilfe von Kollisionsprüfung interagieren der Ball mit dem Ziel. Hier wird sobald der Collider des Balls den Collider des Ziels berührt der Schriftzug "Gewonnen" angezeigt. Ebenso besitzt der Boden, die Wände und die Hindernisse natürlich einen Collider der undurchlässig für den Collider des Balls ist.                                                                                                                                                                                  |
|  3 | Objektanzahl variabel | Der Nutzer kann eine variable Anzahl von Objekten einsammeln die zur Laufzeit generiert werden. Diese geben Extra-Punkte. (Leider war dieses Feature aus zeitlichen Gründen nicht implementierbar und wird eventuell in der Zukunft hinzugefügt)                                                                                                                                                      |
|  4 | Szenenhierarchie      | Die Szenenhierarchie ist so aufgebaut, dass es den Haupt-Knoten gibt unter dem sich dann zwei weitere Knoten, "Node_Ball" und "Node_Enviroment", befinden. Da sich die Kamera um den Ball dreht befindet diese sich in dem Knoten "Node_Ball". Alle Level-Bestandteile wie die Wände, Hindernisse und das Ziel befinden sich unter dem Knoten "Node_Enviroment".                                                                                                                                                         |
|  5 | Sound                 | Es läuft im Hintergrund eine sich wiederholende Hintergrundmusik, es gibt einen Ton für die Schläge und das Aufsammeln von Extra-Punkten. (Leider war dieses Feature aus zeitlichen Gründen nicht implementierbar und wird eventuell in der Zukunft hinzugefügt)                                                            |
|  6 | GUI                   | Ein grafisches Interface zeigt dem Nutzer eine knappe Spielanleitung, die aktuelle Anzahl der Schläge und die Kraft die der Nutzer beim Drücken der W-Taste auflädt. Sobald der Nutzer mit dem Ball durch das Ziel kommt wird diesem der Schriftzug "Gewonnen" angezeigt.                                                                                  |
|  7 | Externe Daten         | Nachdem der Nutzer das erste Level geschafft hat wird dieser Erfolg in einer JSON gespeichert sodass der Nutzer beim erneuten Starten des Spiels in ein anderes Level oder eine schwierigere Version des bereits gespielten Levels startet. (Leider war dieses Feature aus zeitlichen Gründen nicht implementierbar und wird eventuell in der Zukunft hinzugefügt)                                                                                 |
|  8 | Verhaltensklassen     | Der Schlag um den Ball zu bewegen kann erst wieder aufgeladen werden sobald der Ball komplett still steht.                                                                                            |
|  9 | Subklassen            | Die Kamera ist ein Unter-Objekt des Balls da sich diese um den Ball rotieren soll. |
| 10 | Maße & Positionen     | Der Ball ist bei mir die Maßeinheit 1. Daran habe ich alle anderen Objekte orientiert.                                                            |
| 11 | Event-System          | Das Event-System verwende ich für Kamerasteuerung mit der Maus, das Aufladen den Schusses mit der Tastatur und das "Maus-Lock"-System. Im Großen und Ganzen werden alle Inputs des Nutzers über das Event-System verarbeitet.                                                                                                                                                                                  |
