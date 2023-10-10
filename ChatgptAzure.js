const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const readline = require("readline");

const endpoint = 'https://botmikaleta.openai.azure.com/';
const azureApiKey = '5a9b2b2978464d988f053019ab40fdf0';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function ChatGPTAzure() {
  console.log("== Chat Completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "Mikaleta";

  // Espera a que el usuario introduzca el texto
  rl.question("Escribe tu mensaje: ", async (userMessage) => {
    const messages = [
      { role: "system", content: "Buenas en que puedo ayudarte" },
      { role: "user", content: userMessage },
    ];

    const result = await client.getChatCompletions(deploymentId, messages);

    for (const choice of result.choices) {
      console.log(choice.message);
    }

    // Cierra la interfaz de lectura de la consola
    rl.close();
  });
}

ChatGPTAzure().catch((err) => {
  console.error("The sample encountered an error:", err);
});
