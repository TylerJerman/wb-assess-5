// Get the human with the primary key 2
export const query1 = async () => {
  return await Human.findByPk(2);
};

// Get the first animal whose species is "fish"
export const query2 = async () => {
  return await Animal.findOne({ where: { species: 'fish' } });
};

// Get all animals belonging to the human with primary key 5
export const query3 = async () => {
  return await Animal.findAll({ where: { humanId: 5 } });
};

// Get all animals born in a year greater than (but not equal to) 2015.
export const query4 = async () => {
  return await Animal.findAll({ where: { birthYear: { [Op.gt]: 2015 } } });
};

// Get all the humans with first names that start with "J"
export const query5 = async () => {
  return await Human.findAll({ where: { fname: { [Op.like]: 'J%' } } });
};

// Get all the animals who don't have a birth year
export const query6 = async () => {
  return await Animal.findAll({ where: { birthYear: null } });
};

// Get all the animals with species "fish" OR "rabbit"
export const query7 = async () => {
  return await Animal.findAll({
    where: { species: { [Op.or]: ['fish', 'rabbit'] } },
  });
};

// Get all the humans who DON'T have an email address that contains "gmail"
export const query8 = async () => {
  return await Human.findAll({ where: { email: { [Op.notLike]: '%gmail%' } } });
};

// Print a directory of humans and their animals
export async function printHumansAndAnimals() {
  const humans = await Human.findAll({ include: Animal });

  humans.forEach((human) => {
    console.log(human.getFullName());
    human.animals.forEach((animal) => {
      console.log('- ' + animal.name + ', ' + animal.species);
    });
  });
}

// Return a Set containing the full names of all humans
// with animals of the given species.
export async function getHumansByAnimalSpecies(species) {
  const animals = await Animal.findAll({
    where: { species },
    include: Human,
  });

  const humans = new Set();

  animals.forEach((animal) => {
    humans.add(animal.human.getFullName());
  });

  return humans;
}