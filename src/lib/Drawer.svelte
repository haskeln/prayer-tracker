<script>
  import { Drawer, Button, CloseButton, Sidebar, SidebarBrand, SidebarCta, SidebarWrapper, SidebarDropdownWrapper, SidebarGroup, SidebarItem } from "flowbite-svelte";
  import { ChartPieSolid, CartSolid, GridSolid, MailBoxSolid, UsersSolid, ShoppingBagSolid, ArrowRightToBracketOutline, EditOutline, AngleRightOutline, CheckCircleSolid } from "flowbite-svelte-icons";
  import AccountPopup from "./AccountPopup.svelte";
  import AccountPopupV2 from "./AccountPopupV2.svelte";
  import {getAuth, onAuthStateChanged} from "firebase/auth";
  import { tick } from "svelte";


  let hidden2 = $state(true);
  let spanClass = "flex-1 ms-3 whitespace-nowrap";
  let {children} = $props();

  onAuthStateChanged(getAuth(), (user) => {
    hidden2 = true;
  });

</script>

<div class="text-center">
  <Button class="top-2 left-4 absolute" onclick={() => (hidden2 = false)}>Menu <AngleRightOutline/></Button>
</div>
<Drawer bind:hidden={hidden2} class="w-fit bg-gray-50 p-0 dark:bg-gray-800">
  <div class="flex items-center justify-between px-2 pt-4">
    <h5 class="px-4 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">Amalio</h5>
    <CloseButton onclick={() => (hidden2 = true)} class="dark:text-white" />
  </div>
  <Sidebar class="static">
    <SidebarWrapper class="overflow-y-auto rounded-sm px-3 py-4 dark:bg-gray-800">
      
      <SidebarGroup>
        {#if getAuth().currentUser}
        <SidebarDropdownWrapper label="Amaliyah Tracker">
           {#snippet icon()}
            <GridSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          {/snippet}
          <SidebarItem href="/tracker/salah" label="Fardh Salah" />
          <SidebarItem href="/tracker/quran" label="Quran" />
          <SidebarItem href="/tracker/sunnah" label="Sunnah" />
        </SidebarDropdownWrapper>
        <SidebarItem href="/summary" label="Summary">
          {#snippet icon()}
            <ChartPieSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          {/snippet}
        </SidebarItem>
        <SidebarItem href="/group" label="Tracking Group">
          {#snippet icon()}
            <UsersSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          {/snippet}
          {#snippet subtext()}
            <span class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">Pro</span>
          {/snippet}
        </SidebarItem>
        {/if}
        <!-- <SidebarItem href="/journey" label="Development Journey">
          {#snippet icon()}
            <CheckCircleSolid class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
          {/snippet}
        </SidebarItem> -->
        <AccountPopupV2 />
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>
</Drawer>