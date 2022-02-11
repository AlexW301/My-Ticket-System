export default async function handler(req, res) {
    const graphql = JSON.stringify({
        query: "query {\r\n  boards(ids:2218864909) {\r\n    items {\r\n      id\r\n      name\r\n      column_values {\r\n        text\r\n      }\r\n    }\r\n  }\r\n}",
        variables: {}
      })
  
      const get = await fetch(`https://api.monday.com/v2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.MONDAY_KEY,
        },
        body: graphql,
      })
      const data = await get.json();
      console.log(data)
    res.status(200).json(data)
  }