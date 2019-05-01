﻿import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, Route, matchPath } from 'react-router-dom' // 服务器端渲染路由
import { matchRoutes } from 'react-router-config' // 能匹配子路由, matchPath 只匹配父级路由
import { Provider } from 'react-redux'
import routes from '../Routes'
import getStore from '../store'

export const render = (req) => {
  const store = getStore()
  const matchedRoutes = matchRoutes(routes, req.path)
  // routes.some(route => {
  //   const match = matchPath(req.path, route)
  //   if (match) {
  //     matchedRoutes.push(route)
  //   }
  // })
  const content = renderToString((
    // context 数据通信
    // location 路径
    <Provider store={store}>
      <StaticRouter context={{}} location={req.path}>
        <div>
          {
            routes.map(route => (
              <Route {...route} />
            ))
          }
        </div>
      </StaticRouter>
    </Provider>
  ))
  return `
    <html>
      <head>
        <title>ssr</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src='/index.js'></script>
      </body>
    </html>
    `
}
