const EventDetailsModal = ({ title, startDateTime, description }) => {
  // todo format event duration. e.g: Monday, September 11⋅10:30 – 11:30am
  // todo codesplit description html elements, create constants

  document.querySelector("#event-details-modal").innerHTML = "";
  appendElements(
    [
      createElement2(
        `
        <div>
            <button onclick='document.querySelector("#event-details-modal").open = false;'>X</button>
            <div>
                <h3>${title}</h3>
                <span>${startDateTime}</span>
            </div>
            ${
              description
                ? `
            <div>
                <h6>About</h6>
                <span>${description}</span>
            </div>
            `
                : ""
            }
        </div>
    `
      ),
    ],
    document.querySelector("#event-details-modal")
  );
};
