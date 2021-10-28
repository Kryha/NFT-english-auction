# Veiling

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working on Veiling, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart-intro.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
- [JavaScript API Reference](https://erxue-5aaaa-aaaab-qaagq-cai.raw.ic0.app)

## Before you start

There are a few steps to perform in order to set up the project before running it. Let's take a look.

### Motoko dependencies

In order to be able to install Motoko dependencies you have to download Vessel package manager first. The steps are the following (assuming you are using Linux or MacOS):

1. Go to [Vessel releases](https://github.com/dfinity/vessel/releases) page and download the latest one for your OS
2. Open the terminal and `cd` inside the directory where the file has been dowloaded (e.g. Downloads)
3. Run the following commands:
```bash
# "vessel-linux64" if you are on Linux
mv vessel-macos vessel
mv vessel /usr/local/bin
chmod 774 /usr/local/bin/vessel
```
3. Close and re-open the terminal
4. Run `vessel --version`, it should output the Vessel version you are currently using
5. Congratulations! You managed to install Vessel!

### NPM dependencies

Make sure you have [yarn](https://yarnpkg.com/) installed on your system, open the terminal in the project root directory and run `yarn` command in order to install the node modules.

### Create an identity

To create and use a new identity, run the following:

```bash
dfx identity new admin
dfx identity use admin
```

## Running the project locally

Before deploying the canisters locally, you have to start the dfx server:

```bash
# Starts the local replica, running in the background
dfx start --background

# Sometimes you may also want to clean things up if stuff is not working properly
dfx start --background --clean
```

After you are done, you can stop the server with:
```bash
dfx stop
```

There is a single command that creates all the canisters, builds and deploys the code:

```bash
dfx deploy --no-wallet
```

After deploying you should call:

```bash
dfx canister call nft init
```

If you want to create the canisters or build without deploying you can use the following commands:

```bash
# creates all the canisters defined in dfx.json
dfx canister create --all

# builds the code for the canisters you created, without deploying
dfx build
```

Once the job completes, your application will be available at `http://localhost:8000?canisterId={asset_canister_id}`.

Additionally, if you are making frontend changes, you can start a development server with

```bash
npm start
```

or you can use

```bash
yarn start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 8000.

### Note on frontend environment variables

If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`NODE_ENV` to `production` if you are using Webpack
- use your own preferred method to replace `process.env.NODE_ENV` in the autogenerated declarations
- Write your own `createActor` constructor

## Testing the backend

In order to run the tests, you must have at least 2 actors and run:

```bash
# the provided principal must be different from the one used to deploy the cannisters
dfx canister call test run "(principal \"mr2qb-wnilp-33aar-ep7ht-jqv4z-5ocdt-mmz2c-tm3of-2vt7q-bjf5i-6ae\")"
```
