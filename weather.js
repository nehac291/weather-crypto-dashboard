import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "YOUR_API_KEY"
});


// crypto funcn
async function cryptoCurrency({ coin }) {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=inr`);

  const data = await response.json();
  console.log("Crypto Data:", data);

  return data;
}


// weather funcn
async function weatherInformation({ city }) {
  const API_KEY = "YOUR_WEATHER_API_KEY";

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

  const data = await response.json();
  console.log("Weather Data:", data);

  return data;
}


// tools 
const cryptoInfo = {
  name: "cryptoCurrency",
  description: "Get current price of a cryptocurrency",
  parameters: {
    type: Type.OBJECT,
    properties: {
      coin: {
        type: Type.STRING,
        description: "Name of the coin (e.g., bitcoin)"
      }
    }
  }
};

const weatherInfo = {
  name: "weatherInformation",
  description: "Get current weather information of a city",
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: "Name of the city"
      }
    }
  }
};


// agent function
async function runAgent() {

  const tools = [cryptoInfo, weatherInfo];

  let history = [
    {
      role: "user",
      parts: [
        {
          text: "Tell me weather of Delhi and bitcoin price"
        }
      ]
    }
  ];

  while (true) {

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: history,
      config: { tools }
    });

    if (result.functionCalls && result.functionCalls.length > 0) {

      const functionCall = result.functionCalls[0];
      const { name, args } = functionCall;

      let response;

      if (name === "cryptoCurrency") {
        response = await cryptoCurrency(args);
      }
      else if (name === "weatherInformation") {
        response = await weatherInformation(args);
      }

      history.push({
        role: "model",
        parts: [
          {
            functionCall: functionCall
          }
        ]
      });

      history.push({
        role: "user",
        parts: [
          {
            functionResponse: {
              name: name,
              response: response
            }
          }
        ]
      });

    } else {
      console.log(result.text);
      break;
    }
  }
}

runAgent();