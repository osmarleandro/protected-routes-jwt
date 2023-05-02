import fs from "fs";
import util from "util";

const readFileAsync = util.promisify(fs.readFile);

export async function readStringFromFile(path: string): Promise<string> {
  try {
    const data = await readFileAsync(path, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
  return "";
}
