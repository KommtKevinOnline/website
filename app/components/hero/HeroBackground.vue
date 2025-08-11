<template>
  <svg
    class="w-full p-4 h-96 rounded-4xl"
    viewBox="0 0 1024 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <g filter="url(#filter0_n_204_75)">
      <rect width="1024" height="512" fill="url(#paint0_linear_204_75)" />
    </g>
    <defs>
      <filter
        id="filter0_n_204_75"
        x="0"
        y="0"
        width="1024"
        height="512"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1 1"
          stitchTiles="stitch"
          numOctaves="3"
          result="noise"
          seed="524"
        />
        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
          <feFuncA
            type="discrete"
            tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 "
          />
        </feComponentTransfer>
        <feComposite
          operator="in"
          in2="shape"
          in="coloredNoise1"
          result="noise1Clipped"
        />
        <feFlood flood-color="rgba(0, 0, 0, 0.05)" result="color1Flood" />
        <feComposite
          operator="in"
          in2="noise1Clipped"
          in="color1Flood"
          result="color1"
        />
        <feMerge result="effect1_noise_204_75">
          <feMergeNode in="shape" />
          <feMergeNode in="color1" />
        </feMerge>
      </filter>
      <linearGradient
        id="paint0_linear_204_75"
        x1="0"
        y1="0"
        x2="1024"
        y2="507"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#42E695" />
        <stop offset="0.5" stop-color="#3AD4B1" />
        <stop offset="1" stop-color="#3BB2B8" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts" setup></script>

<style></style>
