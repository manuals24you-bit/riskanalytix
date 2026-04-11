const fs = require('fs');
let c = fs.readFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', 'utf8');

const translations = {
  pl: `
        l14: { element: 'Transport maszyny (suwnica / w\u00f3zek)', threat: 'Upadek / przewr\u00f3cenie maszyny', effect: 'Zgniecenie os\u00f3b, uszkodzenie maszyny' },
        l15: { element: 'Instalacja / poziomowanie maszyny', threat: 'Po\u015blizg / przewr\u00f3cenie podczas ustawiania', effect: 'Zgniecenie ko\u0144czyn' },
        l16: { element: 'Pod\u0142\u0105czenie elektryczne (400V / 3-faz)', threat: 'Pora\u017cenie pr\u0105dem podczas pod\u0142\u0105czania', effect: 'Oparzenie, \u015bmier\u0107' },
        l17: { element: 'Pierwsze uruchomienie / rozruch pr\u00f3bny', threat: 'B\u0142\u0105d kierunku obrot\u00f3w wrzeciona', effect: 'Wyrzucenie detalu lub narz\u0119dzia' },
        l18: { element: 'Konfiguracja programu CNC', threat: 'B\u0142\u0105d w programie NC \u2014 kolizja osi', effect: 'Uszkodzenie maszyny, uraz operatora' },
        l19: { element: 'Uchwyt hydrauliczny / pneumatyczny', threat: 'Utrata ci\u015bnienia \u2014 wypadni\u0119cie detalu', effect: 'Uderzenie wyrzuconym detalem' },
        l20: { element: 'Automatyczna zmiana narz\u0119dzi (rewolwer)', threat: 'Uderzenie g\u0142owic\u0105 rewolwerow\u0105', effect: 'St\u0142uczenia, z\u0142amania ko\u0144czyn' },
        l21: { element: 'Praca w trybie serwisowym (JOG / MDI)', threat: 'Niezamierzone uruchomienie osi przy serwisie', effect: 'Zgniecenie ko\u0144czyn operatora / serwisanta' },
        l22: { element: 'P\u0119kni\u0119cie uchwytu \u2014 utrata detalu', threat: 'Wyrzucenie fragment\u00f3w uchwytu lub detalu', effect: 'Ci\u0119\u017ckie urazy \u2014 \u015bmier\u0107' },
        l23: { element: 'Kolizja narz\u0119dzia / suportu z detalem', threat: 'Kolizja suportu z detalem lub uchwytem', effect: 'Uszkodzenie maszyny, odrzut element\u00f3w' },
        l24: { element: 'Obr\u00f3bka materia\u0142\u00f3w reaktywnych (Mg, Ti)', threat: 'Zap\u0142on py\u0142u magnezowego / tytanowego', effect: 'Po\u017car, wybuch' },
        l25: { element: 'O\u015bwietlenie strefy obr\u00f3bki', threat: 'Niedostateczne o\u015bwietlenie \u2014 b\u0142\u0105d operatora', effect: 'Uraz wynikaj\u0105cy z b\u0142\u0119du obserwacji' },
        l26: { element: 'Zanik zasilania / nag\u0142e wy\u0142\u0105czenie', threat: 'Niekontrolowany ruch osi przy powrocie zasilania', effect: 'Kolizja, uraz operatora' },
        l27: { element: 'Awaria hamulca wrzeciona', threat: 'Wybi\u0119g wrzeciona po wy\u0142\u0105czeniu', effect: 'Kontakt z obracaj\u0105cym si\u0119 uchwytem' },
        l28: { element: 'Awaria uk\u0142adu ch\u0142odzenia', threat: 'Przegrzanie narz\u0119dzia \u2014 po\u017car lub wyrzut', effect: 'Oparzenia, po\u017car' },
        l29: { element: 'Awaria czujnik\u00f3w kra\u0144cowych (limit switches)', threat: 'Przekroczenie zakresu ruchu osi', effect: 'Kolizja mechaniczna, uszkodzenie maszyny' },
        l30: { element: 'Czyszczenie maszyny / usuwanie wi\u00f3r\u00f3w', threat: 'Skaleczenie od ostrych wi\u00f3r\u00f3w metalowych', effect: 'Rany ci\u0119te r\u0105k' },
        l31: { element: 'Wymiana oleju / p\u0142yn\u00f3w eksploatacyjnych', threat: 'Kontakt sk\u00f3rny z olejem maszynowym', effect: 'Dermatoza, zatrucie przy spo\u017cyciu' },
        l32: { element: 'Regulacja / wymiana szcz\u0119k uchwytu', threat: 'Przygniecenie palc\u00f3w przez szcz\u0119ki', effect: 'Zmiażdżenie palców' },
        l33: { element: 'Serwis uk\u0142adu hydraulicznego', threat: 'Wtrysk oleju hydraulicznego pod ci\u015bnieniem', effect: 'Wtrysk oleju pod sk\u00f3r\u0119 \u2014 amputacja' },
        l34: { element: 'Demonta\u017c / z\u0142omowanie maszyny', threat: 'Upadek ci\u0119\u017ckich element\u00f3w przy demonta\u017cu', effect: 'Zgniecenie, \u015bmier\u0107' },`,

  en: `
        l14: { element: 'Machine transport (crane / forklift)', threat: 'Machine fall / tipping over', effect: 'Crushing of persons, machine damage' },
        l15: { element: 'Machine installation / levelling', threat: 'Slip / tipping during setup', effect: 'Crushing of limbs' },
        l16: { element: 'Electrical connection (400V / 3-phase)', threat: 'Electric shock during connection', effect: 'Burns, death' },
        l17: { element: 'First start-up / trial run', threat: 'Wrong spindle rotation direction', effect: 'Ejection of workpiece or tool' },
        l18: { element: 'CNC program configuration', threat: 'NC program error \u2014 axis collision', effect: 'Machine damage, operator injury' },
        l19: { element: 'Hydraulic / pneumatic chuck', threat: 'Pressure loss \u2014 workpiece ejection', effect: 'Impact from ejected workpiece' },
        l20: { element: 'Automatic tool change (turret)', threat: 'Impact from turret head', effect: 'Bruising, limb fractures' },
        l21: { element: 'Service mode operation (JOG / MDI)', threat: 'Unintended axis movement during service', effect: 'Crushing of operator / technician limbs' },
        l22: { element: 'Chuck failure \u2014 workpiece loss', threat: 'Ejection of chuck fragments or workpiece', effect: 'Severe injuries \u2014 death' },
        l23: { element: 'Tool / carriage collision with workpiece', threat: 'Carriage collision with workpiece or chuck', effect: 'Machine damage, part ejection' },
        l24: { element: 'Machining of reactive materials (Mg, Ti)', threat: 'Ignition of magnesium / titanium dust', effect: 'Fire, explosion' },
        l25: { element: 'Machining zone lighting', threat: 'Insufficient lighting \u2014 operator error', effect: 'Injury resulting from observation error' },
        l26: { element: 'Power loss / sudden shutdown', threat: 'Uncontrolled axis movement on power return', effect: 'Collision, operator injury' },
        l27: { element: 'Spindle brake failure', threat: 'Spindle coasting after switch-off', effect: 'Contact with rotating chuck' },
        l28: { element: 'Coolant system failure', threat: 'Tool overheating \u2014 fire or ejection', effect: 'Burns, fire' },
        l29: { element: 'Limit switch failure', threat: 'Axis travel beyond range', effect: 'Mechanical collision, machine damage' },
        l30: { element: 'Machine cleaning / chip removal', threat: 'Cuts from sharp metal chips', effect: 'Hand lacerations' },
        l31: { element: 'Oil / fluid change', threat: 'Skin contact with machine oil', effect: 'Dermatitis, poisoning if ingested' },
        l32: { element: 'Chuck jaw adjustment / replacement', threat: 'Finger crushing by chuck jaws', effect: 'Crushed fingers' },
        l33: { element: 'Hydraulic system service', threat: 'High-pressure hydraulic oil injection', effect: 'Oil injection under skin \u2014 amputation' },
        l34: { element: 'Machine dismantling / scrapping', threat: 'Heavy parts falling during dismantling', effect: 'Crushing, death' },`,

  de: `
        l14: { element: 'Maschinentransport (Kran / Stapler)', threat: 'Maschinenfall / Umkippen', effect: 'Zerqu\u00e4tschung von Personen, Maschinenschaden' },
        l15: { element: 'Maschineninstallation / Ausrichten', threat: 'Ausrutschen / Umkippen beim Aufstellen', effect: 'Zerqu\u00e4tschung der Gliedma\u00dfen' },
        l16: { element: 'Elektroanschluss (400V / 3-phasig)', threat: 'Stromschlag beim Anschlie\u00dfen', effect: 'Verbrennung, Tod' },
        l17: { element: 'Erstinbetriebnahme / Probelauf', threat: 'Falsche Spindeldrehrichtung', effect: 'Ausschleudern von Werkst\u00fcck oder Werkzeug' },
        l18: { element: 'CNC-Programmkonfiguration', threat: 'NC-Programmfehler \u2014 Achsenkollision', effect: 'Maschinenschaden, Bedienverletzung' },
        l19: { element: 'Hydraulisch / pneumatisches Spannfutter', threat: 'Druckverlust \u2014 Werkst\u00fcckausschleuderung', effect: 'Schlag durch ausgeschleudertes Werkst\u00fcck' },
        l20: { element: 'Automatischer Werkzeugwechsel (Revolver)', threat: 'Schlag durch Revolverkopf', effect: 'Prellung, Gliedma\u00dfenbr\u00fcche' },
        l21: { element: 'Betrieb im Servicemodus (JOG / MDI)', threat: 'Unbeabsichtigte Achsbewegung beim Service', effect: 'Zerqu\u00e4tschung der Gliedma\u00dfen' },
        l22: { element: 'Spannfutterbruch \u2014 Werkst\u00fcckverlust', threat: 'Ausschleudern von Spannfutterteilen', effect: 'Schwere Verletzungen \u2014 Tod' },
        l23: { element: 'Werkzeug- / Schlittenkollision mit Werkst\u00fcck', threat: 'Schlittenkollision mit Werkst\u00fcck oder Futter', effect: 'Maschinenschaden, Teileausschleuderung' },
        l24: { element: 'Bearbeitung reaktiver Werkstoffe (Mg, Ti)', threat: 'Entz\u00fcndung von Magnesium- / Titanstaub', effect: 'Brand, Explosion' },
        l25: { element: 'Beleuchtung der Bearbeitungszone', threat: 'Unzureichende Beleuchtung \u2014 Bedienfehler', effect: 'Verletzung durch Beobachtungsfehler' },
        l26: { element: 'Stromausfall / pl\u00f6tzliche Abschaltung', threat: 'Unkontrollierte Achsbewegung bei Stromr\u00fcckkehr', effect: 'Kollision, Bedienverletzung' },
        l27: { element: 'Spindelbremsenausfall', threat: 'Spindelauslauf nach Abschaltung', effect: 'Kontakt mit rotierendem Futter' },
        l28: { element: 'K\u00fchlsystemausfall', threat: 'Werkzeug\u00fcberhitzung \u2014 Brand oder Ausschleuderung', effect: 'Verbrennungen, Brand' },
        l29: { element: 'Endschalterausfall (Limit Switches)', threat: '\u00dcberschreitung des Achsfahrbereichs', effect: 'Mechanische Kollision, Maschinenschaden' },
        l30: { element: 'Maschinenreinigung / Spanentfernung', threat: 'Schnittverletzungen durch scharfe Sp\u00e4ne', effect: 'Handschnittwunden' },
        l31: { element: '\u00d6l- / Fl\u00fcssigkeitswechsel', threat: 'Hautkontakt mit Maschinen\u00f6l', effect: 'Dermatitis, Vergiftung bei Einnahme' },
        l32: { element: 'Backenjustierung / -wechsel am Spannfutter', threat: 'Fingerquetschung durch Spannbacken', effect: 'Zerquetschte Finger' },
        l33: { element: 'Hydrauliksystemwartung', threat: 'Hochdruckhydraul\u00f6linjektion', effect: '\u00d6linjektion unter die Haut \u2014 Amputation' },
        l34: { element: 'Maschinendemontage / Verschrottung', threat: 'Schwere Teile fallen bei Demontage', effect: 'Zerqu\u00e4tschung, Tod' },`,

  fr: `
        l14: { element: 'Transport machine (pont roulant / chariot)', threat: 'Chute / renversement de la machine', effect: '\u00c9crasement de personnes, dommages machine' },
        l15: { element: 'Installation / mise \u00e0 niveau de la machine', threat: 'Glissement / renversement pendant la mise en place', effect: '\u00c9crasement des membres' },
        l16: { element: 'Raccordement \u00e9lectrique (400V / triphas\u00e9)', threat: '\u00c9lectrocution lors du raccordement', effect: 'Br\u00fblures, mort' },
        l17: { element: 'Premier d\u00e9marrage / essai de marche', threat: 'Mauvais sens de rotation de la broche', effect: '\u00c9jection de la pi\u00e8ce ou de l\'outil' },
        l18: { element: 'Configuration du programme CNC', threat: 'Erreur programme NC \u2014 collision d\'axes', effect: 'D\u00e9g\u00e2ts machine, blessure op\u00e9rateur' },
        l19: { element: 'Mandrin hydraulique / pneumatique', threat: 'Perte de pression \u2014 \u00e9jection de pi\u00e8ce', effect: 'Coup de la pi\u00e8ce \u00e9ject\u00e9e' },
        l20: { element: 'Changement automatique d\'outils (tourelle)', threat: 'Choc de la t\u00eate de tourelle', effect: 'Contusions, fractures des membres' },
        l21: { element: 'Travail en mode service (JOG / MDI)', threat: 'D\u00e9placement d\'axe involontaire lors de la maintenance', effect: '\u00c9crasement des membres op\u00e9rateur / technicien' },
        l22: { element: 'Rupture du mandrin \u2014 perte de pi\u00e8ce', threat: '\u00c9jection de fragments du mandrin ou de la pi\u00e8ce', effect: 'Blessures graves \u2014 mort' },
        l23: { element: 'Collision outil / chariot avec la pi\u00e8ce', threat: 'Collision du chariot avec la pi\u00e8ce ou le mandrin', effect: 'D\u00e9g\u00e2ts machine, \u00e9jection de pi\u00e8ces' },
        l24: { element: 'Usinage de mat\u00e9riaux r\u00e9actifs (Mg, Ti)', threat: 'Inflammation des poussi\u00e8res de magn\u00e9sium / titane', effect: 'Incendie, explosion' },
        l25: { element: 'Eclairage de la zone d\'usinage', threat: '\u00c9clairage insuffisant \u2014 erreur op\u00e9rateur', effect: 'Blessure due \u00e0 une erreur d\'observation' },
        l26: { element: 'Coupure de courant / arr\u00eat soudain', threat: 'Mouvement d\'axe incontr\u00f4l\u00e9 au retour du courant', effect: 'Collision, blessure op\u00e9rateur' },
        l27: { element: 'D\u00e9faillance du frein de broche', threat: 'Lent\u00e9 d\'arr\u00eat de la broche apr\u00e8s coupure', effect: 'Contact avec le mandrin en rotation' },
        l28: { element: 'D\u00e9faillance du syst\u00e8me de refroidissement', threat: 'Surchauffe de l\'outil \u2014 incendie ou \u00e9jection', effect: 'Br\u00fblures, incendie' },
        l29: { element: 'D\u00e9faillance des fins de course', threat: 'D\u00e9passement de la plage de d\u00e9placement d\'axe', effect: 'Collision m\u00e9canique, d\u00e9g\u00e2ts machine' },
        l30: { element: 'Nettoyage machine / enlèvement des copeaux', threat: 'Coupures par copeaux m\u00e9talliques tranchants', effect: 'Plaies aux mains' },
        l31: { element: 'Vidange huile / fluides', threat: 'Contact cutan\u00e9 avec l\'huile machine', effect: 'Dermatite, empoisonnement en cas d\'ing\u00e9stion' },
        l32: { element: 'R\u00e9glage / remplacement des mors du mandrin', threat: '\u00c9crasement des doigts par les mors', effect: 'Doigts \u00e9cras\u00e9s' },
        l33: { element: 'Entretien du circuit hydraulique', threat: 'Injection d\'huile hydraulique haute pression', effect: 'Injection d\'huile sous la peau \u2014 amputation' },
        l34: { element: 'D\u00e9montage / mise au rebut machine', threat: 'Chute de pi\u00e8ces lourdes lors du d\u00e9montage', effect: '\u00c9crasement, mort' },`,

  it: `
        l14: { element: 'Trasporto macchina (gru / carrello)', threat: 'Caduta / ribaltamento della macchina', effect: 'Schiacciamento di persone, danno macchina' },
        l15: { element: 'Installazione / livellamento macchina', threat: 'Scivolamento / ribaltamento durante la messa in opera', effect: 'Schiacciamento degli arti' },
        l16: { element: 'Collegamento elettrico (400V / trifase)', threat: 'Folgorazione durante il collegamento', effect: 'Ustioni, morte' },
        l17: { element: 'Primo avviamento / prova di marcia', threat: 'Direzione di rotazione mandrino errata', effect: 'Espulsione del pezzo o dell\'utensile' },
        l18: { element: 'Configurazione programma CNC', threat: 'Errore programma NC \u2014 collisione assi', effect: 'Danno macchina, infortunio operatore' },
        l19: { element: 'Mandrino idraulico / pneumatico', threat: 'Perdita di pressione \u2014 espulsione pezzo', effect: 'Colpo dal pezzo espulso' },
        l20: { element: 'Cambio utensile automatico (torretta)', threat: 'Colpo dalla testa torretta', effect: 'Contusioni, fratture agli arti' },
        l21: { element: 'Lavoro in modalit\u00e0 servizio (JOG / MDI)', threat: 'Movimento asse involontario durante la manutenzione', effect: 'Schiacciamento arti operatore / tecnico' },
        l22: { element: 'Rottura mandrino \u2014 perdita pezzo', threat: 'Espulsione frammenti mandrino o pezzo', effect: 'Lesioni gravi \u2014 morte' },
        l23: { element: 'Collisione utensile / slitta con pezzo', threat: 'Collisione slitta con pezzo o mandrino', effect: 'Danno macchina, espulsione parti' },
        l24: { element: 'Lavorazione materiali reattivi (Mg, Ti)', threat: 'Accensione polvere di magnesio / titanio', effect: 'Incendio, esplosione' },
        l25: { element: 'Illuminazione zona lavorazione', threat: 'Illuminazione insufficiente \u2014 errore operatore', effect: 'Infortunio da errore di osservazione' },
        l26: { element: 'Mancanza alimentazione / spegnimento improvviso', threat: 'Movimento asse incontrollato al ritorno alimentazione', effect: 'Collisione, infortunio operatore' },
        l27: { element: 'Guasto freno mandrino', threat: 'Inerzia mandrino dopo spegnimento', effect: 'Contatto con mandrino in rotazione' },
        l28: { element: 'Guasto sistema refrigerazione', threat: 'Surriscaldamento utensile \u2014 incendio o espulsione', effect: 'Ustioni, incendio' },
        l29: { element: 'Guasto fine corsa (limit switches)', threat: 'Superamento della corsa asse', effect: 'Collisione meccanica, danno macchina' },
        l30: { element: 'Pulizia macchina / rimozione trucioli', threat: 'Tagli da trucioli metallici taglienti', effect: 'Lacerazioni alle mani' },
        l31: { element: 'Cambio olio / fluidi', threat: 'Contatto cutaneo con olio macchina', effect: 'Dermatite, avvelenamento se ingerito' },
        l32: { element: 'Regolazione / sostituzione griffe mandrino', threat: 'Schiacciamento dita dalle griffe', effect: 'Dita schiacciate' },
        l33: { element: 'Manutenzione sistema idraulico', threat: 'Iniezione olio idraulico ad alta pressione', effect: 'Iniezione olio sotto pelle \u2014 amputazione' },
        l34: { element: 'Smontaggio / rottamazione macchina', threat: 'Caduta parti pesanti durante lo smontaggio', effect: 'Schiacciamento, morte' },`,

  es: `
        l14: { element: 'Transporte de m\u00e1quina (gr\u00faa / carretilla)', threat: 'Ca\u00edda / vuelco de la m\u00e1quina', effect: 'Aplastamiento de personas, da\u00f1os en m\u00e1quina' },
        l15: { element: 'Instalaci\u00f3n / nivelaci\u00f3n de la m\u00e1quina', threat: 'Deslizamiento / vuelco durante la puesta en marcha', effect: 'Aplastamiento de extremidades' },
        l16: { element: 'Conexi\u00f3n el\u00e9ctrica (400V / trif\u00e1sica)', threat: 'Electrocuci\u00f3n durante la conexi\u00f3n', effect: 'Quemaduras, muerte' },
        l17: { element: 'Primera puesta en marcha / prueba de marcha', threat: 'Direcci\u00f3n de rotaci\u00f3n del husillo incorrecta', effect: 'Expulsi\u00f3n de pieza o herramienta' },
        l18: { element: 'Configuraci\u00f3n del programa CNC', threat: 'Error en programa NC \u2014 colisi\u00f3n de ejes', effect: 'Da\u00f1os en m\u00e1quina, lesi\u00f3n del operador' },
        l19: { element: 'Mandril hidr\u00e1ulico / neum\u00e1tico', threat: 'P\u00e9rdida de presi\u00f3n \u2014 expulsi\u00f3n de pieza', effect: 'Impacto de la pieza expulsada' },
        l20: { element: 'Cambio autom\u00e1tico de herramientas (torreta)', threat: 'Golpe de la cabeza de torreta', effect: 'Contusiones, fracturas de extremidades' },
        l21: { element: 'Trabajo en modo servicio (JOG / MDI)', threat: 'Movimiento de eje involuntario durante servicio', effect: 'Aplastamiento de extremidades operador / t\u00e9cnico' },
        l22: { element: 'Rotura del mandril \u2014 p\u00e9rdida de pieza', threat: 'Expulsi\u00f3n de fragmentos del mandril o pieza', effect: 'Lesiones graves \u2014 muerte' },
        l23: { element: 'Colisi\u00f3n herramienta / carro con pieza', threat: 'Colisi\u00f3n del carro con pieza o mandril', effect: 'Da\u00f1os en m\u00e1quina, expulsi\u00f3n de piezas' },
        l24: { element: 'Mecanizado de materiales reactivos (Mg, Ti)', threat: 'Ignici\u00f3n de polvo de magnesio / titanio', effect: 'Incendio, explosi\u00f3n' },
        l25: { element: 'Iluminaci\u00f3n de la zona de mecanizado', threat: 'Iluminaci\u00f3n insuficiente \u2014 error del operador', effect: 'Lesi\u00f3n por error de observaci\u00f3n' },
        l26: { element: 'Corte de corriente / apagado repentino', threat: 'Movimiento de eje incontrolado al volver la corriente', effect: 'Colisi\u00f3n, lesi\u00f3n del operador' },
        l27: { element: 'Fallo del freno del husillo', threat: 'Inercia del husillo tras apagado', effect: 'Contacto con mandril en rotaci\u00f3n' },
        l28: { element: 'Fallo del sistema de refrigeraci\u00f3n', threat: 'Sobrecalentamiento de herramienta \u2014 incendio o expulsi\u00f3n', effect: 'Quemaduras, incendio' },
        l29: { element: 'Fallo de finales de carrera (limit switches)', threat: 'Exceso de recorrido del eje', effect: 'Colisi\u00f3n mec\u00e1nica, da\u00f1os en m\u00e1quina' },
        l30: { element: 'Limpieza de m\u00e1quina / retirada de virutas', threat: 'Cortes por virutas met\u00e1licas afiladas', effect: 'Laceraciones en manos' },
        l31: { element: 'Cambio de aceite / fluidos', threat: 'Contacto cut\u00e1neo con aceite de m\u00e1quina', effect: 'Dermatitis, envenenamiento si se ingiere' },
        l32: { element: 'Ajuste / sustituci\u00f3n de mordazas del mandril', threat: 'Aplastamiento de dedos por mordazas', effect: 'Dedos aplastados' },
        l33: { element: 'Mantenimiento del sistema hidr\u00e1ulico', threat: 'Inyecci\u00f3n de aceite hidr\u00e1ulico a alta presi\u00f3n', effect: 'Inyecci\u00f3n de aceite bajo la piel \u2014 amputaci\u00f3n' },
        l34: { element: 'Desmontaje / desguace de m\u00e1quina', threat: 'Ca\u00edda de piezas pesadas durante el desmontaje', effect: 'Aplastamiento, muerte' },`,

  cs: `
        l14: { element: 'Doprava stroje (je\u0159\u00e1b / voz\u00edk)', threat: 'P\u00e1d / p\u0159evr\u00e1cen\u00ed stroje', effect: 'Rozm\u00e1\u010cknut\u00ed osob, po\u0161kozen\u00ed stroje' },
        l15: { element: 'Instalace / nivelace stroje', threat: 'Klouznut\u00ed / p\u0159evr\u00e1cen\u00ed p\u0159i nastaven\u00ed', effect: 'Rozm\u00e1\u010cknut\u00ed kon\u010detin' },
        l16: { element: 'Elektrick\u00e9 p\u0159ipojen\u00ed (400V / 3-f\u00e1zov\u00e9)', threat: '\u00daraz elektrick\u00fdm proudem p\u0159i p\u0159ipojen\u00ed', effect: 'Pop\u00e1leniny, smrt' },
        l17: { element: 'Prvn\u00ed spu\u0161t\u011bn\u00ed / zku\u0161ebn\u00ed provoz', threat: 'Chybn\u00fd sm\u011br ot\u00e1\u010den\u00ed vretena', effect: 'Vyvrhl obrobku nebo n\u00e1stroje' },
        l18: { element: 'Konfigurace programu CNC', threat: 'Chyba programu NC \u2014 kol\u00edze os\u00ed', effect: 'Po\u0161kozen\u00ed stroje, zran\u011bn\u00ed obsluhy' },
        l19: { element: 'Hydraulick\u00e9 / pneumatick\u00e9 sklicidlo', threat: 'Ztrata tlaku \u2014 vypadnut\u00ed obrobku', effect: 'N\u00e1raz vyvrhl obrobku' },
        l20: { element: 'Automatick\u00e1 v\u00fdm\u011bna n\u00e1stroj\u016f (revolverov\u00e1 hlava)', threat: 'N\u00e1raz revolverov\u00e9 hlavy', effect: 'Pohmozdin\u00e9, zlomeniny kon\u010detin' },
        l21: { element: 'Pr\u00e1ce v servisn\u00edm re\u017eimu (JOG / MDI)', threat: 'Nezam\u00fd\u0161len\u00fd pohyb osy p\u0159i servisu', effect: 'Rozm\u00e1\u010cknut\u00ed kon\u010detin obsluhy / servisn\u00edka' },
        l22: { element: 'Lom sklicidla \u2014 ztr\u00e1ta obrobku', threat: 'Vyvrhl fragment\u016f sklicidla nebo obrobku', effect: 'T\u011b\u017ek\u00e9 zran\u011bn\u00ed \u2014 smrt' },
        l23: { element: 'Kol\u00edze n\u00e1stroje / suportu s obrobkem', threat: 'Kol\u00edze suportu s obrobkem nebo sklicidlem', effect: 'Po\u0161kozen\u00ed stroje, odhoz d\u00edl\u016f' },
        l24: { element: 'Obr\u00e1b\u011bn\u00ed reaktivn\u00edch materi\u00e1l\u016f (Mg, Ti)', threat: 'Vzn\u00edcen\u00ed prachu hodn\u00e9ku / titanu', effect: 'Po\u017e\u00e1r, v\u00fdbuch' },
        l25: { element: 'Osv\u011btlen\u00ed obr\u00e1b\u011bc\u00ed z\u00f3ny', threat: 'Nedostate\u010dn\u00e9 osv\u011btlen\u00ed \u2014 chyba obsluhy', effect: 'Zran\u011bn\u00ed v d\u016fsledku chyby pozorov\u00e1n\u00ed' },
        l26: { element: 'V\u00fdpadek nap\u00e1jen\u00ed / n\u00e1hl\u00e9 vypnut\u00ed', threat: 'Nekontrolovan\u00fd pohyb osy p\u0159i obnoven\u00ed nap\u00e1jen\u00ed', effect: 'Kol\u00edze, zran\u011bn\u00ed obsluhy' },
        l27: { element: 'Por\u00facha brzdy vretena', threat: 'Dob\u011bh vretena po vypnut\u00ed', effect: 'Kontakt s rotuj\u00edc\u00edm sklicidlem' },
        l28: { element: 'Por\u00facha chladicho syst\u00e9mu', threat: 'P\u0159eh\u0159\u00e1t\u00ed n\u00e1stroje \u2014 po\u017e\u00e1r nebo vyvrhl', effect: 'Pop\u00e1leniny, po\u017e\u00e1r' },
        l29: { element: 'Por\u00facha koncov\u00fdch sp\u00edna\u010d\u016f (limit switches)', threat: 'P\u0159ekro\u010den\u00ed rozsahu pohybu osy', effect: 'Mechanick\u00e1 kol\u00edze, po\u0161kozen\u00ed stroje' },
        l30: { element: '\u010ci\u0161t\u011bn\u00ed stroje / odstra\u0148ov\u00e1n\u00ed t\u0159\u00edsek', threat: 'Poran\u011bn\u00ed od ostr\u00fdch kovov\u00fdch t\u0159\u00edsek', effect: 'Trhn\u00e9 rány na rukou' },
        l31: { element: 'V\u00fdm\u011bna oleje / provozn\u00edch kapalin', threat: 'Kontakt k\u016f\u017ee se strojn\u00edm olejem', effect: 'Dermatit\u00edda, otrava p\u0159i po\u017eit\u00ed' },
        l32: { element: 'Nastaven\u00ed / v\u00fdm\u011bna \u010delust\u00ed sklicidla', threat: 'Rozdrcen\u00ed prst\u016f \u010delistmi', effect: 'Zdrcen\u00e9 prsty' },
        l33: { element: 'Servis hydraulick\u00e9ho syst\u00e9mu', threat: 'Injekce hydraulick\u00e9ho oleje pod tlakem', effect: 'Injekce oleje pod k\u016f\u017ei \u2014 amputace' },
        l34: { element: 'Demont\u00e1\u017e / srotov\u00e1n\u00ed stroje', threat: 'P\u00e1d t\u011b\u017ek\u00fdch d\u00edl\u016f p\u0159i demontov\u00e1n\u00ed', effect: 'Rozm\u00e1\u010cknut\u00ed, smrt' },`,
};

