<template>
  <div>
    <UCard class="!bg-(--ui-bg)">
      <template #header>
        <div>
          <h2 class="text-lg font-medium">Message Density</h2>
        </div>
      </template>

      <BarChart
        :data="chartData"
        :height="250"
        :categories="categories"
        :y-axis="['amount']"
        :y-num-ticks="2"
        :curve-type="CurveType.Basis"
        :legend-position="LegendPosition.Top"
        :x-formatter="(i) => `${chartData[i]?.month}`"
        :y-formatter="formatCurrency"
      />
    </UCard>
  </div>
</template>

<script setup lang="ts">
interface SpendingData {
  month: string;
  amount: number;
}

const chartData = ref<SpendingData[]>([
  { month: formatDate(new Date('2025-01-01')), amount: 2500 },
  { month: formatDate(new Date('2025-02-01')), amount: 1500 },
  { month: formatDate(new Date('2025-03-01')), amount: 3000 },
  { month: formatDate(new Date('2025-04-01')), amount: 4000 },
  { month: formatDate(new Date('2025-05-01')), amount: 4500 },
  { month: formatDate(new Date('2025-06-01')), amount: 2800 },
  { month: formatDate(new Date('2025-07-01')), amount: 3500 },
  { month: formatDate(new Date('2025-08-01')), amount: 3800 },
  { month: formatDate(new Date('2025-09-01')), amount: 2000 },
  { month: formatDate(new Date('2025-10-01')), amount: 4200 },
  { month: formatDate(new Date('2025-11-01')), amount: 2200 },
  { month: formatDate(new Date('2025-12-01')), amount: 1800 },
]);

const categories: Record<string, BulletLegendItemInterface> = {
  amount: { name: 'Monthly Spending', color: '#22c55e' },
};

const formatCurrency = (tick: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(tick);
};

function formatDate(dateString: Date) {
  const options = {
    month: 'short',
  };

  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
</script>
