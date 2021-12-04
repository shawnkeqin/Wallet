# neo.tax SWE Interview: Take-home Assignment - Bezos (Empire) State of Wallet

## Description

It’s the year 2029. Faris, a curly-haired, slightly neurotic 21 year-old university student, is concerned about the ever-growing influence of Jeff Bezos and his economic empire. In particular, Faris would like to know how much money he spends on Bezos-related companies (his Bezos’ "share of wallet").

Build a simple web tool for Faris to calculate how much money he spends on Bezos-related companies.

## Requirements

- Show Faris a list of his transactions for the month of January 2029, ordered by date.
- Allow him to visually discern which transactions are to known Bezos-related companies.
- Let him see how much money he pays to these Bezos-affiliated companies (both as a total dollar amount, and as a percentage of his spend).
- Allow him to mark or unmark any specific transaction as being Bezos-related, even if it is not to a known Bezos-related company.
- If Faris marks (or unmarks) any transaction as being Bezos-related, all other transactions to the same *merchant name* should also be marked or unmarked in the same way (for example, if he marks any Lyft transaction as Bezos-related, all Lyft transactions should become Bezos-related).
- Any changes Faris makes should be persisted for future use.

## App

![Screenshot 2021-12-05 at 3 45 28 AM](https://user-images.githubusercontent.com/44067954/144722639-972f4d7f-d4ad-4875-bb2c-13cd024139f3.png)


## Backend Setup 

Clone the repo and run the following commands in the server folder:

```
git clone https://github.com/shawnkeqin/neo-tax-assignment.git
cd server
npm install 
```

Once done, add config as per .env.example file in client folder - then run the following command to get server up and running:

```
npm start 
```

## Frontend Setup 

Run the following command in the client folder:

```
cd client
npm install 
```

Once done, add config as per .env.example file in client folder, then run to get client up and running: 

```
npm start 
```

## Technologies used:

- Typescript
- React
- NestJS
- GraphQL
- NodeJS
- PostgreSQL 

## Architecture: 

![Screenshot 2021-12-05 at 3 54 15 AM](https://user-images.githubusercontent.com/44067954/144722891-9354f13d-c8e4-4055-bfa4-adf6011e5090.png)

