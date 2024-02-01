// import fs from 'node:fs/promises'
// import express from 'express'

// // Constants
// const isProduction = process.env.NODE_ENV === 'production'
// const port = process.env.PORT || 5173
// const base = process.env.BASE || '/'

// // Cached production assets
// const templateHtml = isProduction
//   ? await fs.readFile('./dist/client/index.html', 'utf-8')
//   : ''
// const ssrManifest = isProduction
//   ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
//   : undefined

// // Create http server
// const app = express()

// // Add Vite or respective production middlewares
// let vite
// if (!isProduction) {
//   const { createServer } = await import('vite')
//   vite = await createServer({
//     server: { middlewareMode: true },
//     appType: 'custom',
//     base
//   })
//   app.use(vite.middlewares)
// } else {
//   const compression = (await import('compression')).default
//   const sirv = (await import('sirv')).default
//   app.use(compression())
//   app.use(base, sirv('./dist/client', { extensions: [] }))
// }

// // Serve HTML
// app.use('*', async (req, res) => {
//   try {
//     const url = req.originalUrl.replace(base, '')

//     let template
//     let render
//     if (!isProduction) {
//       // Always read fresh template in development
//       template = await fs.readFile('./index.html', 'utf-8')
//       template = await vite.transformIndexHtml(url, template)
//       render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
//     } else {
//       template = templateHtml
//       render = (await import('./dist/server/entry-server.js')).render
//     }

//     const rendered = await render(url, ssrManifest)

//     const html = template
//       .replace(`<!--app-head-->`, rendered.head ?? '')
//       .replace(`<!--app-html-->`, rendered.html ?? '')

//     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
//   } catch (e) {
//     vite?.ssrFixStacktrace(e)
//     console.log(e.stack)
//     res.status(500).end(e.stack)
//   }
// })

// // Start http server
// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`)
// })


/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import express from "express";
import { createServer as createViteServer } from "vite";

const isProduction = process.env.NODE_ENV === "production";
const Port = process.env.PORT || 3001;
const Base = process.env.BASE || "/";

const templateHtml = isProduction
    ? fs.readFileSync("./dist/client/index.html", "utf-8")
    : "";

const ssrManifest = isProduction
    ? await fs.readFile("./dist/client/ssr-manifest.json", "utf-8")
    : undefined;

const app = express();
let vite;

// ? Add vite or respective production middlewares
if (!isProduction) {
    vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "custom",
    });

    app.use(vite.middlewares);
} else {
    const sirv = (await import("sirv")).default;
    const compression = (await import("compression")).default;
    app.use(compression());
    app.use(Base, sirv("./dist/client", {
        extensions: [],
        gzip: true,
    }));
}

app.use("*", async (req, res, next) => {

    // ! Favicon Fix
    if (req.originalUrl === "/favicon.ico") {
        return res.sendFile(path.resolve("./public/vite.svg"));
    }


    // ! SSR Render - Do not Edit if you don't know what heare whats going on
    let template, render;

    try {
        if (!isProduction) {
            template = fs.readFileSync(path.resolve("./index.html"), "utf-8");
            template = await vite.transformIndexHtml(req.originalUrl, template);
            render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
        } else {
            template = templateHtml;
            render = (await import("./dist/server/entry-server.js")).render;
        }

        const rendered = await render({ path: req.originalUrl }, ssrManifest);
        const html = template.replace(`<!--app-html-->`, rendered ?? '');

        res.status(200).setHeader("Content-Type", "text/html").end(html);
    } catch (error) {
        vite.ssrFixStacktrace(error);
        next(error);
    }
});

// ? Start http server
app.listen(Port, () => {
    console.log(`Server running on http://localhost:${Port}`);
});