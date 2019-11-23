console.log("No mucho que hacer aqui");

export const printVariables = () => {
    console.log(`Api base: ${process.env.API_BASE}`);
    console.log('NODE_ENV: ', process.env.NODE_ENV);
    console.log('Production: ', process.env.production);
}
