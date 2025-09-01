import UserModel from "../../models/auth/authUser.js";

export const profile = async (req, res) => {
  try {
    const userId = req.params.id; 

    const user = await UserModel.findById(userId, "name email dob");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile data fetched successfully",
      user: {
        name: user.name,
        email: user.email,
        dob: user.dob,
      },
    });
  } catch (error) {
    console.error("Error during fetching profile data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

