
const useSoundCom = () => {
    const payErrorSound =()=>{
        document.getElementById("payErrorSound")?.click()
    }
    const paySuceessSound =()=>{
        document.getElementById("paySuceessSound")?.click()
    }
    return [ payErrorSound, paySuceessSound ];
};

export default useSoundCom;