// For each language, find the l13 entry and insert after it
const langMarkers = {
  pl: { before: "l13: { element: 'Gor\u0105ce wi\u00f3ry / ch\u0142odziwo'", lang: 'pl' },
  en: { before: "l13: { element: 'Hot chips / coolant'", lang: 'en' },
  de: { before: "l13: { element: 'Hei\u00dfe Sp\u00e4ne / K\u00fchlmittel'", lang: 'de' },
  fr: { before: "l13: { element: 'Copeaux chauds / liquide de refroidissement'", lang: 'fr' },
  it: { before: "l13: { element: 'Trucioli caldi / liquido refrigerante'", lang: 'it' },
  es: { before: "l13: { element: 'Virutas calientes / refrigerante'", lang: 'es' },
  cs: { before: "l13: { element: 'Hork\u00e9 t\u0159\u00edsky / chladicen\u00e1 kapalina'", lang: 'cs' },
};

let insertCount = 0;
for (const [lang, marker] of Object.entries(langMarkers)) {
  const idx = c.indexOf(marker.before);
  if (idx === -1) {
    console.log(`WARNING: ${lang} l13 not found, searching by id...`);
    // find all l13 occurrences
    let searchIdx = 0;
    while (true) {
      const found = c.indexOf("l13: {", searchIdx);
      if (found === -1) break;
      console.log(`  l13 at ${found}: ${c.slice(found, found+60)}`);
      searchIdx = found + 1;
    }
    continue;
  }
  // Find end of l13 entry
  const endIdx = c.indexOf('},', idx) + 2;
  c = c.slice(0, endIdx) + translations[lang] + c.slice(endIdx);
  insertCount++;
  console.log(`Added ${lang} translations at position ${idx}`);
}

fs.writeFileSync('C:/Projects/riskpro/frontend/src/i18n/machinesI18n.ts', c, 'utf8');
console.log(`\nDone! Inserted ${insertCount} language blocks`);
console.log('l14 en present:', c.includes("l14: { element: 'Machine transport"));
console.log('l34 pl present:', c.includes("l34: { element: 'Demonta"));