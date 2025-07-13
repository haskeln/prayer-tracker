<script>
  import { app, loadSummary } from "$lib/firebase";
  import { Chart } from "@flowbite-svelte-plugins/chart";
  import { Card, A, Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ArrowUpOutline, ChevronDownOutline, ChevronRightOutline } from "flowbite-svelte-icons";
  import { onMount, getContext } from "svelte";

  let prayerSummaryState = $state({jamaah: [0,0,0,0,0], munfarid: [0,0,0,0,0], missed: [0,0,0,0,0], nostatus: [0,0,0,0,0]});

  let options = $derived({
    series: [
      {
        name: "Jamaah",
        color: "#31C48D",
        data: prayerSummaryState.jamaah
      },
      {
        name: "Munfarid",
        data: prayerSummaryState.munfarid,
        color: "#ebbd52"
      },
       {
        name: "Missed",
        data: prayerSummaryState.missed,
        color: "#F05252"
      },
      {
        name: "No Status",
        data: prayerSummaryState.nostatus,
        color: "#9CA3AF"
      }
    ],
    chart: {
      sparkline: {
        enabled: false
      },
      type: "bar",
      width: "100%",
      height: 400,
      toolbar: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadiusApplication: "end",
        borderRadius: 6,
        dataLabels: {
          position: "top"
        }
      }
    },
    legend: {
      show: true,
      position: "bottom"
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
        },
      },
      categories: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400"
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      }
    }
  });

  let selected = $state("Last 7 days");

  const dateIntervalOptions = {
    0 : "Today",
    1 : "Yesterday",
    7 : "Last 7 days",
    30 : "Last 30 days",
    90 : "Last 90 days"
  }

  const appState = getContext('_app');

  onMount(async () => {
    await getSummary(appState.summaryNDays);
  }); 

  async function getSummary(nDays){
    selected = dateIntervalOptions[nDays]
    appState.summaryNDays = nDays;
    prayerSummaryState = {jamaah: [0,0,0,0,0], munfarid: [0,0,0,0,0], missed: [0,0,0,0,0], nostatus: [0,0,0,0,0]};
    const prayerSummary = (await loadSummary(nDays)).prayerSummary
    prayerSummary.forEach((prayerDay, index) => {
      prayerDay.forEach((prayer, i) => {
        if (prayer.status === 'jamaah') {
          prayerSummaryState.jamaah[i] = prayerSummaryState.jamaah[i] + 1 || 1;
          prayerSummaryState.jamaah = [...prayerSummaryState.jamaah]; // Trigger reactivity
        } else if (prayer.status === 'munfarid') {
          prayerSummaryState.munfarid[i] = prayerSummaryState.munfarid[i] + 1 || 1;
          prayerSummaryState.munfarid = [...prayerSummaryState.munfarid]; // Trigger reactivity
        } else if (prayer.status === 'missed') {
          prayerSummaryState.missed[i] = prayerSummaryState.missed[i] + 1 || 1;
          prayerSummaryState.missed = [...prayerSummaryState.missed]; // Trigger reactivity
        }
        else {
          prayerSummaryState.nostatus[i] = prayerSummaryState.nostatus[i] + 1 || 1;
          prayerSummaryState.nostatus = [...prayerSummaryState.nostatus]; // Trigger
        }
      });
    });
  }

  function countPrayerDone() {
    return prayerSummaryState.jamaah.reduce((acc, curr) => acc + curr, 0) +
    prayerSummaryState.munfarid.reduce((acc, curr) => acc + curr, 0);
  }

  function countPrayerMissed() {
    return prayerSummaryState.missed.reduce((acc, curr) => acc + curr, 0);
  }

  function countPrayerNoStatus() {
    return prayerSummaryState.nostatus.reduce((acc, curr) => acc + curr, 0);
  }
</script>

<Card class="p-4 md:p-6 mb-4">
  <div class="grid grid-cols-3 py-3">
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Done</dt>
      <dd class="text-xl leading-none font-bold text-green-500 dark:text-green-400">{countPrayerDone()}</dd>
    </dl>
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">Missed</dt>
      <dd class="text-xl leading-none font-bold text-red-600 dark:text-red-500">{countPrayerMissed()}</dd>
    </dl>
    <dl>
      <dt class="pb-1 text-base font-normal text-gray-500 dark:text-gray-400">No Status</dt>
      <dd class="text-xl leading-none font-bold text-gray-600 dark:text-red-500">{countPrayerNoStatus()}</dd>
    </dl>
  </div>

  <Chart {options} />
  <div class="grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between pt-5">
      <Button class="inline-flex items-center bg-transparent py-0 text-center text-sm font-medium text-gray-500 hover:bg-transparent hover:text-gray-900 focus:ring-transparent dark:bg-transparent dark:text-gray-400 dark:hover:bg-transparent dark:hover:text-white dark:focus:ring-transparent">{selected}<ChevronDownOutline class="m-2.5 ms-1.5 w-2.5" /></Button>
      <Dropdown simple class="w-40" offset={-6}>
        <DropdownItem onclick={()=> getSummary(1)}>Yesterday</DropdownItem>
        <DropdownItem onclick={()=> getSummary(0)}>Today</DropdownItem>
        <DropdownItem onclick={()=> getSummary(7)}>Last 7 days</DropdownItem>
        <DropdownItem onclick={()=> getSummary(30)}>Last 30 days</DropdownItem>
        <DropdownItem onclick={()=> getSummary(90)}>Last 90 days</DropdownItem>
      </Dropdown>
      <A href="/" class="hover:text-primary-700 dark:hover:text-primary-500 rounded-lg px-3 py-2 text-sm font-semibold uppercase hover:bg-gray-100 hover:no-underline dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
        Prayer Report
        <ChevronRightOutline class="ms-1.5 h-2.5 w-2.5" />
      </A>
    </div>
  </div>
</Card>