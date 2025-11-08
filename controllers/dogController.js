import Dog from "../models/Dog.js";


//Register a new dog
export const registerDog = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "Dog name is required" });

        }

        const dog = await Dog.create({
            name,
            description,
            owner: req.user._id,
        });

            res.status(201).json({
                message: "Dog registered successfully",
                dog,
            });
        } catch (err) {
            console.error("Registered Dog Error:", err);
            res.status(500).json({ error: "Server error" });
        }
    };


    // Adopt a dog by ID
    export const adoptDog = async (req, res) => {
        try {
          const { id } = req.params;

          const dog = await Dog.findById(id);

          if (!dog) {
            return res.status(404).json({ error: "Dog not found" });
          }

          if (dog.status === "adopted") {
            return res.status(400).json({ error: "Dog is already adopted" });
          }

          if (dog.owner.toString() === req.user._id.toString()) {
            return res.status(400).json({ error: "You cannot adopt your own dog" });
          }

          dog.status = "adopted";
          dog.adoptedBy = req.user._id;
          await dog.save();

          res.json({
            message: `You successfully adopted ${dog.name}. The owner has been notified.`,
            dog,
          });
        } catch (err) {
            console.error("Adopt Dog Error:", err);
            res.status(500).json({ error: "Server Error" });
        }
    };

    //Remove a dog only by its owner and if not adopted

    export const removeDog = async (req, res) => {
        try {
            const { id } = req.params;
            const dog = await Dog.findById(id);

            if (!dog) return res.status(404).json({ error: "Dog not found" });

            if ( dog.owner.toString() !== req.user._id.toString()) {
                return res.status(403).json({ error: "Not authorized to remove this dog" });
        }

        if (dog.status === "adopted") {
  return res.status(400).json({ error: "Cannot remove a dog that has been adopted" });
}


            await dog.deleteOne();
            res.json({ message: `${dog.name} has been removed from the registry` });
        } catch (err) {
            console.error("Remove Dog Error:", err);
            res.status(500).json({ error: "Server error" });
        }
    };

    // List all dogs adopted by the auth user
    export const listAdoptedDogs = async (req, res) => {
        try {
            const dogs = await Dog.find({ adoptedBy: req.user._id });
            res.json(dogs);
        } catch (err) {
            console.error("List Adopted Dogs Error:", err);
            res.status(500).json({ error: "Server error" });
        }
    };
    