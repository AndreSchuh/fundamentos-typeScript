export function logTempoExecucao(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        console.log(`--- Iniciando execução de '${propertyKey}' ---`);
        const inicio = performance.now();

        const resultado = await metodoOriginal.apply(this, args);

        const fim = performance.now();
        console.log(`Tempo de execução de '${propertyKey}': ${(fim - inicio).toFixed(4)}ms`);
        console.log(`-------------------------------------------`);
        
        return resultado;
    };

    return descriptor;
}