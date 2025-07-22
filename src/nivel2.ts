import { logTempoExecucao } from "./decorators"; 

class Carro {
    constructor(
        public marca: string,
        public modelo: string,
        public ano: number
    ) {}

    @logTempoExecucao
    obterDetalhes(): string {
        return `${this.marca} ${this.modelo} (${this.ano})`;
    }
}

const carro = new Carro("Toyota", "Corolla", 2022);
console.log(carro.obterDetalhes());

// 2.2 Herança
class CarroEletrico extends Carro {
    constructor(
        marca: string,
        modelo: string,
        ano: number,
        public autonomiaBateria: number
    ) {
        super(marca, modelo, ano);
    }
    
    @logTempoExecucao
    obterDetalhes(): string {
        return `${super.obterDetalhes()} - Autonomia: ${this.autonomiaBateria}km`;
    }
}

const eletrico = new CarroEletrico("Tesla", "Model 3", 2023, 400);
console.log(eletrico.obterDetalhes());

