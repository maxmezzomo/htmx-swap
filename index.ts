Bun.serve({
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/")
      return new Response(getPage(), {
        headers: { "content-type": "text/html" },
      });
    if (url.pathname === "/blog") return new Response("Blog!");
    return new Response("404!");
  },
  port: 3001,
});

let oob_value = 0;

const getPage = () => `
   <html>
   <head>
       <script src="https://unpkg.com/htmx.org@2.0.3"></script>
       <meta name="htmx-config" content='{"useTemplateFragments":true}'>
   </head>

    <style>

        body{
            padding:72px;
        }

        #content{
            display:flex;
            flex-direction:column;
        }
        body tr{
            border:1px solid #333;
            display:flex;
            justify-content:center;
            font-family:monospace;
            margin:8px;
            align-items:center;
            padding:16px;
            gap:8px;
        }
    </style>
    
    <body>
        <table id="content"> 
            <thead>
            <tr id="header" hx-swap-oob="true">
                <th>
                     I swap OOB ${oob_value++}
                </th>
            </tr>
            <tr>
            <td>
                <h2> an input </h2>
                <input value="type here yea"></input>
            </td>
            </tr>
            </thead>
            <tbody>
                <tr id="main"> 
                    <td>
                        <h2>main content</h2>
                        <pre> a random number ${(
                          Math.random() * 100
                        ).toFixed()} </pre>
                        <button
                         hx-get="/" 
                         hx-select="#content" 
                         hx-target="#content"
                         hx-swap="outerHTML"
                         > 
                            new number 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>
`;
