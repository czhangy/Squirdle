<div align="center">


<!-- Title -->

<h1>Squirdle</h1>

<!-- Badges -->

<p>
    <a href="">
        <img src="https://img.shields.io/github/last-commit/czhangy/squirdle" alt="last update" />
    </a>
    <a href="https://github.com/czhangy/squirdle/stargazers">
        <img src="https://img.shields.io/github/stars/czhangy/squirdle" alt="stars" />
    </a>
    <a href="https://github.com/czhangy/squirdle/issues/">
        <img src="https://img.shields.io/github/issues/czhangy/squirdle" alt="open issues" />
</p>
<h4>
    <a href="https://github.com/czhangy/squirdle">Documentation</a>
    <span> · </span>
    <a href="https://github.com/czhangy/squirdle/issues">Report Bug</a>
</h4>


</div>

<br />

<!-- Table of Contents -->

# Table of Contents

-   [About the Project](#about-the-project)
    -   [Summary](#summary)
    -   [Tech Stack](#tech-stack)
    -   [Features](#features)
    -   [Environment Variables](#environment-variables)

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Run Locally](#run-locally)
-   [Usage](#usage)
-   [Roadmap](#roadmap)
-   [License](#license)
-   [Contact](#contact)
-   [Acknowledgements](#acknowledgements)

<!-- About the Project -->

## About the Project

<!-- Summary -->

### Summary

Squirdle is a Pokémon-themed version of the popular game Wordle. Currently, all Pokémon from generations I - IV are available in game. Although features and bug fixes are planned, development on this project has been put on hold indefinitely. Assets and data have been scraped from Serebii, PokéAPI, and Project Pokémon.

The most up-to-date version of Squirdle is currently deployed at: https://squirdle.herokuapp.com.

<!-- Tech Stack -->

### Tech Stack

<details>
    <summary>Client</summary>
    <br />
  <a href="https://vuejs.org/">
		<img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-		badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js" />
	</a>
	<a href="https://sass-lang.com/">
    <img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white" alt="SASS" />
	</a>
</details>

<details>
    <summary>Server</summary>
    <br />
    <a href="https://nodejs.org/en/">
        <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    </a>
    <a href="https://expressjs.com/">
        <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
    </a>
</details>

<details>
    <summary>Database</summary>
    <br />
    <a href="https://www.mongodb.com/">
        <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
</details>

<details>
    <summary>Deployment</summary>
    <br />
    <a href="https://www.heroku.com//">
        <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white" alt="Heroku" />
    </a>
</details>

<!-- Env Variables -->

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

-   `ATLAS_URI`

<!-- Getting Started -->

## Getting Started

<!-- Prerequisites -->

### Prerequisites

This project uses NPM as a package manager

<!-- Run Locally -->

### Run Locally

Clone the project

```bash
git clone https://github.com/czhangy/squirdle.git
```

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run server
```

Start the application

```bash
npm run client
```

<!-- Roadmap -->

## Roadmap

-   [x] Build out Nav
    -   [x] Application name links to home

    -   [x] How to play button

    -   [x] Binoculars button

    -   [x] Settings button

-   [ ] Scrape data
    -   [ ] ~~Use PokéAPI to access data~~ (API bug causes Heroku deploy error)
    -   [x] Scrape Pokémon attributes (name, generation, typing, evolution stage) from PokéAPI
    -   [x] Acquire image URLs of box sprites from Serebii
    -   [x] Acquire GIF URLs of main sprites from Project Pokémon
    -   [ ] Generations I-VII (only I-IV done)

-   [x] Build out Dropdown
    -   [x] Dropdown results should filter by input
    -   [x] Dropdown should limit height and be scrollable beyond max height
    -   [x] Dropdown placeholder should display the current guess number
    -   [x] Each dropdown result should contain the Pokémon's box sprite and name
    -   [x] Dropdown results should be hoverable
    -   [x] Dropdown guess should submit on enter or button press
    -   [x] Button should be disabled temporarily after guess for debouncing

-   [x]  Build out game logic
    -   [x] Players should have a maximum of 8 guesses
    -   [x] The 5 categories displayed to the player should be the box sprite, generation number, typing, evolution stage, and name length
    -   [x] Each panel must have 4 states: inactive, incorrect, close, and correct
    -   [x] Box sprites should never be close, only correct or incorrect
    -   [x] Generation numbers are close if the guessed Pokémon's generation is within 1 of the target's
    -   [x] Typing is close if at least one of the guessed Pokémon's types matches at least 1 of the target's, and correct if the types are an exact match
    -   [x] Evolution stages are close if the guessed Pokémon's stage is within 1 of the target's
    -   [x] Name lengths are close if the guessed Pokémon's length is within 2 of the target's
    -   [x] All guesses and current game state should be saved in local storage to allow player to persist their game

-   [ ] Build out Game Grid
    -   [x] Game grid should have 8 rows, one for each possible guess
    -   [x] Game grid should be scrollable so that the grid can fit on a mobile screen, but hidden rows can be accessible via scroll
    -   [x] There should be headers to clarify which column reflects which attribute
    -   [x] Each row should have 5 panels, one for each attribute
    -   [x] Each panel should visually reflect its 4 possible states
    -   [x] When active, each panel should reflect the contents of the guess the row represents
    -   [x] On guess, the panels should flip in sequence
    -   [x] Warnings display for invalid guesses
    -   [ ] After each guess, the next empty row in the grid should be automatically scrolled to

-   [x] Build out Game Over flow
    -   [x] On game over, a modal should appear reflecting what the target Pokémon was, including its attributes
    -   [x] Modal text should differentiate between a win and a loss
    -   [x] The dropdown should change into a reset button, allowing the player to generate a new target

-   [x] Build out How to Play modal
    -   [x] Modal should pop up automatically for first-time players (as defined by local storage contents)
    -   [x] Modal should allow smooth navigation between pages using buttons to the left and right
    -   [x] First page should summarize the goal of the game
    -   [x] Next pages should define the various states for each attribute
    -   [x] The final page should include credits, both personal and external

-   [x] Build out Binoculars modal
    -   [x] If game is in progress, a patch of grass should be displayed, indicating the target is unknown
    -   [x] If game is over, the game over modal should be accessible through this button

-   [ ] Build out Settings modal
    -   [x] Sliders for light mode and hard mode toggle
    -   [ ] Tooltips to explain light mode and hard mode
    -   [x] A button that navigates to the user's profile (saved in local storage)
    -   [x] A share button that copies a link to the application to allow users to share with friends
    -   [x] A feedback button that allows user to send feedback through email

-   [x] Build out Profile page
    -   [x] Display statistics of user: caught, seen, and streak
    -   [x] Display the user's Pokédex, where caught Pokémon display a box sprite, seen Pokémon display a silhouette sprite, and unseen Pokémon display their Pokédex number
    -   [x] Pokédex should be scrollable and update without refresh
    -   [x] Display the user's medals, which are pre-defined achievements based on game activity
    -   [x] Medals should be darkened and redacted when uncollected and reveal information when collected
    -   [x] Medals should display rarity, name, and description
    -   [x] A tab navigation system to switch between Pokédex and medals, with visual indicators for hover and active tabs

-   [ ] Implement Light Mode
    -   [x] Should persist in local storage
    -   [ ] Should change theming application-wide (buggy)

-   [x] Implement Hard Mode
    -   [x] Dropdown should be disabled, forcing users to type in each Pokémon name manually
    -   [x] Any hints obtained so far in the game must be used with each guess

-   [x] Implement Feedback Form
    -   [x] Should have a subject field and message field
    -   [x] Should disable multiple requests
    -   [x] Should be easy to navigate back to the settings modal


<!-- License -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- Contact -->

## Contact

#### Charles Zhang:

<a href="https://www.linkedin.com/in/charles-zhang-14746519b/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/czhangy_">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>
<a href="https://czhangy.io">
    <img src="https://img.shields.io/badge/-personal%20site-darkgrey?logo=code-review&logoColor=white&style=for-the-badge" alt="Personal Site" />
</a>

<!-- Acknowledgments -->

## Acknowledgements

-   [Awesome README](https://github.com/matiassingers/awesome-readme)
-   [Shields.io](https://shields.io/)
-   [Serebii](https://www.serebii.net/)
-   [PokéAPI](https://pokeapi.co/)
-   [Project Pokémon](https://projectpokemon.org/)

