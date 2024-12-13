import supabase from "@/lib/supabase";

/**
 * Fetches the user role for a given user ID.
 * @param userId - The ID of the user.
 * @returns The user's role as a string, or null if an error occurs.
 */
export const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("users_role")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }

    return data?.role ?? null;
  } catch (error) {
    console.error("Fetch role failed or timed out:", error);
    return null;
  }
};
