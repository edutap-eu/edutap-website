<p align="center">
  <a href="https://www.gatsbyjs.com/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>

# eduTAP Website based on Gatby

## Updating Data

You can update data in three different locations in the repository:

- `/static/presentations`
- `/src/images`
- `/src/data`

### Presentations

Here you can add presentations (.pdf).
These can be linked in the roadmap.json file in `src/data/roadmap.json`.
You don't have to specify the path, but only the filename.

### Images

This folder contains all images used in the website.
You will most likely only need to add images in the `team` sub-folder.
Here you can add/edit images for team members. They can be either `.png` or `.jpg`.
In the `src/data/team.json` file you can link the images to the team members by specifying the relative path to the
image.
(e.g. `../images/team/your-image.png`)

### Data

The data folder contains the following files:

- `nav.json`
- `history.json`
- `roadmap.json`
- `presentations.json`
- `team.json`

You will most likely only need to edit the last three files.
In the `presentations.json` file you can add presentations to the presentations page.
In the `roadmap.json` file you can add milestones to the roadmap.
(s. Presentation section on how to add presentations to milestones). 
In the `team.json` file you can add team members.
(s. Image section on how to add images for team members).


## 🚀 Quick start

1. **Start developing.**

Make sure to have npm installed.
If in doubt use nvm and install the stable version.

In the repositories root directory:

First run `npm install` one time.

Then start the development server `npm run develop`.

Your site is now running at http://localhost:8000!

Edit and save a file in `src/pages/` to see your site update in real-time!

User `npm run clean` to delete the cache and public folder. This is useful if you have problems with the development
server.

3. **Deployment to GH Pages**

Push to the master branch and the site will be deployed automatically.

4. **Learn more**

- [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
- [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter)
