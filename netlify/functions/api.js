const API_URL = 'https://sim.so/api/workflows/6d850a2e-3689-4a43-bcbe-b619919b1737/execute';
const API_KEY = 'sk-sim-EpG5AIRbA2pvBn8YfwlwZrHps9FJZPdX';
exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }
  console.log('Request body:', event.body);
  try {
    console.log('Calling Sim API...');
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: event.body
    });
    console.log('Response status:', response.status);
    const text = await response.text();
    console.log('Response text:', text.substring(0, 500));
    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.log('JSON parse error:', parseError.message);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Invalid response from API',
          details: text.substring(0, 200)
        })
  
