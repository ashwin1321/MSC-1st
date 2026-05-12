import https from "https";
import { User } from "./types/user";

// ANSI color helpers
const color = {
  bold:    (text: string) => `\x1b[1m${text}\x1b[0m`,
  dim:     (text: string) => `\x1b[2m${text}\x1b[0m`,
  red:     (text: string) => `\x1b[31m${text}\x1b[0m`,
  green:   (text: string) => `\x1b[32m${text}\x1b[0m`,
  yellow:  (text: string) => `\x1b[33m${text}\x1b[0m`,
  blue:    (text: string) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text: string) => `\x1b[35m${text}\x1b[0m`,
  cyan:    (text: string) => `\x1b[36m${text}\x1b[0m`,
  gray:    (text: string) => `\x1b[90m${text}\x1b[0m`,
};

// Validation types
interface ValidationError {
  path:     string;
  expected: string;
  got:      string;
}

// Check that a field exists and has the right type; push an error if not
function checkField(
  obj: Record<string, unknown>,
  key: string,
  expectedType: string,
  parentPath: string,
  errors: ValidationError[]
): void {
  const fullPath = `${parentPath}.${key}`;
  if (!(key in obj)) {
    errors.push({ path: fullPath, expected: expectedType, got: "missing" });
  } else if (typeof obj[key] !== expectedType) {
    errors.push({ path: fullPath, expected: expectedType, got: typeof obj[key] });
  }
}

function validateUser(rawUser: unknown, index: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const userPath = `users[${index}]`;

  if (typeof rawUser !== "object" || rawUser === null || Array.isArray(rawUser)) {
    errors.push({ path: userPath, expected: "object", got: rawUser === null ? "null" : typeof rawUser });
    return errors;
  }

  const user = rawUser as Record<string, unknown>;

  checkField(user, "id",       "number", userPath, errors);
  checkField(user, "name",     "string", userPath, errors);
  checkField(user, "username", "string", userPath, errors);
  checkField(user, "email",    "string", userPath, errors);
  checkField(user, "phone",    "string", userPath, errors);
  checkField(user, "website",  "string", userPath, errors);

  const addressPath = `${userPath}.address`;
  if (typeof user["address"] !== "object" || user["address"] === null) {
    errors.push({ path: addressPath, expected: "object", got: typeof user["address"] });
  } else {
    const address = user["address"] as Record<string, unknown>;
    checkField(address, "street",  "string", addressPath, errors);
    checkField(address, "suite",   "string", addressPath, errors);
    checkField(address, "city",    "string", addressPath, errors);
    checkField(address, "zipcode", "string", addressPath, errors);

    const geoPath = `${addressPath}.geo`;
    if (typeof address["geo"] !== "object" || address["geo"] === null) {
      errors.push({ path: geoPath, expected: "object", got: typeof address["geo"] });
    } else {
      const geo = address["geo"] as Record<string, unknown>;
      checkField(geo, "lat", "string", geoPath, errors);
      checkField(geo, "lng", "string", geoPath, errors);
    }
  }

  const companyPath = `${userPath}.company`;
  if (typeof user["company"] !== "object" || user["company"] === null) {
    errors.push({ path: companyPath, expected: "object", got: typeof user["company"] });
  } else {
    const company = user["company"] as Record<string, unknown>;
    checkField(company, "name",        "string", companyPath, errors);
    checkField(company, "catchPhrase", "string", companyPath, errors);
    checkField(company, "bs",          "string", companyPath, errors);
  }

  return errors;
}

// Fetch a URL and parse the response as JSON
function fetchJson(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        let responseText = "";
        response.on("data", (chunk: Buffer) => { responseText += chunk.toString(); });
        response.on("end", () => {
          try { resolve(JSON.parse(responseText)); }
          catch (error) { reject(error); }
        });
      })
      .on("error", reject);
  });
}

// Print formatting helpers
const headerLine  = color.bold(color.cyan("═".repeat(64)));
const dividerLine = color.gray("  " + "─".repeat(60));
const fieldLabel  = (text: string) => color.gray(`  ·· ${text.padEnd(10)}`);
const sectionTitle = (title: string) => `\n${color.bold(color.magenta(`  ▸ ${title}`))}`;

