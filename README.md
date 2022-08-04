# Boardcamp API

The API for Boardcamp, a system to manage rentals of a board games store.

The front-end repository can be found <a href="https://github.com/bootcamp-ra/boardcamp-front" target="_blank">here</a>

## Implemented features

- Add and list categories, games and customers
- Update some of the customers informations
- Rent a game to a customer
- Return or delete a rent
- Extras on the back-end repository: paging, sorting and filtering the lists by some param

## Technologies

<p>
  <img src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white' alt="Node"/>
  
  <img src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white' alt="PostgreSQL" />
  
  <img src='https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white' alt="Express" />

</p>

## How to run

1. Clone this repository

```
git clone git@github.com:acolima/boardcamp-api.git
```

2. Go to the project directory

```
 cd boardcamp-api
```

3. Install dependencies

```
npm i
```

4. Go to the database directory and run 
```
cd database
bash ./create-database
cd ..
```

5. Create a `.env` file with the same structure of `.env.example` and change the values of the enviroment variables
```bash
DATABASE_URL={POSTGRES CONNECTION STRING}
PORT={PORT THAT YOU HAVE SETTLED}
```

6. Run project with
```bash
npm run dev
```

## Author

<img src='https://avatars.githubusercontent.com/acolima' width='150px'/>

<p>
  <a href='https://www.linkedin.com/in/ana-caroline-oliveira-lima/'>
    <img src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white' alt='LinkedIn' />
  </a>
  <a href='mailto:acolima@gmail.com'>
    <img src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white' alt='Gmail' />
  </a>
</p>
