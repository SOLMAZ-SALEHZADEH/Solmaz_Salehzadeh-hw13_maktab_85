export const DEFAULT_PAGE_COUNT = 10;
export const API_URL = "https://60b77f8f17d1dc0017b8a2c4.mockapi.io";

export function showToast(message, color = "red") {
  let gradiantColor =
    "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))";
  if (color === "green") {
    gradiantColor = "linear-gradient(to right, #00b09b, #96c93d)";
  }
  Toastify({
    text: `${message}`,
    duration: 4000,
    destination: "#",
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
      background: gradiantColor,
    },
    onClick: function () {},
  }).showToast();
}

export function clearInputs() {
  document.querySelector("#Title").value = "";
  document.querySelector("#Description").value = "";
  document.querySelector("#DueDate").value = "";
}

export const gatherFormData = () => {
  const Title = document.getElementById("Title");
  const Description = document.getElementById("Description");
  const DueDate = document.getElementById("DueDate");
  if (Title.value !== "" && Description.value !== "" && DueDate !== "") {
    return {
      title: Title.value,
      description: Description.value,
      dueDate: DueDate.value,
    };
  }
  return undefined;
};


