const { Tech } = require('../models/index');

const techdata = [
   {
      title: "Austin",
      location: "Austin, Texas",
      tech_description: "Austin is a hill country.",
      starting_date: "2022-03-06",
      ending_date: "2022-03-10",
      user_id: 1
  },
  {
      title: "Vist Korea",
      location: "Korea",
      tech_description: "10 day tech around Korea; Korea is a small but beautiful country",
      starting_date: "2021-01-01",
      ending_date: "2021-01-11",
      user_id: 2
  },
  {
      title: "Yosemite National Park",
      location: "California",
      tech_description: "You will touch the blue sky here in Yosemite!",
      starting_date: "2021-05-06",
      ending_date: "2021-05-12",
      user_id: 3
  },
  {
    title: "Going Down Under",
    location: "New Zealand",
    tech_description: "Travel to down under to visit both islands.",
    starting_date: "2022-01-30",
    ending_date: "2022-02-15",
    user_id: 1
  }
]
const seedTechs = () => Tech.bulkCreate(techdata);

module.exports = seedTechs;
