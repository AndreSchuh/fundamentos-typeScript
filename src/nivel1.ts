// 1.1 Tipos Básicos
let nome: string = "André";
let idade: number = 30;
let ativo: boolean = true;
let hobbies: string[] = ["ler", "programar"];
let ponto: [number, number] = [10, 20];

// 1.2 Funções Tipadas
function calcularIMC(peso: number, altura: number): number {
    return peso / (altura * altura);
}

function classificarIMC(imc: number): string {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Normal";
    if (imc < 30) return "Sobrepeso";
    return "Obesidade";
}

// 1.3 Interfaces
interface Pessoa {
    nome: string;
    email?: string;
    idade: number;
}

const pessoa: Pessoa = {
    nome: "André",
    idade: 30,
    email: "andre@email.com"
};