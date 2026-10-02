const STATUS_URL =
    "https://status.elkiokolice.pl/status";


/*
==========================================
CO ILE SPRAWDZAĆ STATUS
==========================================

10000 = 10 sekund
*/

const CHECK_INTERVAL = 10000;


/*
==========================================
ELEMENTY STRONY
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
        ----------------------------------
        PYTHON DZIAŁA
        ----------------------------------
        */

        if (data.online === true) {

            // Usuwamy napis
            mapStatus.textContent = "";


            // Przycisk staje się aktywny
            mapLink.classList.remove(
                "unavailable"
            );


            // Ustawiamy adres mapy
            mapLink.href =
                data.map_url || "#";

        }


        /*
        ----------------------------------
        PYTHON ODPOWIADA,
        ALE MAPA NIEDOSTĘPNA
        ----------------------------------
        */

        else {

            mapStatus.textContent =
                "NIEDOSTĘPNE";


            mapLink.classList.add(
                "unavailable"
            );


            mapLink.href = "#";

        }

    }


    /*
    --------------------------------------
    PYTHON WYŁĄCZONY
    KOMPUTER WYŁĄCZONY
    TUNNEL NIE DZIAŁA
    --------------------------------------
    */

    catch (error) {

        mapStatus.textContent =
            "NIEDOSTĘPNE";


        mapLink.classList.add(
            "unavailable"
        );


        mapLink.href = "#";

    }

}


/*
==========================================
BLOKADA KLIKNIĘCIA OFFLINE
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