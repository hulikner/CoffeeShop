const url = "https://localhost:5001/api/beanvariety/";
const api = "https://localhost:5001/api";
const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beanVarieties => {
            console.log(beanVarieties);
        })
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}
function getAllCoffees() {
    return fetch(`{api}/coffee`).then(resp => resp.json());
}