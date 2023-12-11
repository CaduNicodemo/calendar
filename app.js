    const events = [];

    // Generate the calendar
    function generateCalendar(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        let tableBody = "";
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            let row = "<tr>";
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay.getDay()) || dayCounter > daysInMonth) {
                    row += "<td></td>"; // Empty cell before the first day and after the last day
                } else {
                    row += `<td onclick="showEventForm(${year}, ${month + 1}, ${dayCounter})">${dayCounter}</td>`;
                    dayCounter++;
                }
            }
            row += "</tr>";
            tableBody += row;
        }

        $("#calendar tbody").html(tableBody);
        updateEventDots();
    }

    // Show the event form for the selected day
    function showEventForm(year, month, day) {
        $("#eventForm").show();
        $("#eventDate").val(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
    }

    // Add event to the calendar
    function addEvent() {
        const eventName = $("#eventName").val();
        const eventDate = $("#eventDate").val();
        const eventColor = $("#eventColor").val();

        if (eventName && eventDate && eventColor) {
            const event = {
                name: eventName,
                date: eventDate,
                color: eventColor,
            };

            events.push(event);

            // You can handle the event data here, for now, let's just hide the form
            $("#eventForm").hide();
            // Extract year and month from the event date
            const year = new Date(eventDate).getFullYear();
            const month = new Date(eventDate).getMonth();

            generateCalendar(year, month);
            updateEventDots();
        } else {
            alert("Please enter event name, date, and color.");
        }
    }

    // Update the current month and year display
    function updateMonthYearDisplay(year, month) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        $("#currentMonthYear").text(`${monthNames[month]} ${year}`);
    }

    // Update the event dots on the calendar
    function updateEventDots() {
        // Remove existing event dots
        $(".event-dot").remove();

        events.forEach(event => {
            const eventDate = new Date(event.date);
            const dayCell = $(`#calendar tbody td:contains("${eventDate.getDate()}")`);
            const eventDot = $("<div class='event-dot'></div>");
            eventDot.css({
                'background-color': event.color,
                'bottom': '5px',
                'right': '5px',
            });
            dayCell.append(eventDot);
        });
    }

    // Initialize the calendar for the current month
    const currentDate = new Date();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    updateMonthYearDisplay(currentDate.getFullYear(), currentDate.getMonth());
