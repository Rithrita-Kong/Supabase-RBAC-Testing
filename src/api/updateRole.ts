import supabase from "@/lib/supabase";

// Function to update user role
export const updateRole = async (userId: string, newRole: string) => {
  try {
    const { data, error } = await supabase
      .from("users_role")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      console.error("Error updating role:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error changing role:", error);
    return { success: false, error };
  }
};
