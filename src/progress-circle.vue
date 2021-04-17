<template>
    <svg
      v-bind="svgCustomProps"
      class="vue-progress-circle-svg"
      :class="svgClassName"
      :viewBox="componentViewBox"
      :width="size"
      :height="size"
    >
        <path
          v-if="value"
          v-bind="sectorCustomProps"
          :class="sectorClassName"
          :fill="sectorFill"
          :stroke="sectorStroke"
          :fill-rule="sectorFillRule"
          :d="path"
        />
        <circle
          v-bind="circleCustomProps"
          :cx="circleCenter"
          :cy="circleCenter"
          :r="circleRadius"
          :stroke-width="borderWidth"
          :fill="borderFill"
          :stroke="borderStroke"
        />
    </svg>
</template>

<script>
    export default {
        name: 'progress-circle',
        props: {
          /*
          * @model
          * The value for current progress
          */
          value: {
            type: Number,
            default: 0,
          },
          /*
          * Sets the diameter of the circle in pixels
          */
          size: {
            type: Number,
            default: 24,
          },
          /*
          * Sets the starting sector angle, in radians
          */
          startAngle: {
            type: Number,
            default: 0,
          },
          /*
          * Sets the minimum value needed to normalize the value range.
          */
          minValue: {
            type: Number,
            default: 0,
          },
          /*
          * Sets the maximum value needed to normalize the value range.
          */
          maxValue: {
            type: Number,
            default: 100,
          },
          /*
          * Sets the svg root tag class name.
          */
          svgClassName: {
            type: String,
            default: '',
          },
          /*
          * Sets the sector class name.
          */
          sectorClassName: {
            type: String,
            default: '',
          },
          /*
          * Sets the sector fill.
          */
          sectorFill: {
            type: String,
            default: '#5B85AA',
          },
          /*
          * Sets the sector stroke.
          */
          sectorStroke: {
            type: String,
            default: 'none',
          },
          /*
          * Sets the sector fill rule.
          */
          sectorFillRule: {
            type: String,
            default: 'evenodd',
          },
          /*
          * Sets the border class name.
          */
          borderClassName: {
            type: String,
            default: '',
          },
          /*border
          * Sets the sector fill.
          */
          borderFill: {
            type: String,
            default: 'none',
          },
          /*
          * Sets the border stroke.
          */
          borderStroke: {
            type: String,
            default: '#414770',
          },
          /*
          * Binds every property of the passed Object as props/attributes of the `svg` component.
          */
          svgCustomProps: {
            type: Object,
            default: () => {},
          },
          /*
          * Binds every property of the passed Object as props/attributes of the sector `path` tag.
          */
          sectorCustomProps: {
            type: Object,
            default: () => {},
          },
          /*
          * Binds every property of the passed Object as props/attributes of the `circle` tag.
          */
          circleCustomProps: {
            type: Object,
            default: () => {},
          },
        },
        computed: {
          componentViewBox() {

            return `0 0 ${ this.size } ${ this.size }`;

          },
          circleCenter() {

            return this.size / 2;

          },
          circleRadius() {

            return this.circleCenter / 1.02;

          },
          borderWidth() {

            const border = this.size * 0.02;

            return border < 1 ? 1 : border;

          },
          normalizedRange() {

            return Math.min(
              Math.max(
                0,
                ( this.value - this.minValue ) / ( this.maxValue - this.minValue ) * 100
              ),
              100
            );

          },
          currentRadiantAngle() {
            /*
            * 0.06283 is the conversion rate from percentage to radians
            */
            return this.normalizedRange * 0.06283;

          },
          moveToPath() {

            return this.polarToCartesian(
              this.circleCenter,
              this.circleCenter,
              this.circleRadius,
              this.currentRadiantAngle
            );

          },
          ellipticalArcCurvesCoordinatesPath() {

            return this.polarToCartesian(
              this.circleCenter,
              this.circleCenter,
              this.circleRadius,
              this.startAngle
            );

          },
          ellipticalArcCurvesLargeArcFlagPath() {

            return  this.currentRadiantAngle - this.startAngle <= 3.14 ? '0' : '1';

          },
          path() {

            return `M ${ this.moveToPath.x } ${ this.moveToPath.y } A ${ this.circleRadius } ${ this.circleRadius } 0 ${ this.ellipticalArcCurvesLargeArcFlagPath } 0 ${ this.ellipticalArcCurvesCoordinatesPath.x } ${ this.ellipticalArcCurvesCoordinatesPath.y } L ${ this.circleCenter } ${ this.circleCenter } Z`;

          },
        },
        methods: {
          polarToCartesian(
            centerX,
            centerY,
            radius,
            angleInRadians
          ) {

            return {
              x: centerX + ( radius * Math.cos( angleInRadians ) ),
              y: centerY + ( radius * Math.sin( angleInRadians ) )
            };

          },
        }
    }
</script>

<style scoped>
  .vue-progress-circle-svg {
    transform: rotate( -90deg );
  }
</style>