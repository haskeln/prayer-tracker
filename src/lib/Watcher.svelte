<script>
  import { AccordionItem, Accordion } from "flowbite-svelte";
</script>
  <AccordionItem>
    {#snippet header()}Configure Watchers{/snippet}
    <p class="mb-2 text-gray-500 dark:text-gray-400">Add and manage users that can track your prayer data</p>
    <p class="text-gray-500 dark:text-gray-400">
        Watchers can view your prayer data and summary, but cannot modify it. They can also receive notifications about your prayer status.
        <span class="font-bold">This feature is currently in development and will be available soon.</span> 
      Check out out development plan and journey <a href="/journey" target="_blank" rel="noreferrer" class="text-blue-600 hover:underline dark:text-blue-500">here</a>
    </p>
    <button disabled>+ Add Watcher</button>
  </AccordionItem>