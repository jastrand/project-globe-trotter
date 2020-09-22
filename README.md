# Project Globetrotter

Welcome to Globetrotter! This app lets you search for countries, click on each country to explore details like population and capital. The app also offers daily currency exchange from SEK to any given currency. 

## Run the code
1) Git clone
2) npm install 
3) npm start 

## Tech used and how I got started:
This project was really fun and partially challenging in the beginning. My initial idea was to create a one page app with all the information required but I ended up with a more clean and structured solution. For this project I have used React with React Hooks to handle both the search component with useState and useEffect for fetching the data. I decided to take advantage of React browser router with useParams to display details about each country on a new page, instead of having it all on one page. I also used Redux as a middleware for all the data coming from the 3 different API endpoints, that way I could deal with potential errors from the database and get easy access to the information needed. The fetches are made with Thunks in the reducer file so I easily could dispatch and use them in the different components. 

## What I struggled with:

Not to overcomplicate things, I decided to follow the API suggestions provided and that gave me some struggles along the way. In many cases I had to “manipulate” the data back and forth from object to array, to string, and then into a number and limit the decimals and so on. I believe that I potentially could have found a better and more clean way to deal with these issues. Also the free version of the currency API provided responses only from EUR base so that had to be dealt with. However, these parts are also the best kinds of struggles and something I do enjoy solving and “working around”. The free version only allowed content sent over HTTP and I will explain more about that further down. 


## If I had more time with this project:

- I started to implement a logic to deal with errors from the API responses. However this logic could be improved after some more thought and time spent on it.

- It would be super cool to display some exchange rate data over time for each country. This could be done with libraries like d3.js to give the user the chance to interact with the data as well. 

- Loading state for a better user experience if the API responses are slow. 

- To be completely honest, I would either change API for the currency or paying for a plan with fixer.io because the free version only allows traffic over HTTP. I really wanted to deploy this project and send you a live version of it - However, Netlify which is the service I have been using a lot only serves content over HTTPS. I managed to have the site deployed, however one of the main features "Currency Converter" is not working as it’s logic is based on the fetch from an HTTP API. (https://youthful-roentgen-968461.netlify.app/) - I noticed this way too late in the process. 

## The requirements
Create a simple web interface using React which allows users to: 

a) Search for countries and display its full country name, capital, population and currency. This can be a simple list, but you can also get creative in how to vizualise these data points. 

b) Enter an amount in SEK and get the amount converted into local currency for each country. 

The data can amongst others be retrieved from the following open APIs:
- https://restcountries.eu for country information 
- http://fixer.io for exchange rates
