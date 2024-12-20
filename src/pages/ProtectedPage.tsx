import { useState } from "react";
import { Link } from "react-router-dom";
import { useSession } from "@/context/SessionContext";
import { updateRole } from "@/api";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { roleData } from "@/data";
import { capitalize } from "@/utils";
import { toast } from "react-hot-toast";

const ProtectedPage = () => {
  const { session, userRole } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(roleData[0]);

  const handleRoleChange = async (newRole: string) => {
    if (loading) return; // Prevent multiple clicks while loading
    setLoading(true);

    try {
      const { success, error } = await toast.promise(
        updateRole(session?.user.id, newRole.toLowerCase()),
        {
          loading: "Updating role...",
          success: "Role updated successfully!",
          error: "Error updating role",
        }
      );

      if (success) {
        console.log("Role updated successfully");
      } else {
        // Handle specific error from API response if needed
        toast.error(`Error updating role: ${error || "Unknown error"}`);
      }
    } catch (error) {
      // Catch unexpected errors
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false); // Reset the loading state
    }
  };

  return (
    <main>
      <Link className="home-link" to="/">
        ◄ Home
      </Link>
      <section className="main-container">
        <h1 className="header-text">This is a Protected Page</h1>
        <p>Current User : {session?.user.email || "None"}</p>
        <p>Current Role : {capitalize(userRole || "None")}</p>

        <Listbox value={selectedRole} onChange={setSelectedRole}>
          <Label className="block text-lg text-white mt-5 font-bold">
            Assigned to
          </Label>
          <div className="relative my-5 w-64 h-12">
            <ListboxButton className="grid w-full h-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 hover:bg-white sm:text-sm/6">
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <img
                  alt=""
                  src={selectedRole.avatar}
                  className="size-8 shrink-0 rounded-full"
                />
                <span className="block truncate text-base">
                  {selectedRole.role}
                </span>
              </span>
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
              {roleData.map((roles) => (
                <ListboxOption
                  key={roles.id}
                  value={roles}
                  className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                >
                  <div className="flex items-center">
                    <img
                      alt=""
                      src={roles.avatar}
                      className="size-8 shrink-0 rounded-full"
                    />
                    <span className="ml-3 block text-base truncate font-normal group-data-[selected]:font-semibold">
                      {roles.role}
                    </span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                    <CheckIcon aria-hidden="true" className="size-5" />
                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>

        <button
          onClick={() => handleRoleChange(selectedRole.role)} // Call handleRoleChange
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Role"}
        </button>
      </section>
    </main>
  );
};

export default ProtectedPage;
