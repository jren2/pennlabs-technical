## Pennlabs Frontend Challenge
My frontend technical for pennlabs!

## How to run
1) git clone this repo
2) cd to home directory
3) npm install
4) npm start

## Features included
1. Explore Courses
- This app contains a Description section which displays dept, number, title and description from src/data/courses.json
- When the user searches a course and clicks on it, it displays this information along with other information (discussed later)

2. Search and Filter
- The user is able to type into a search bar and filter courses based on title, description and number

3. Add courses to your cart
- The user is able to search and then add any courses they wish to the cart by clicking on the cart icon next to the course. 
- When adding, a toast will appear and the user will not be able to add more than 7 courses to the cart
- When added, the cart icon in the top right will also change to reflect the number of courses in the cart
- When a course is added, the cart icon changes to reflect that the course is in the cart (a new icon appears and you are able to remove the course)
- When the user reaches 7 courses, all other course icons get grayed out - they are still able to be clicked but result in a "course limit reached" toast

4. Checkout cart
- The user is able to checkout their current cart which redirects to the /checkout page.
- On this page, the user is able to rank their courses 
- This is implemented with React Router and results in a new URL
  - Important to note here is that this does not use URL or query parameters and instead uses React Router Link state. This results in both safer links, state persistence when going between checkout and homepage, and a more readable url.
- When the user reaches the checkout stage, they can reorder their cart and click confirm. This will result in a receipt for the user showing them a receipt of their cart.

5. View cart
- The user is able to click the cart button in the top right and view a sidebar which shows the course cart
- This sidebar displays the courses in the cart as well as the average attributes (difficulty, course quality, instructor quality, work required) of the course.
- If the course has no items in it, then a message is displayed 

### Additional Features
1. Ranking courses
- Once the user checks out their courses, they are able to rank them in order of preferences with a drag and drop menu.
- The user is also able to sort their courses based on difficulty, course quality, instructory quality or work required by clicking on the icon next to it

2. Integrating data from Penn Courses server
- Using the data from the penn courses server, there are a number of places where it is displayed
- When the user clicks on a course to get the description, along with the title and description, they are shown the recitation and lectures sections for the course along with the ratings and requirements is fulfils.
- When the user compares two courses, they are shown the ratings of the courses
- When the user views their cart, they are shown the average ratings of their cart

3. Course Compare
- In addition to these features, the user has the ability to compare two courses of their chosing.
- The user can chose the course they want to compare by going to the ComboBox at the top of the "Course Compare" section.
  - This will allow the user to type and autofill based on the course number, title or description
  - The user will also be allowed to select based on a dropdown menu
- When the user selects 2 courses, they will be compared with a circular progress bar
- This displays the more desirable course based on the value of the attribute (green for more desirable, red for less)


## Tools used
- Typescript
- React
- Tailwind + CSS
- Redux
- React Router
