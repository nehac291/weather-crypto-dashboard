
# AI Agent - Weather & Crypto Integration
An AI-based agent built using JavaScript that fetches real-time weather and cryptocurrency data using function calling and external APIs.

#  What It Does
- Fetches live weather data for any city
- Retrieves real-time cryptocurrency prices
- Uses AI to decide which function to call based on user query

#  Features
- AI agent with function calling
- Integration with multiple APIs
- Real-time data handling
- Async/await based API calls
- Clean modular function structure

#  How It Works
1. User query is sent to the AI model  
2. The model determines which function to call  
3. Based on the function:
   - Weather API is called for city data  
   - Crypto API is called for coin price  
4. Response is returned and processed  

#  Tech Stack
- JavaScript  
- Gemini API (GoogleGenAI)  
- OpenWeather API  
- CoinGecko API  

# How to Run
1. Add your API keys:
   - Gemini API key  
   - Weather API key  

2. Run the file:
   node weather.js
