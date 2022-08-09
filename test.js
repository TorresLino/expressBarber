import axios from 'axios';

// Faz uma requisição a um usuarío com um ID expecifico
axios.get('http://localhost:8000/api/barber')
  .then(function (response) {
    // manipula o sucesso da requisição
    console.log(response);
  })
  .catch(function (error) {
    // manipula erros da requisição
    console.error(error);
  })
  .then(function () {
    // sempre será executado
  });