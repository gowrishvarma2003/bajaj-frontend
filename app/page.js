'use client';
import { useState } from 'react';

export default function Home() {
  const [postData, setPostData] = useState('{"data": ["M", "1", "334", "4", "B"]}');
  const [postResponse, setPostResponse] = useState(null);
  const [getResponse, setGetResponse] = useState(null);
  const [error, setError] = useState(null);

  const handlePostChange = (e) => {
    setPostData(e.target.value);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const parsedData = JSON.parse(postData);

      const response = await fetch('https://bajaj-server-production.up.railway.app/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const result = await response.json();
      setPostResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request.');
    }
  };

  const handleGetRequest = async () => {
    setError(null);
    try {
      const response = await fetch('https://bajaj-server-production.up.railway.app/api/operation_code');
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const result = await response.json();
      setGetResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">API Interaction</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">POST Request</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter JSON data in the format: <code>{"{ \"data\": [\"M\", \"1\", \"334\", \"4\", \"B\"] }"}</code>
          </p>
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handlePostChange}
              placeholder='Enter JSON data (e.g., {"data": ["M", "1", "334", "4", "B"]})'
              rows={5}
              cols={50}
            />
            <br />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send POST Request
            </button>
          </form>

          {error && (
            <div className="mt-4 text-red-600">
              <h3 className="font-semibold">Error:</h3>
              <pre>{error}</pre>
            </div>
          )}

          {postResponse && (
            <div className="mt-4">
              <h3 className="font-semibold">POST Response:</h3>
              <pre className="bg-gray-100 p-2 rounded-lg">{JSON.stringify(postResponse, null, 2)}</pre>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">GET Request</h2>
          <button
            onClick={handleGetRequest}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send GET Request
          </button>

          {getResponse && (
            <div className="mt-4">
              <h3 className="font-semibold">GET Response:</h3>
              <pre className="bg-gray-100 p-2 rounded-lg">{JSON.stringify(getResponse, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
