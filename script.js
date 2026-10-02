const STATUS_URL =
    "https://status.elkiokolice.pl/status";

const CHECK_INTERVAL = 10000;

const mapLink =
    document.getElementById("map-link");

const mapStatus =
    document.getElementById("map-status");

async function checkMapStatus() {

    try {

        const response = await fetch(
            STATUS_URL,
            {
                method: "GET",
                cache: "no-store"
            }
        );

        if (!response.ok) {

            throw new Error(
                "Serwer nie odpowiada"
            );

        }

        const data =
            await response.json();

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

        } else {

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

checkMapStatus();

setInterval(
    checkMapStatus,
    CHECK_INTERVAL
);