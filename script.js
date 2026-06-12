let name = "";
let spin = document.getElementById("spin");
let item = document.getElementById("item");

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

spin.addEventListener("click", async function() {
    name = document.getElementById("name").value;
    if (name === "") {
        alert("Please enter your name!");
    }
    else {
        const result = spinning();
        await save(name, result);
    }
});

let items = ["Food", "Snacks", "Drinks"];
function spinning(){
  const rdn = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  let randomItem = rdn(1, 20);
  console.log(randomItem);
  let result = "";

  if (randomItem <= 10) { //food
    result = items[0];
  }
  else if (randomItem <= 15) { //snacks
    result = items[1];
  }
  else { //drinks
    result = items[2];
  }

  alert(`You will bring... ${result}!`);
  return result;
}

//saving
async function save(name, result) {
  await fetch("http://localhost:5000/spin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, result })
  });
}