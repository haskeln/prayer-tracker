<script>
    import { getContext } from "svelte";
    import { handleLogin, handleLogout } from "./firebase";
    import { Popover, Button } from "flowbite-svelte";

    const appState = getContext('_app');
</script>
<Button onclick={!appState.user ? handleLogin : undefined}
        class="rounded-input bg-dark text-background shadow-mini hover:bg-dark/95 inline-flex h-10 select-none items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-medium transition-all hover:cursor-pointer active:scale-[0.98]">
    {appState.user ? appState.user.displayName : "Login"}
</Button>
{#if appState.user}
<Popover>
        <div class="flex items-center">
        <div
          class="mr-3 flex size-12 items-center justify-center rounded-full"
        >
            <img
                src={appState.user ? appState.user.photoURL : ""}
                alt="User Avatar"
                class="rounded-full"
            />
        </div>
        <div class="flex flex-col">
          <h4 class="text-[17px] font-semibold leading-5 tracking-[-0.01em]">
            {appState.user ? appState.user.displayName : "User"}
          </h4>
          <p class="text-muted-foreground text-sm font-medium">
            {appState.user ? appState.user.email : "No Email"}
          </p>
        </div>
      </div>
      
      <div class="flex items-center pb-2 gap-2">
        <button >Account Settings</button>
        <button onclick={handleLogout}>Logout</button>
      </div>
</Popover>
{/if}