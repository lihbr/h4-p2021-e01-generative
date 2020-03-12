/**
 * This file handles global variables for the Generator
 */

// Javascript Canvas API global composite operation, see: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
const COMPOSITE_OPERATION = "source-over";

// Stroke width of lines
const STROKE_WIDTH = 10;
// Black color reference
const BLACK = "#282423";
// Set of colors for the generator to pick from, taken from Max Bill "Variations" work
const COLORS = [
  "#759f53",
  "#fd7b05",
  "#e84311",
  "#6d313e",
  "#3c496f",
  "#fecc0d"
];

// Number of colors to keep between [a, b[
const COLOR_NUM = [2, 6];
// Proportion of circles next to rectangle
const CIRCLE_PERCENTAGE = 0;
// Chance of adding another line to the generated design
const ANOTHER_LINE_PERCENTAGE = 0.5;
// Chance for a shape to be rotated
const ROTATED_PERCENTAGE = 0.4;

// Number of shape to draw between [a, b[
const SHAPE_NUM = [10, 20];
// Width of shape between [a, b[
const SHAPE_WIDTH = [50, 300];
// Height of shape between [a, b[
const SHAPE_HEIGHT = [100, 300];

// Number to which numbers will be rounded in order to create some sort of a "grid" pattern
const DEFAULT_PRECISION = 75;

export default {
  COMPOSITE_OPERATION,

  STROKE_WIDTH,
  BLACK,
  COLORS,

  COLOR_NUM,
  CIRCLE_PERCENTAGE,
  ANOTHER_LINE_PERCENTAGE,
  ROTATED_PERCENTAGE,

  SHAPE_NUM,
  SHAPE_WIDTH,
  SHAPE_HEIGHT,

  DEFAULT_PRECISION
};
