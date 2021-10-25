const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
        ["Tupac", "DMX", "50 Cent"],       // Names
        ["https://i.imgur.com/lpIw4Xs.jpeg", // Images
            "https://townsquare.media/site/625/files/2010/11/dmx-200-111910.jpg",
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7CXzfwyhpFh8z867jAdA3AHaGE%26pid%3DApi&f=1"],
        [100, 200, 300],                    // HP values
        [100, 40, 50],                       // Attack damage values

        "Lil Pump", // Boss name
        "https://blacksportsonline.com/wp-content/uploads/2018/12/Screen-Shot-2018-12-17-at-8.24.52-PM.png", // Boss image
        10000, // Boss hp
        50 // Boss attack damage
    );

    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);


    let txn;

    //mint player character
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    //attack twice
    txn = await gameContract.attackBoss();
    await txn.wait();

    txn = await gameContract.attackBoss();
    await txn.wait();

    console.log("Done!");
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();