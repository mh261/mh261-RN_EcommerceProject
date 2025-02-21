import { registerRootComponent } from 'expo';
import App from './Services/ExpressApp';
import DbCon from "./Services/Database"
import express from 'express'
import { PORT } from './config';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
const StartServer = async() => { 
    const app = express(); 
    await DbCon(); 
    await App(app); 

    app.listen(PORT, () => {
        console.log(`Connect on ${PORT}`)
    })
}

StartServer(); 