<img width="1070" alt="GitHub Repo Cover" src="https://github.com/corbado/corbado-php/assets/18458907/aa4f9df6-980b-4b24-bb2f-d71c0f480971">

# Next.js Passkeys Example Application using TypeScript

This is a sample implementation of the [Corbado passkeys-first authentication solution](https://www.corbado.com) using
Next.js with TypeScript. The following packages are being used:

- [Corbado React.js](https://github.com/corbado/javascript/tree/develop/packages/react)
- [Corbado Node.js](https://github.com/corbado/corbado-nodejs)

[![integration-guides](https://github.com/user-attachments/assets/7859201b-a345-4b68-b336-6e2edcc6577b)](https://app.corbado.com/integration-guides/nextjs)

## File structure

- `app/auth/page.tsx`: the file where the React Auth component is used
- `app/profile/page.tsx`: displays user information if the user has successfully authenticated (rendered on the server)
- `app/user-data/route.ts`: api route that checks the users authentication state using the Corbado Node SDK
- `app/page.tsx`: client rendered page that accesses data from the above mentioned route
- `.env.local`: add relevant environment variables that you can obtain
  from [Corbado developer panel](https://app.corbado.com/)

## Setup

### Prerequisites

Please follow the steps in [Getting started](https://docs.corbado.com/overview/getting-started) to create and configure
a project in the [Corbado developer panel](https://app.corbado.com/).

You need to have [Node](https://nodejs.org/en/download) and `npm` installed to run it.

### Configure environment variables

Use the values you obtained in [Prerequisites](#prerequisites) to configure the following variables inside a `.env`
file you create in the root folder of this project:

```sh
NEXT_PUBLIC_CORBADO_PROJECT_ID=pro-XXX
CORBADO_API_SECRET=corbado1_XXX
CORBADO_FRONTEND_API=https://${CORBADO_PROJECT_ID}.frontendapi.cloud.corbado.io
CORBADO_BACKEND_API=https://backendapi.cloud.corbado.io
```

## Usage

Run

```bash
npm i
```

to install all dependencies.

Finally, you can run the project locally with

```bash
npm run dev
```

## Passkeys support

- Community for Developer Support: https://bit.ly/passkeys-community
- Passkeys Debugger: https://www.passkeys-debugger.io/ 
- Passkey Subreddit: https://www.reddit.com/r/passkey/
