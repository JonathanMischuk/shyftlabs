#  ShyftLabs - Tech Assessment
##  Authored by Jonathan Mischuk

__Instructions to run server:__

1. Clone repository to local disk from Github or with this command in a terminal - `git clone https://github.com/JonathanMischuk/shyftlabs.git`.
2. In a terminal, run these commands `cd <project-dir>` and `npm i` to install dependencies.
3. After the dependencies are installed, run this command `npm run dev` to start the server.
4. A URL will be provided, copy and paste the URL into a browser tab.

__Technologies used:__

 - __Vite__ for scaffolding.
 - __JavaScript__ / __React__ / __Redux__ / __Redux Toolkit__ for UI and state management (Redux Toolkit is an opinionated abstraction layer on top of Redux created by the same authors to greatly simplify its usage and reduce boilerplate code).
 - __React Router__ for client side routing.
 - __Sass__ / __Scss__ for styling and responsiveness (I chose this because it's very simple to get off the ground running).
 - __Jest__ / __Babel__ for testing

__Quick Summary:__

 1. Upon load, 20 products are retrieved - this value is a config constant.
 2. Scrolling will eventually invoke an event with an Intersection Observer to load 20 more items to a max of 100 (also a config constant).
 3. The select box on the Products List page ranges from 1-100 and on change will determine whether the amount selected is too high to delete or add items (I added an inventory limit of 100 per item to tame the behaviour and logic of each select box - this is also a config constant).
 4. Add and Remove buttons will add or decrease the amount of items currently in the cart.
 5. The product description was unwieldy, so I shortened and added a show more option.
 6. There is a navigation link that will take you to view your Cart Details.
 7. The select box on the Cart Details will auto add or remove items on change and there is a clear cart button at the bottom.
 8. The site is responsive with css media queries as well as grid and flexbox containers.
 8. Buttons, select boxes or anchor tags were used for any type of user interactions for accessibility.
 10. Standard screen size media queries selected were 1280px, 1024px, 768px, and 480px. These sizes helped the product list not look to squeezed.

 __Scripts:__

 - `npm run dev` - starts the server
 - `npm run test` - run jest tests
 - `npm run lint` - lint project directory

__Things I would have liked to do:__

 - Use __TypeScript__ for a more safe and satisfying development experience. You don't realize how much you miss it until you start a project without it.
 - Use __CSS modules__ or __Styled-Components__ for proper tree shaking and lexical scoping.
 - Add more visual notifications for select box on change events
 - More testing - e2e and unit tests.
 - Think of some alternative ways to load the product list cache more performantly
