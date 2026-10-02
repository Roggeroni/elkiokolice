/*
==========================================
ADRES SERWERA STATUSU
==========================================
*/

const STATUS_URL =
    "https://status.elkiokolice.pl/status";


/*
==========================================
CZĘSTOTLIWOŚĆ SPRAWDZANIA
==========================================

10000 = 10 sekund
*/

const CHECK_INTERVAL = 10000;


/*
==========================================
ELEMENTY
==========================================
*/

const mapLink =
    document.getElementById("map-link");

const mapStatus =
    document.getElementById("map-status");


/*
==========================================
SPRAWDZANIE STATUSU
==========================================
*/

async function checkMapStatus() {

    try {

        const response = await fetch(
            STATUS_URL,
            {
                method: "GET",

                cache: "no-store"
            }
        );


        /*
        ----------------------------------
        SERWER NIE ODPOWIADA
        ----------------------------------
        */

        if (!response.ok) {

            throw new Error(
                "Serwer nie odpowiada"
            );

        }


        const data =
            await response.json();


        /*
        ==================================
        PYTHON DZIAŁA
        ==================================
        */

        if (data.online === true) {

            mapStatus.textContent =
                "DOSTĘPNE";


            mapStatus.classList.remove(
                "offline"
            );


            mapStatus.classList.add(
                "online"
            );


            mapLink.classList.remove(
                "unavailable"
            );


            mapLink.href =
                data.map_url || "#";

        }


        /*
        ==================================
        PYTHON NIE DZIAŁA
        ==================================
        */

        else {

            mapStatus.textContent =
                "NIEDOSTĘPNE";


            mapStatus.classList.remove(
                "online"
            );


            mapStatus.classList.add(
                "offline"
            );


            mapLink.classList.add(
                "unavailable"
            );


            mapLink.href = "#";

        }

    }


    /*
    ======================================
    BRAK POŁĄCZENIA
    ======================================
    */

    catch (error) {

        mapStatus.textContent =
            "NIEDOSTĘPNE";


        mapStatus.classList.remove(
            "online"
        );


        mapStatus.classList.add(
            "offline"
        );


        mapLink.classList.add(
            "unavailable"
        );


        mapLink.href = "#";

    }

}


/*
==========================================
BLOKADA KLIKNIĘCIA
==========================================
*/

mapLink.addEventListener(
    "click",
    function(event) {

        if (
            mapLink.classList.contains(
                "unavailable"
            )
        ) {

            event.preventDefault();

        }

    }
);


/*
==========================================
PIERWSZE SPRAWDZENIE
==========================================
*/

checkMapStatus();


/*
==========================================
SPRAWDZANIE CO 10 SEKUND
==========================================
*/

setInterval(
    checkMapStatus,
    CHECK_INTERVAL
);