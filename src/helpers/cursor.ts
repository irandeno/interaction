import * as logger from "./logger.ts";

const ESCAPE = "\u001B[";
const LINE_DOWN = "E";
const LINE_UP = "F";
const CLEAR_LINE = "2K";
const LEFT = "D";
const DOWN = "B";
const RIGHT = "C";
const UP = "A";
const CLEAR_DOWN = "0J";
const CLEAR_RIGHT = "0K";

async function cursor(action: string): Promise<void> {
  await logger.write(ESCAPE + action);
}
export async function clearLine(): Promise<void> {
  await cursor(CLEAR_LINE);
}

export async function clearDown(): Promise<void> {
  await cursor(CLEAR_DOWN);
}

export async function clearRight(): Promise<void> {
  await cursor(CLEAR_RIGHT);
}

export async function lineUp(lines = 1): Promise<void> {
  await cursor(lines + LINE_UP);
}

export async function lineDown(lines = 1): Promise<void> {
  await cursor(lines + LINE_DOWN);
}

export async function moveLeft(columns = 1): Promise<void> {
  await cursor(columns + LEFT);
}

export async function moveRight(columns = 1): Promise<void> {
  await cursor(columns + RIGHT);
}

export async function moveUp(rows = 1): Promise<void> {
  await cursor(rows + UP);
}

export async function moveDown(rows = 1): Promise<void> {
  await cursor(rows + DOWN);
}
