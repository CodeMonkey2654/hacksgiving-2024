/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ExhibitExhibitIdImport } from './routes/exhibit.$exhibitId'

// Create Virtual Routes

const ExhibitsLazyImport = createFileRoute('/exhibits')()
const ConfigureLazyImport = createFileRoute('/configure')()
const AdminLazyImport = createFileRoute('/admin')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const ExhibitsLazyRoute = ExhibitsLazyImport.update({
  id: '/exhibits',
  path: '/exhibits',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/exhibits.lazy').then((d) => d.Route))

const ConfigureLazyRoute = ConfigureLazyImport.update({
  id: '/configure',
  path: '/configure',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/configure.lazy').then((d) => d.Route))

const AdminLazyRoute = AdminLazyImport.update({
  id: '/admin',
  path: '/admin',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/admin.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ExhibitExhibitIdRoute = ExhibitExhibitIdImport.update({
  id: '/exhibit/$exhibitId',
  path: '/exhibit/$exhibitId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/admin': {
      id: '/admin'
      path: '/admin'
      fullPath: '/admin'
      preLoaderRoute: typeof AdminLazyImport
      parentRoute: typeof rootRoute
    }
    '/configure': {
      id: '/configure'
      path: '/configure'
      fullPath: '/configure'
      preLoaderRoute: typeof ConfigureLazyImport
      parentRoute: typeof rootRoute
    }
    '/exhibits': {
      id: '/exhibits'
      path: '/exhibits'
      fullPath: '/exhibits'
      preLoaderRoute: typeof ExhibitsLazyImport
      parentRoute: typeof rootRoute
    }
    '/exhibit/$exhibitId': {
      id: '/exhibit/$exhibitId'
      path: '/exhibit/$exhibitId'
      fullPath: '/exhibit/$exhibitId'
      preLoaderRoute: typeof ExhibitExhibitIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminLazyRoute
  '/configure': typeof ConfigureLazyRoute
  '/exhibits': typeof ExhibitsLazyRoute
  '/exhibit/$exhibitId': typeof ExhibitExhibitIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminLazyRoute
  '/configure': typeof ConfigureLazyRoute
  '/exhibits': typeof ExhibitsLazyRoute
  '/exhibit/$exhibitId': typeof ExhibitExhibitIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/admin': typeof AdminLazyRoute
  '/configure': typeof ConfigureLazyRoute
  '/exhibits': typeof ExhibitsLazyRoute
  '/exhibit/$exhibitId': typeof ExhibitExhibitIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/admin' | '/configure' | '/exhibits' | '/exhibit/$exhibitId'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/admin' | '/configure' | '/exhibits' | '/exhibit/$exhibitId'
  id:
    | '__root__'
    | '/'
    | '/admin'
    | '/configure'
    | '/exhibits'
    | '/exhibit/$exhibitId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AdminLazyRoute: typeof AdminLazyRoute
  ConfigureLazyRoute: typeof ConfigureLazyRoute
  ExhibitsLazyRoute: typeof ExhibitsLazyRoute
  ExhibitExhibitIdRoute: typeof ExhibitExhibitIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AdminLazyRoute: AdminLazyRoute,
  ConfigureLazyRoute: ConfigureLazyRoute,
  ExhibitsLazyRoute: ExhibitsLazyRoute,
  ExhibitExhibitIdRoute: ExhibitExhibitIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/admin",
        "/configure",
        "/exhibits",
        "/exhibit/$exhibitId"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/admin": {
      "filePath": "admin.lazy.tsx"
    },
    "/configure": {
      "filePath": "configure.lazy.tsx"
    },
    "/exhibits": {
      "filePath": "exhibits.lazy.tsx"
    },
    "/exhibit/$exhibitId": {
      "filePath": "exhibit.$exhibitId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
