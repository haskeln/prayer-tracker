<script>
    import { Popover, Separator, Toggle } from "bits-ui";
    import { getContext } from "svelte";
    import { handleLogin } from "./firebase";

    const appState = getContext('_app');
</script>

{#if appState.user}
<Popover.Root>
  <Popover.Trigger
    class="rounded-input bg-dark
	text-background shadow-mini hover:bg-dark/95 inline-flex h-10 select-none items-center justify-center whitespace-nowrap px-[21px] text-[15px] font-medium transition-all hover:cursor-pointer active:scale-[0.98]"
  >
    {appState.user ? appState.user.displayName : "Login"}
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Content
      class="border-dark-10 shadow-popover data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) z-30 w-full max-w-[328px] rounded-[12px] border p-4"
      sideOffset={8}
    >
      <div class="flex items-center">
        <div
          class="bg-muted mr-3 flex size-12 items-center justify-center rounded-full"
        >
            <img
                src={appState.user ? appState.user.photoURL : ""}
                alt="User Avatar"
                class="rounded-full"
            />
        </div>
        <div class="flex flex-col">
          <h4 class="text-[17px] font-semibold leading-5 tracking-[-0.01em]">
            Resize image
          </h4>
          <p class="text-muted-foreground text-sm font-medium">
            Resize your photos easily
          </p>
        </div>
      </div>
      <Separator.Root class="bg-dark-10 -mx-4 mb-6 mt-[17px] block h-px" />
      <div class="flex items-center pb-2">
        Account Settings
        <button onclick={handleLogin}>Logout</button>
      </div>
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
{:else}
<button onclick={handleLogin}>Please Login</button>
{/if}