const url = "https://localhost:5001/api/beanvariety/";
const api = "https://localhost:5001/api";
const button = document.querySelector("#run-button");
const mainCon = document.querySelector("#main");
const createBean = document.querySelector("#create-bean");
const createCoffee = document.querySelector("#create-coffee");
const deleteCoffee = document.querySelector("#delete-coffee");
const editCoffee = document.querySelector("#edit-coffee");
const coffeeDeleteId = document.querySelector("#coffeeId");
const coffeeEditId = document.querySelector("#coffeeId-edit");

button.addEventListener("click", () => {
    getAllBeanVarieties().then((beanVarieties) => {
        getAllCoffees().then((coffees) => {
            console.log(coffees);
            console.log(beanVarieties);
            mainCon.innerHTML += ``;
            for (const b of beanVarieties) {
                mainCon.innerHTML += `<p>Bean Variety ${b.id}: ${b.name} (${b.region}) [${b.notes}]</p>`;
            }
            for (const c of coffees) {
                mainCon.innerHTML += `<p>Coffee ${c.id}: ${c.title} (${c.beanVariety.name})</p>`;
            }
        });
    });
});

createBean.addEventListener("click", () => {
    const bean = {
        name: document.querySelector("#beanName").value,
        region: document.querySelector("#beanRegion").value,
        notes: document.querySelector("#beanNotes").value,
    };
    postBean(bean);
});
createCoffee.addEventListener("click", () => {
    const coffee = {
        title: document.querySelector("#coffeeTitle").value,
        beanVarietyId: document.querySelector("#coffeeBeanVarietyId").value,
    };
    postCoffee(coffee);
});
deleteCoffee.addEventListener("click", () => {
    let coffeeId = coffeeDeleteId.value;
    deletePost(coffeeId);
});
editCoffee.addEventListener("click", () => {
    let coffee = {
        id: document.querySelector("#coffeeId-edit").value,
        title: document.querySelector("#coffeeTitle-edit").value,
        beanVarietyId: document.querySelector("#coffeeBeanVarietyId-edit").value,
    }
    editPost(coffee);
});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
};

function getAllCoffees() {
    return fetch(`${api}/coffee`).then(resp => resp.json());
};

const postBean = (bean) => {
    return fetch(`${api}/beanvariety/`, postOptions(bean));
};

const postCoffee = (coffee) => {
    return fetch(`${api}/coffee/`, postOptions(coffee));
};
const deleteCoffeePost = (coffee) => {
    return fetch(`${api}/coffee/`, deletePost(coffee));
};

const postOptions = (object) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
    };
};
const editPost = (postObj) => {
    console.log(postObj);
    return fetch(`${api}/coffee/${postObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    });
  };
  
const deletePost = postId => {
    console.log(postId)
      return fetch(`${api}/coffee/${postId}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          }
      })  
    }