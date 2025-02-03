// Hole die Elemente aus dem HTML
// * Rechnungsbetrag
const betrag = document.querySelector('#betrag') as HTMLInputElement;
// * Gäste pro Rechnung
const guestCount = document.querySelector('#count') as HTMLInputElement;
// const customSelect = document.querySelector('.custom-select');
// * Select-Element "Service"
const selectedDiv = document.querySelector('.select') as HTMLSelectElement;
// * Liste der Auswahlmöglichkeiten der Servicequalität
const optionsList = document.querySelectorAll('ul li');

// * Checkbox für "Wie fanden Sie den Service"
const checkbox = document.querySelector(".check_service") as HTMLInputElement;
// * Label für  "Wie fanden Sie den Service"
const label = document.querySelector(".service_label") as HTMLLabelElement;
// * Button "Berechnen" im Formular
const calculateButton = document.querySelector('.btn_calculate') as HTMLButtonElement;
// * Gesamter Bereich der Ausgabe
const priceOutputOverlay = document.querySelector(".price_output_overlay") as HTMLDivElement;
// * Schliessen-Button im Ausgabefeld
const btnClose = document.querySelector(".close") as HTMLButtonElement;

//* Füge Event-Listener für die Klicks auf die <li>-Elemente hinzu
optionsList.forEach(option => {
    option.addEventListener('click', () => {
        //* Ändere den Text im ausgewählten Bereich
        selectedDiv.textContent = option.textContent;

        //* Hole das ausgewählte <li>-Wert
        const selectedValue = option.textContent;

        //* Ausgabe des ausgewählten Wertes in der Konsole
        if (selectedValue != null) {
            console.log(selectedValue);
            let percent: number = 0;
            if (selectedValue == "Super") {
                percent = 20;
            } else
                if (selectedValue == "Mittel") {
                    percent = 10;
                } else {
                    percent = 2;
                }
            // ShowPrice(percent);
            // * Betrag aus dem Inputfeld in eine Kommazahl umwandeln
            const betragValue = betrag.value;
            const betragNum = parseFloat(betragValue);
            console.log("Rechnungsbetrag: " + betragNum);

            // * Anzahl der Gäste aus dem Inputfeld in Integer umwandeln
            const count = guestCount.value;
            const CountForPrice = parseInt(count);
            console.log(`Anzahl der Gäste/Rechnung (${count}): ${CountForPrice}`);

            // * Trinkgeld berechnen
            const trinkgeldContent: number = (betragNum / 100) * percent;
            const trinkgeld: number = trinkgeldContent;
            console.log("Trinkgeld-Satz: " + trinkgeld);

            // * Rechnungsbetrag berechnen
            const fullPrice = betragNum + trinkgeld;
            console.log("Rechnungsbetrag + Trinkgeld: " + fullPrice);

            // * Preis pro Person berechnen
            const pricePerPerson = fullPrice / CountForPrice;
            console.log(pricePerPerson.toFixed(2));
            console.log("Rechnungsbetrag pro Person: " + pricePerPerson.toFixed(2));

            calculateButton.addEventListener('click', () => {
                // * Elemente aus dem HTML für das Output-Fenster holen
                const extraMoney = document.querySelector(".extra_money p") as HTMLDivElement;
                const fullMoney = document.querySelector(".full_money p") as HTMLDivElement;
                const pricePerson = document.querySelector(".price_per_person p") as HTMLDivElement;

                const dateText = document.querySelector(".date_time p") as HTMLDivElement;

                const nowDate = new Date();
                const hour = nowDate.getHours();
                const minute = nowDate.getMinutes();
                const second = nowDate.getSeconds();

                let hours = hour.toLocaleString();
                let minutes = minute.toLocaleString();
                let seconds = second.toLocaleString();

                if (hours.length < 2) {
                    hours = "0" + hours;
                }
                if (minutes.length < 2) {
                    minutes = "0" + minutes;
                }
                if (seconds.length < 2) {
                    seconds = "0" + seconds;
                }

                dateText.innerHTML = `<span><strong>Uhrzeit:</strong></span> ${hours}:${minutes}:${seconds}`;

                // * Ausgabe-Fenster aktivieren
                priceOutputOverlay.classList.remove("hide");

                extraMoney.innerHTML = `${trinkgeld.toFixed(2)} €`;
                fullMoney.innerHTML = `${fullPrice.toFixed(2)} €`;
                pricePerson.innerHTML = `${pricePerPerson.toFixed(2)} €`;
            });
        }
        checkbox.checked = false;
    });
});

function closeOutput() {
    priceOutputOverlay.classList.add("hide");
    window.location.reload();
}

// * Farbe der Überschrift "Wie fanden Sie den Service" ändern

checkbox.addEventListener("change", () => {
    if (label) {
        if (checkbox.checked) {
            label.style.color = "#ffffff"
        } else {
            label.style.color = "#1fc9cf"
        }
    } else console.error("Error");

});

btnClose.onclick = closeOutput;
