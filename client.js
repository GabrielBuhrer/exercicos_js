const axios = require("axios");

async function get_token(){
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }

    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "gabrielpb1" }, config)
        .then((response) => response.data.accessToken);
}


async function get_exercises(token){
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config2)
        .then((response) => response)
}


async function get_exercises(token){
    const config2 = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config2)
        .then((response) => response)
}

async function submit_solution(token, exerciseSlug, answer) {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

  

    return axios
        .post(`https://tecweb-js.insper-comp.com.br/exercicio/${exerciseSlug}`,  { "resposta": answer }, config)
        .then((response) => {
            console.log(`Resposta para o exercício ${exerciseSlug}: ${response.data.sucesso ? 'Correta' : 'Incorreta'}`);
            return response.data.success;
        })
        .catch((error) => {
            console.error("Erro ao enviar resposta:", error.message);
            return false;
        });
}

async function solve_and_submit_exercises(token, exercises) {
    for (const exerciseSlug in exercises) {
        const exercise = exercises[exerciseSlug];
  
        console.log(`Exercício: ${exerciseSlug}`);
        console.log("Valores de entrada:", exercise.entrada);
        let answer = null;
  
        if(exercise.titulo === "Soma valores"){
          answer = exercise.entrada.a + exercise.entrada.b; 
  
        }
        else if(exercise.titulo === "Tamanho da string"){
          answer = exercise.entrada.string.length; 
        }
        else if(exercise.titulo === "Nome do usuário"){
          entrada = exercise.entrada.email;
          answer = entrada.substring(0, entrada.indexOf('@')); 
        }
        else if(exercise.titulo === "Jaca Wars!"){
          g = 9.8;
          v = exercise.entrada.v;
          theta = exercise.entrada.theta;
          d = v**2 * Math.sin((Math.PI / 180) * theta *2) / g;
          dist = d - 100
          if (dist >=-2 && dist <=2){  
            answer = 0
          }
          else if(dist>2){
            answer = 1
          }
          else{
            answer = -1
          }
  
         
        }
        else if (exercise.titulo === "Ano bissexto"){
          ano = exercise.entrada.ano;
          if (ano % 4 === 0 && ano % 100 !== 0 || ano % 400 === 0){
            answer = true
          }
          else{
            answer = false
          }
        }
        else if (exercise.titulo === "Volume da PIZZA!"){
          z = exercise.entrada.z;
          a = exercise.entrada.a;
          area_base = Math.PI * z**2;
          volume = area_base * a;
          answer = Math.round(volume);
  
        }
        else if (exercise.titulo === "Movimento retilíneo uniforme"){
          s0 = exercise.entrada.s0;
          v = exercise.entrada.v;
          t = exercise.entrada.t;
          answer = s0 + v*t;
        }
        else if (exercise.titulo === "Inverta a string"){
          entrada = exercise.entrada.string;
          answer = entrada.split("").reverse().join("");
  
        }
        else if (exercise.titulo === "Soma os valores guardados no objeto"){
          entrada = exercise.entrada.objeto;
          for (let i in entrada){
            answer += entrada[i];
          }
        }
        else if (exercise.titulo === "Encontra o n-ésimo número primo"){
          n = exercise.entrada.n;
          let count = 0;
          let num = 2;
          while (count < n){
            let prime = true;
            for (let i = 2; i <= Math.sqrt(num); i++){
              if (num % i === 0){
                prime = false;
                break;
              }
            }
            if (prime){
              count++;
            }
            num++;
          }
          answer = num - 1;
        }
        else if (exercise.titulo === "Maior prefixo comum"){
        let resp_parc = "";
        let lista_entrada = exercise.entrada.strings; // Declare lista_entrada with let
        let resposta = "";
            if (lista_entrada.length %2 ===0){
                for (let i = 0; i < lista_entrada.length; i = i + 2){
                    let palavra = lista_entrada[i]; // Declare palavra with let
                    let palavra2 = lista_entrada[i + 1]; // Declare palavra2 with let
                    for(let j = 0; j < palavra.length; j++){
                        if(palavra[j] !== palavra2[j]){
                            break;
                        }
                        resp_parc += palavra[j];
                    }
                    if (resp_parc.length > resposta.length){
                        resposta = resp_parc;
                    }

                    resp_parc = "";
                }
                answer = resposta;

            }
            else{
                for (let i = 0; i < lista_entrada.length - 1; i = i + 2){
                    let palavra = lista_entrada[i];
                    let palavra2 = lista_entrada[i + 1]; 
                    for(let j = 0; j < palavra.length; j++){
                        if(palavra[j] !== palavra2[j]){
                            break;
                        }
                        resp_parc += palavra[j];
                    }
                    if (resp_parc.length > resposta.length){
                        resposta = resp_parc;
                    }

                    resp_parc = "";
                }
                answer = resposta;

            }
        
        }
        else if (exercise.titulo === "Soma do segundo maior e menor números"){
            let lista_entrada = exercise.entrada.numeros;
            let maior = -Infinity;
            let segundo_maior = -Infinity;
            let menor = Infinity;
            let segundo_menor = Infinity;
            for (let i = 0; i < lista_entrada.length; i++){
                if (lista_entrada[i] > maior){
                    segundo_maior = maior;
                    maior = lista_entrada[i];
                }
                else if (lista_entrada[i] > segundo_maior){
                    segundo_maior = lista_entrada[i];
                }
                if (lista_entrada[i] < menor){
                    segundo_menor = menor;
                    menor = lista_entrada[i];
                }
                else if (lista_entrada[i] < segundo_menor){
                    segundo_menor = lista_entrada[i];
                }
            }
            answer = segundo_maior + segundo_menor;
          }
          else if (exercise.titulo === "Conta palíndromos"){
            let lista_entrada = exercise.entrada.palavras;
            let count = 0;
            for (let i = 0; i < lista_entrada.length; i++){
                let palavra = lista_entrada[i];
                if (palavra === palavra.split("").reverse().join("")){
                    count++;
                }
            }
            answer = count;
          }
          else if (exercise.titulo === "Soma de strings de ints"){
            let lista_entrada = exercise.entrada.strings;
            let soma = 0;
            for (let i = 0; i < lista_entrada.length; i++){
                soma += parseInt(lista_entrada[i]);
            }
            answer = soma.toString();
      
          }
        else if (exercise.titulo === "Soma com requisições"){
            const sum = await sumEndpoints(token, exercise.entrada.endpoints);
            answer = sum.toString();
        }
        else if (exercise.titulo === "Caça ao tesouro") {
            answer = await findTreasure(token, exercise.entrada.inicio)
        }
       
        console.log("Resposta calculada:", answer);
        await submit_solution(token, exerciseSlug, answer);
    }
  }

async function sumEndpoints(token, endpoints) {
    const config = {
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
        }
    };

    let sum = 0;
    

    for (const endpoint of endpoints) {
        const response = await axios.get(endpoint, config);
        const value = response.data;
        // console.log(value);
        // console.log(response);
        sum += value;
    }

    return sum;
    }

async function findTreasure(token, endpoint){
    const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    
    let currentEndpoint = endpoint
    while (currentEndpoint !== null) {
        const response = await axios.get(currentEndpoint, config);
        currentEndpoint = response.data;
        if (typeof currentEndpoint === "number"){
            return currentEndpoint
        } 
    }
}

async function main(){
    try {
        let token = await get_token();
        let exercises = await get_exercises(token);
        if (exercises && exercises.data) {
            console.log("Exercícios recebidos:");
            console.log(exercises.data);

            await solve_and_submit_exercises(token, exercises.data);
        } else {
            console.error("Não foi possível obter a lista de exercícios.");
        }
    } catch (error) {
        console.error("Erro:", error.message);
    }
}

main();