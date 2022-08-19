require("../src/db/mongoose.js");
const User = require("../src/models/user");

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("627ab6f690913c1a3f9c3682", 12)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
