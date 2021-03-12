const searchBtn = document.querySelector(".search");
let input = document.querySelector(".input");

searchBtn.addEventListener("click", () => {
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=cENQvJ74DRaUDEF1CjQtSA6fpsYFHG1l&q=${input.value}&limit=5`
  )
    .then((response) => response.json())
    .then((data) => {
      let images = data.data.map((img) => img.images.downsized_medium.url);
      let imgDiv = document.querySelector(".images");
      for (image of images) {
        imgDiv.innerHTML += `<img src="${image}" alt="result"/>`;
        console.log(image);
      }
    })
    .catch((error) => console.log(error));
});

const validate = (login, email, password) => {
  let loginFormat = /^[a-z0-9_-]{3,16}$/;
  let mailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  let passwordFormat = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;

  if (login.value.test(loginFormat)) {
    console.log("true");
  } else {
    alert(
      "Ваш логин должен содержать от 3 до 16 знаков: цифры, строчные буквы и символы!"
    );
    return false;
  }

  if (email.value.match(mailFormat)) {
    console.log("true");
  } else {
    alert("Ваш адрес электронной почты введен неверно!");
    return false;
  }

  if (password.value.match(passwordFormat)) {
    console.log("true");
  } else {
    alert(
      "Введите безовасный пароль из букв, цифры и символов разного регистра!"
    );
    return false;
  }
};

signupBtn.onclick = async (e) => {
  e.preventDefault();
  validate(
    document.querySelector("#userLogin"),
    document.querySelector("#userEmail"),
    document.querySelector("#password")
  );
  let user = {
    login: document.getElementById("userLogin").value,
    email: document.getElementById("userEmail").value,
    password: document.getElementById("password").value,
  };
  let response = await fetch("https://httpbin.org/post ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  let result = await response.json();
  console.log(result);
};

sendForm.onclick = async (e) => {
  e.preventDefault();

  await fetch("https://httpbin.org/post ", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};