function printUser(user: User): void {
  const paddedId = String(user.id).padStart(2, "0");
  console.log(`\n  ${color.bold(color.cyan(`[${paddedId}]`))}  ${color.bold(user.name)}  ${color.gray(`@${user.username}`)}`);
  console.log(dividerLine);

  console.log(sectionTitle("Contact"));
  console.log(`${fieldLabel("email")}  ${color.green(user.email)}`);
  console.log(`${fieldLabel("phone")}  ${user.phone}`);
  console.log(`${fieldLabel("website")}  ${color.blue(user.website)}`);

  console.log(sectionTitle("Address"));
  console.log(`${fieldLabel("street")}  ${user.address.suite}, ${user.address.street}`);
  console.log(`${fieldLabel("city")}  ${user.address.city}  ${color.gray(user.address.zipcode)}`);
  console.log(`${fieldLabel("geo")}  lat ${color.yellow(user.address.geo.lat)}   lng ${color.yellow(user.address.geo.lng)}`);

  console.log(sectionTitle("Company"));
  console.log(`${fieldLabel("name")}  ${color.bold(user.company.name)}`);
  console.log(`${fieldLabel("pitch")}  ${color.yellow(`"${user.company.catchPhrase}"`)}`);
  console.log(`${fieldLabel("bs")}  ${color.dim(user.company.bs)}`);

  console.log(`\n${dividerLine}`);
}

async function main(): Promise<void> {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  console.log(`\n${headerLine}`);
  console.log(color.bold("  JSONPlaceholder /users  ×  TypeScript Interface Validation"));
  console.log(`${headerLine}\n`);

  process.stdout.write(`  ${color.gray("Fetching")} ${color.cyan(apiUrl)} … `);
  const apiResponse = await fetchJson(apiUrl);
  console.log(color.green("✓\n"));

  if (!Array.isArray(apiResponse)) {
    console.error(`  ${color.red("✗")} Expected an array, got ${typeof apiResponse}`);
    process.exit(1);
  }
  console.log(`  ${color.green("✓")} ${color.bold(String(apiResponse.length))} records received\n`);

  console.log(`  ${color.bold("Validating each record against the")} ${color.magenta("User")} ${color.bold("interface …")}\n`);

  let allUsersValid = true;
  const validUsers: User[] = [];

  for (let i = 0; i < apiResponse.length; i++) {
    const errors = validateUser(apiResponse[i], i);
    const userName = String((apiResponse[i] as Record<string, unknown>)["name"] ?? "?");

    if (errors.length === 0) {
      console.log(`    ${color.green("✓")} [${i}] ${userName}`);
      validUsers.push(apiResponse[i] as User);
    } else {
      allUsersValid = false;
      console.log(`    ${color.red("✗")} [${i}] ${userName}`);
      for (const error of errors) {
        console.log(`        ${color.red("→")} ${color.bold(error.path)}  expected ${color.green(error.expected)}, got ${color.red(error.got)}`);
      }
    }
  }

  console.log(`\n  ${color.gray("─".repeat(60))}`);
  if (allUsersValid) {
    console.log(`  ${color.bold(color.green("✓ ALL RECORDS VALID"))}  — API shape matches the ${color.magenta("User")} interface perfectly`);
  } else {
    console.log(`  ${color.bold(color.red("⚠ VALIDATION FAILED"))}  — see errors above`);
  }
  console.log(`  ${color.gray("─".repeat(60))}\n`);

  console.log(`\n${headerLine}`);
  console.log(color.bold(`  STRUCTURED OUTPUT  (${validUsers.length} users)`));
  console.log(`${headerLine}`);

  for (const user of validUsers) {
    printUser(user);
  }

  console.log(`\n${headerLine}\n`);
}

main().catch((error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error(`\n  ${color.red("✗")} ${color.bold("Fatal:")} ${errorMessage}`);
  process.exit(1);
});
