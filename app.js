const { database, provider, createBot, createProvider, createFlow, addKeyword ,CoreClass, EVENTS, addAnswer } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const JsonFileAdapter = require('@bot-whatsapp/database/json');
const ChatGPTClass = require('./Chatgpt.class');
const fs = require('fs');
const readline = require('readline');
const ChatGPTAzure = require('./ChatgptAzure');
const {PROMP} = require ("./promp");

const createBotGPT = async ({ provider, database }) => {
    return new ChatGPTClass(database, provider, );
}

/************************************** AZURE ***************************************/
/*const endpoint = 'https://botmikaleta.openai.azure.com/';
const azureApiKey = '5a9b2b2978464d988f053019ab40fdf0';
const createBotGPTAzur = async function chatGPTazure(question) {
    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const deploymentId = "Mikaleta";
  
    const messages = [
        { role: "user", content: question },
    ];
  
    const result = await client.getChatCompletions(deploymentId, messages);
    const responseMessages = result.choices.map(choice => choice.message);
    return responseMessages;
}*/



//const chatGPTInstance = new ChatGPTClass(database, provider, 'prompts.txt');
/**************************************************************************************/

/*/**const createBotGPT = async ({ provider, database }) => {
    return new ChatGPTClass(database, provider);
}

const flowExit = addKeyword('salir').addAnswer('mensaje de fin');

const flowppal = addKeyword(EVENTS.WELCOME)
    .addAnswer('Mensaje de bienvenida (modificar)', null, async (ctx, { provider }) => {
        await typing(provider, ctx, 4000);
        await chatGPTInstance.handleMsgChatGPT(PROMPT);
    })
    .addAnswer('leye promp',
        { capture: true }, async (ctx, { flowDynamic, fallBack, gotoFlow, provider }) => {
            const response = await chatGPTInstance.handleMsgChatGPT(ctx.body);
            const message = response.text;
            await typing(provider, ctx, 4000);
            if (!/^salir$/i.test(ctx.body.toString())) {
                await fallBack(message);
            }
            if (/(^|\s)salir(\s|$)/i.test(ctx.body.toString())) {
                gotoFlow(flowExit);
            }
        });*/

/**************************************************************************************/

/*const ChatGPTClass = require("./Chatgpt.class");
const chatGPT = new ChatGPTClass();*/

const flowConfirmo = addKeyword("si confirmo") .addAnswer('continuo con...')

const flowprin = addKeyword('hola')
.addAnswer("buenas ",null, async()=>{
    await chatGPTInstance.handleMsgChatGPT(PROMP)
})
.addAnswer(
    "que terrenos quieres",
    {capture: true},
    async(ctx, {fallBack})=>{
    const response =await chatGPTInstance.handleMsgChatGPT(ctx.body);
    const message = response.tex;
    if(ctx.body.toStrip() !== "si confirmo"){
        await fallback(message)
    } 
    },[flowConfirmo]
)


const main = async () => {
    const adapterDB = new JsonFileAdapter();
    const adapterFlow = createFlow([flowprin]); // Add the new flow
    const adapterProvider = createProvider(BaileysProvider);
    createBotGPT({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
