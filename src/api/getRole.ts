import supabase from "@/lib/supabase";

/**
 * Fetches the user role for a given user ID.
 * @param userId - The ID of the user.
 * @returns The user's role as a string, or null if an error occurs.
 */
export const getUserRole = async (userId: string): Promise<string | null> => {
  console.log("Fetching role for user ID:", userId);

  try {
    const { data, error } = await supabase
      .from("users_role")
      .select("role")
      .eq("id", userId)
      .single();

    console.log("Finish Fetching Role");

    if (error) {
      console.error("Error fetching user role:", error);
      return null;
    }

    console.log("Fetched role:", data?.role);
    return data?.role ?? null;
  } catch (error) {
    console.error("Fetch role failed or timed out:", error);
    return null;
  }
};
